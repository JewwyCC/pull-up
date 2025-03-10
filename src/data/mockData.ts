
// Mock data for the Explore page
export const mockHotspots = [
  { id: '1', name: 'Downtown', latitude: 34.052235, longitude: -118.243683, eventCount: 12 },
  { id: '2', name: 'Santa Monica', latitude: 34.024212, longitude: -118.496475, eventCount: 8 },
  { id: '3', name: 'Silver Lake', latitude: 34.083527, longitude: -118.270455, eventCount: 5 },
  { id: '4', name: 'Venice', latitude: 33.985047, longitude: -118.469018, eventCount: 9 },
  { id: '5', name: 'Echo Park', latitude: 34.072601, longitude: -118.260005, eventCount: 6 },
  { id: '6', name: 'Arts District', latitude: 34.040434, longitude: -118.231317, eventCount: 7 },
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
