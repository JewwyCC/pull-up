
// Mock data for the Explore page
export const mockHotspots = [
  { id: '1', name: 'Downtown', latitude: 34.052235, longitude: -118.243683, eventCount: 12 },
  { id: '2', name: 'Santa Monica', latitude: 34.024212, longitude: -118.496475, eventCount: 8 },
  { id: '3', name: 'Silver Lake', latitude: 34.083527, longitude: -118.270455, eventCount: 5 },
  { id: '4', name: 'Venice', latitude: 33.985047, longitude: -118.469018, eventCount: 9 },
  { id: '5', name: 'Echo Park', latitude: 34.072601, longitude: -118.260005, eventCount: 6 },
  { id: '6', name: 'Arts District', latitude: 34.040434, longitude: -118.231317, eventCount: 7 },
  // UC Irvine area hotspots
  { id: '7', name: 'UC Irvine Campus', latitude: 33.6405, longitude: -117.8443, eventCount: 18 },
  { id: '8', name: 'University Town Center', latitude: 33.6491, longitude: -117.8357, eventCount: 12 },
  { id: '9', name: 'Newport Beach', latitude: 33.6189, longitude: -117.9298, eventCount: 9 },
  { id: '10', name: 'Irvine Spectrum', latitude: 33.6506, longitude: -117.7435, eventCount: 15 },
];

export type Event = {
  id: string;
  title: string;
  location: string;
  distance?: string;
  category?: string;
  attendees: number;
  duration: string;
  endTime: string;
  image?: string;
  trending?: boolean;
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Coffee Meetup',
    location: 'Brew & Bean, Downtown',
    distance: '0.8 mi',
    category: 'Social',
    attendees: 12,
    duration: '1 hour',
    endTime: 'Ends at 9:30 AM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Pickup Basketball Game',
    location: 'Central Park Courts',
    distance: '1.2 mi',
    category: 'Sports',
    attendees: 8,
    duration: '2 hours',
    endTime: 'Ends at 7:30 PM',
    image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Sunset Beach Yoga',
    location: 'Venice Beach',
    distance: '2.5 mi',
    category: 'Wellness',
    attendees: 15,
    duration: '1 hour',
    endTime: 'Ends at 8:00 PM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    title: 'Tech Startup Networking',
    location: 'Innovation Hub, Silicon Beach',
    distance: '3.1 mi',
    category: 'Tech',
    attendees: 28,
    duration: '3 hours',
    endTime: 'Ends at 9:00 PM',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80'
  },
  // UC Irvine area events
  {
    id: '5',
    title: 'Study Group: Computer Science',
    location: 'Science Library, UC Irvine',
    distance: '0.2 mi',
    category: 'Tech',
    attendees: 7,
    duration: '2 hours',
    endTime: 'Ends at 8:00 PM',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80'
  },
  {
    id: '6',
    title: 'Anteater Basketball Game',
    location: 'Bren Events Center, UCI',
    distance: '0.5 mi',
    category: 'Sports',
    attendees: 42,
    duration: '2.5 hours',
    endTime: 'Ends at 9:30 PM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80'
  },
  {
    id: '7',
    title: 'Student Art Exhibition',
    location: 'Claire Trevor School of Arts',
    distance: '0.7 mi',
    category: 'Arts',
    attendees: 19,
    duration: '3 hours',
    endTime: 'Ends at 7:00 PM',
    image: 'https://images.unsplash.com/photo-1594035795063-5fb35947027f?auto=format&fit=crop&q=80'
  },
  {
    id: '8',
    title: 'Beach Bonfire & Hangout',
    location: 'Newport Beach',
    distance: '3.2 mi',
    category: 'Social',
    attendees: 23,
    duration: '4 hours',
    endTime: 'Ends at 11:00 PM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1529245856630-f4853233d2ea?auto=format&fit=crop&q=80'
  },
  {
    id: '9',
    title: 'Farmers Market Meetup',
    location: 'University Town Center',
    distance: '0.8 mi',
    category: 'Social',
    attendees: 14,
    duration: '1.5 hours',
    endTime: 'Ends at 1:30 PM',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80'
  },
  {
    id: '10',
    title: 'Sunset Yoga at Aldrich Park',
    location: 'Aldrich Park, UC Irvine',
    distance: '0.3 mi',
    category: 'Wellness',
    attendees: 20,
    duration: '1 hour',
    endTime: 'Ends at 6:30 PM',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80'
  },
  {
    id: '11',
    title: 'Salsa Dance Workshop',
    location: 'ARC, UC Irvine',
    distance: '0.4 mi',
    category: 'Arts',
    attendees: 16,
    duration: '2 hours',
    endTime: 'Ends at 8:00 PM',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80'
  },
  {
    id: '12',
    title: 'Movie Night: Marvel Marathon',
    location: 'Student Center, UCI',
    distance: '0.1 mi',
    category: 'Social',
    attendees: 31,
    duration: '5 hours',
    endTime: 'Ends at 11:00 PM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80'
  }
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'social', name: 'Social' },
  { id: 'sports', name: 'Sports' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'tech', name: 'Tech' },
  { id: 'arts', name: 'Arts' }
];
