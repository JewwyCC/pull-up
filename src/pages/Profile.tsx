
import React from 'react';
import { Settings, Camera, Calendar, Map, Heart, Edit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// Mock data
const interests = [
  { id: '1', name: 'Fitness' },
  { id: '2', name: 'Coffee' },
  { id: '3', name: 'Technology' },
  { id: '4', name: 'Art' },
  { id: '5', name: 'Music' },
  { id: '6', name: 'Food' },
];

const Profile = () => {
  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarFallback className="text-2xl">LA</AvatarFallback>
              <AvatarImage src="" alt="User Avatar" />
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-xl font-bold mb-1">Alexa Smith</h2>
          <p className="text-muted-foreground">Los Angeles, CA</p>
          
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold">12</p>
              <p className="text-xs text-muted-foreground">Events</p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="text-center">
              <p className="text-lg font-bold">28</p>
              <p className="text-xs text-muted-foreground">Connections</p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="text-center">
              <p className="text-lg font-bold">8</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="w-full">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Heart className="w-5 h-5 text-primary mr-2" />
          Your Interests
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {interests.map(interest => (
            <Badge key={interest.id} variant="secondary" className="px-3 py-1">
              {interest.name}
            </Badge>
          ))}
          
          <Button variant="outline" size="sm" className="px-3 h-7 text-xs">
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          These help us recommend events tailored to your preferences
        </p>
      </div>
      
      <div className="glass-card rounded-2xl divide-y animate-scale-in">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Map className="w-5 h-5 text-primary mr-3" />
            <span className="font-medium">Location Services</span>
          </div>
          <Switch />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-primary mr-3" />
            <span className="font-medium">Calendar Sync</span>
          </div>
          <Switch />
        </div>
        
        <div className="p-4">
          <Button variant="ghost" className="w-full text-destructive justify-start px-3">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
