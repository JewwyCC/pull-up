
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Hotspot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  eventCount: number;
}

interface MapboxMapProps {
  className?: string;
  hotspots: Hotspot[];
  onSelectHotspot?: (id: string) => void;
  showHeatMap?: boolean;
}

const MapboxMap = ({ className, hotspots, onSelectHotspot, showHeatMap = false }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{[key: string]: mapboxgl.Marker}>({});
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Function to handle getting user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Couldn't access your location");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  // Initialize the map once we have the token
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
      center: userLocation ? [userLocation.lng, userLocation.lat] : [-118.243683, 34.052235], // Default to LA if no user location
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    return () => {
      // Clean up on unmount
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, userLocation]);

  // Add user location marker
  useEffect(() => {
    if (!map.current || !isMapLoaded || !userLocation) return;

    // Add user location marker
    const userMarkerElement = document.createElement('div');
    userMarkerElement.className = 'user-location-marker';
    userMarkerElement.innerHTML = `
      <div class="relative">
        <div class="w-4 h-4 bg-accent rounded-full animate-ping absolute"></div>
        <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
          </svg>
        </div>
      </div>
    `;

    new mapboxgl.Marker(userMarkerElement)
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

    // Center map on user location
    map.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 12,
      speed: 2
    });
  }, [userLocation, isMapLoaded]);

  // Add hotspot markers and heat map
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Remove existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add heat map if enabled
    if (showHeatMap && map.current) {
      // Remove existing heat map layer if it exists
      if (map.current.getLayer('heatmap-layer')) {
        map.current.removeLayer('heatmap-layer');
      }
      
      // Remove existing heat map source if it exists
      if (map.current.getSource('heatmap-source')) {
        map.current.removeSource('heatmap-source');
      }
      
      // Convert hotspots to GeoJSON for heat map
      const heatMapData = {
        type: 'FeatureCollection',
        features: hotspots.map(hotspot => ({
          type: 'Feature',
          properties: {
            intensity: hotspot.eventCount / 2, // Scale the intensity based on event count
          },
          geometry: {
            type: 'Point',
            coordinates: [hotspot.longitude, hotspot.latitude],
          },
        })),
      };
      
      // Add heat map source and layer
      map.current.addSource('heatmap-source', {
        type: 'geojson',
        data: heatMapData as any,
      });
      
      map.current.addLayer({
        id: 'heatmap-layer',
        type: 'heatmap',
        source: 'heatmap-source',
        paint: {
          // Increase weight based on event count
          'heatmap-weight': ['get', 'intensity'],
          // Increase intensity at higher zoom levels
          'heatmap-intensity': 1.5,
          // Color ramp for heatmap from accent to primary color
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33, 150, 243, 0)',
            0.2, 'rgba(33, 150, 243, 0.2)',
            0.4, 'rgba(33, 150, 243, 0.4)',
            0.6, 'rgba(33, 150, 243, 0.6)',
            0.8, 'rgba(236, 72, 153, 0.8)',
            1, 'rgba(236, 72, 153, 1)'
          ],
          // Radius decreases as zoom increases
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 20,
            14, 10
          ],
          // Opacity decreases as zoom increases
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 0.8,
            14, 0.6
          ],
        },
      } as any);
    }

    // Add hotspot markers
    hotspots.forEach(hotspot => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'hotspot-marker';
      markerElement.innerHTML = `
        <div class="relative cursor-pointer">
          <div class="w-6 h-6 text-primary ${selectedHotspot === hotspot.id ? 'animate-pulse' : 'animate-float'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-xs font-medium ${selectedHotspot === hotspot.id ? 'ring-2 ring-white' : ''}">
            ${hotspot.eventCount}
          </div>
        </div>
      `;

      // Add click event listener to the marker element
      markerElement.addEventListener('click', () => {
        handleSelectHotspot(hotspot.id);
      });

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([hotspot.longitude, hotspot.latitude])
        .addTo(map.current!);

      markers.current[hotspot.id] = marker;
    });
  }, [hotspots, selectedHotspot, isMapLoaded, showHeatMap]);

  const handleSelectHotspot = (id: string) => {
    setSelectedHotspot(id);
    if (onSelectHotspot) {
      onSelectHotspot(id);
    }

    // Fly to the selected hotspot
    const hotspot = hotspots.find(h => h.id === id);
    if (hotspot && map.current) {
      map.current.flyTo({
        center: [hotspot.longitude, hotspot.latitude],
        zoom: 14,
        speed: 1.5
      });
    }
  };

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-border shadow-lg', className)}>
      {/* Token input field if no token is set */}
      {!mapboxToken && (
        <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full glass-card p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-4">Enter your Mapbox token</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To use the map feature, you need a Mapbox public token. Get yours at 
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary ml-1">
                mapbox.com
              </a>
            </p>
            <input
              type="text"
              placeholder="pk.eyJ1Ijoie3VzZXJuYW1lfSIsImEiOiJ..."
              className="w-full px-4 py-2 rounded-md bg-muted text-foreground border border-input mb-4"
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <button
              className="w-full pullup-button"
              onClick={() => {
                if (mapboxToken) {
                  localStorage.setItem('mapbox_token', mapboxToken);
                }
              }}
            >
              Save Token
            </button>
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Location error message */}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg text-sm">
          {locationError}
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
