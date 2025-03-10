
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
          // Default to UC Irvine if location access is denied
          setUserLocation({
            lat: 33.6405,
            lng: -117.8443
          });
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      // Default to UC Irvine if geolocation not supported
      setUserLocation({
        lat: 33.6405,
        lng: -117.8443
      });
    }
  }, []);

  // Initialize the map once we have the token
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
      center: userLocation ? [userLocation.lng, userLocation.lat] : [-117.8443, 33.6405], // Default to UC Irvine if no user location
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

    // Add user location marker with pulsing effect
    const userMarkerElement = document.createElement('div');
    userMarkerElement.className = 'user-location-marker';
    userMarkerElement.innerHTML = `
      <div class="relative">
        <div class="w-6 h-6 bg-accent/30 rounded-full animate-ping absolute"></div>
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10 relative border-2 border-white shadow-lg">
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
            intensity: hotspot.eventCount / 1.5, // Scale the intensity based on event count
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
          'heatmap-intensity': 1.8, // Intensified
          // Color ramp for heatmap from accent to primary color - made more vibrant
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33, 150, 243, 0)',
            0.1, 'rgba(33, 150, 243, 0.3)',
            0.3, 'rgba(63, 81, 181, 0.5)',
            0.5, 'rgba(156, 39, 176, 0.7)', 
            0.7, 'rgba(233, 30, 99, 0.85)',
            0.9, 'rgba(236, 72, 153, 0.95)',
            1, 'rgba(244, 67, 54, 1)'
          ],
          // Radius increases for better visibility
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 25, // Larger radius at low zoom
            12, 20,
            16, 15
          ],
          // Opacity decreases as zoom increases
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 0.9, // More visible at low zoom
            14, 0.7
          ],
        },
      } as any);
    }

    // Add hotspot markers with improved visuals
    hotspots.forEach(hotspot => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'hotspot-marker';
      markerElement.innerHTML = `
        <div class="relative cursor-pointer group">
          <div class="absolute -inset-2 bg-primary/10 rounded-full ${selectedHotspot === hotspot.id ? 'animate-ping opacity-70' : ''} group-hover:animate-ping opacity-0 group-hover:opacity-30 transition-opacity"></div>
          <div class="w-8 h-8 text-primary drop-shadow-lg transform transition-transform group-hover:scale-110 ${selectedHotspot === hotspot.id ? 'scale-110 animate-pulse' : 'animate-float'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="${selectedHotspot === hotspot.id ? 'rgba(236, 72, 153, 0.2)' : 'rgba(33, 150, 243, 0.1)'}"></path>
              <circle cx="12" cy="10" r="3" fill="${selectedHotspot === hotspot.id ? 'rgba(236, 72, 153, 0.8)' : 'rgba(33, 150, 243, 0.5)'}"></circle>
            </svg>
          </div>
          <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-medium shadow-md border border-white ${selectedHotspot === hotspot.id ? 'ring-2 ring-white scale-110' : ''} transform transition-transform group-hover:scale-110">
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
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full shadow-lg text-sm">
          {locationError}
        </div>
      )}

      {/* Map instruction hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-muted-foreground">
        <span className="animate-pulse">Click on hotspots to see events</span>
      </div>
    </div>
  );
};

export default MapboxMap;
