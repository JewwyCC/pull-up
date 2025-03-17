
import React, { useState } from 'react';
import { Users, MessageCircle, UserPlus, Search, Group, Plus, UsersRound, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents } from '@/data/mockData';
import { Link } from 'react-router-dom';

// Mock data
const mockConnections = [
  { id: '1', name: 'Alex Johnson', events: 3, avatar: '', initials: 'AJ', online: true },
  { id: '2', name: 'Jamie Smith', events: 5, avatar: '', initials: 'JS', online: false },
  { id: '3', name: 'Taylor Reed', events: 2, avatar: '', initials: 'TR', online: true },
  { id: '4', name: 'Jordan Lee', events: 7, avatar: '', initials: 'JL', online: false },
];

const mockSuggestions = [
  { id: '5', name: 'Casey Morgan', mutualConnections: 3, avatar: '', initials: 'CM', common: 'Basketball' },
  { id: '6', name: 'Riley Parker', mutualConnections: 2, avatar: '', initials: 'RP', common: 'Coffee Meetups' },
  { id: '7', name: 'Drew Quinn', mutualConnections: 1, avatar: '', initials: 'DQ', common: 'Tech Events' },
];

// Mock groups data
const mockGroups = [
  { 
    id: '1', 
    name: 'Basketball Enthusiasts', 
    members: 8,
    avatar: '', 
    category: 'Sports',
    origin: 'UCLA Basketball Game', 
    recentEvent: 'Weekly Pickup Game',
    friends: ['1', '3'] // IDs of connections who are in this group
  },
  { 
    id: '2', 
    name: 'Tech Talks UCIrvine', 
    members: 12,
    avatar: '', 
    category: 'Technology',
    origin: 'UCI Tech Meetup', 
    recentEvent: 'AI Workshop',
    friends: ['2'] 
  },
  { 
    id: '3', 
    name: 'Coffee Lovers', 
    members: 5,
    avatar: '', 
    category: 'Social',
    origin: 'Newport Coffee Tasting', 
    recentEvent: 'Barista Class',
    friends: [] 
  },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<string>("connections");
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get the list of joined events from localStorage
  const joinedEventIds = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
  const joinedEvents = mockEvents.filter(event => joinedEventIds.includes(event.id));
  
  // Function to get friend names who are in a group
  const getFriendNamesInGroup = (groupFriendIds: string[]) => {
    return mockConnections
      .filter(connection => groupFriendIds.includes(connection.id))
      .map(connection => connection.name);
  };

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Community</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="connections">
            <Users className="w-4 h-4 mr-2" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="groups">
            <UsersRound className="w-4 h-4 mr-2" />
            Groups
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="connections" className="animate-fade-in">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search connections..."
              className="w-full bg-white shadow-sm border-input"
              prefix={<Search className="w-4 h-4 text-muted-foreground" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">Your Connections</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {mockConnections.length} total
              </span>
            </div>
            
            <div className="grid gap-3">
              {mockConnections.map(connection => (
                <div key={connection.id} className="glass-card rounded-xl p-4 animate-scale-in">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-background">
                        <AvatarFallback>{connection.initials}</AvatarFallback>
                        {connection.avatar && <AvatarImage src={connection.avatar} alt={connection.name} />}
                      </Avatar>
                      {connection.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">{connection.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {connection.events} events together
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">People You Might Know</h2>
              </div>
            </div>
            
            <div className="grid gap-3">
              {mockSuggestions.map(suggestion => (
                <div key={suggestion.id} className="glass-card rounded-xl p-4 animate-scale-in">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-background">
                      <AvatarFallback>{suggestion.initials}</AvatarFallback>
                      {suggestion.avatar && <AvatarImage src={suggestion.avatar} alt={suggestion.name} />}
                    </Avatar>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">{suggestion.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs py-0 px-2">
                          {suggestion.common}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {suggestion.mutualConnections} mutual
                        </span>
                      </div>
                    </div>
                    
                    <Button size="sm" className="h-9">
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="animate-fade-in">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search groups..."
              className="w-full bg-white shadow-sm border-input"
              prefix={<Search className="w-4 h-4 text-muted-foreground" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {joinedEvents.length > 0 && (
            <div className="mb-6 glass-card p-4 rounded-xl">
              <h3 className="text-lg font-medium mb-3">Create a Group</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can create a group with people you've met at events.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {joinedEvents.slice(0, 2).map(event => (
                  <div key={event.id} className="bg-accent/10 rounded-lg p-3">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.attendees} attendees</p>
                  </div>
                ))}
              </div>
              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Create New Group
              </Button>
            </div>
          )}
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Group className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">Your Groups</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {mockGroups.length} total
              </span>
            </div>
            
            <div className="grid gap-3">
              {mockGroups.map(group => {
                const friendsInGroup = getFriendNamesInGroup(group.friends);
                
                return (
                  <div key={group.id} className="glass-card rounded-xl p-4 animate-scale-in">
                    <div className="flex gap-4">
                      <Avatar className="w-14 h-14 border-2 border-background">
                        <AvatarFallback className="text-lg font-medium">
                          {group.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{group.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {group.category}
                          </Badge>
                        </div>
                        
                        <div className="mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{group.members} members</span>
                          </div>
                        </div>
                        
                        {friendsInGroup.length > 0 && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs">Friends: {friendsInGroup.join(', ')}</span>
                          </div>
                        )}
                        
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">From: </span>
                          <span>{group.origin}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="self-start">
                        View
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">Discover Groups</h2>
              </div>
            </div>
            
            <div className="grid gap-3">
              {/* Just showing one discover group for demo purposes */}
              <div className="glass-card rounded-xl p-4 animate-scale-in">
                <div className="flex gap-4">
                  <Avatar className="w-14 h-14 border-2 border-background">
                    <AvatarFallback className="text-lg font-medium">HP</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">Hiking Pioneers</h3>
                      <Badge variant="outline" className="text-xs">
                        Outdoors
                      </Badge>
                    </div>
                    
                    <div className="mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>24 members</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">Recent event: </span>
                      <span>Newport Beach Trail</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="self-start">
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
