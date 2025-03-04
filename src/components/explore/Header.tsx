
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Pullup Nearby</h1>
      
      <Link to="/create-event">
        <Button size="sm" className="rounded-lg">
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </Link>
    </div>
  );
};

export default Header;
