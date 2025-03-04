
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="mb-6 flex gap-2">
      <Input
        type="search"
        placeholder="Search for events..."
        className="flex-grow bg-card shadow-sm border-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<Search className="w-4 h-4 text-muted-foreground" />}
      />
      <Button variant="outline" size="icon" className="bg-card">
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
