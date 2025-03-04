
import React from 'react';
import { Users, MessageCircle, UserPlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

const Community = () => {
  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Community</h1>
      
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search connections..."
          className="w-full bg-white shadow-sm border-input"
          prefix={<Search className="w-4 h-4 text-muted-foreground" />}
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
    </div>
  );
};

export default Community;
