
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Users, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  
  // Don't show navbar on auth page
  if (location.pathname === '/auth') return null;
  
  // Only show navbar for authenticated users
  if (!isAuthenticated) return null;
  
  const navItems = [
    { path: '/explore', icon: Map, label: 'Explore' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around p-4 bg-card/80 backdrop-blur-xl border-t border-border shadow-lg animate-fade-in">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            'nav-item flex flex-col items-center gap-1',
            location.pathname === item.path && 'active'
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex flex-col items-center gap-1 rounded-full" 
        onClick={logout}
      >
        <LogOut className="w-5 h-5" />
        <span className="text-xs font-medium">Logout</span>
      </Button>
    </nav>
  );
};

export default Navbar;
