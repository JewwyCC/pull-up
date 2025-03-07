
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
  description: string;
  location: string;
  time: string;
  date: string;
  attendees: number;
  image?: string;
  distance?: string;
  category?: string;
  trending?: boolean;
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Coffee Meetup',
    description: 'Start your day with great coffee and even better conversations. Casual networking for professionals.',
    location: 'Brew & Bean, Downtown',
    time: '8:00 AM',
    date: 'Today',
    attendees: 12,
    distance: '0.8 mi',
    category: 'Social',
    trending: true,
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Pickup Basketball Game',
    description: 'Join us for a friendly 3v3 basketball game at the park. All skill levels welcome!',
    location: 'Central Park Courts',
    time: '5:30 PM',
    date: 'Today',
    attendees: 8,
    distance: '1.2 mi',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Sunset Beach Yoga',
    description: 'Relax and recharge with a guided yoga session as the sun sets over the ocean.',
    location: 'Venice Beach',
    time: '7:00 PM',
    date: 'Today',
    attendees: 15,
    distance: '2.5 mi',
    category: 'Wellness',
    trending: true,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    title: 'Tech Startup Networking',
    description: 'Connect with local entrepreneurs and tech enthusiasts. Share ideas and find potential collaborators.',
    location: 'Innovation Hub, Silicon Beach',
    time: '6:00 PM',
    date: 'Tomorrow',
    attendees: 28,
    distance: '3.1 mi',
    category: 'Tech',
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
