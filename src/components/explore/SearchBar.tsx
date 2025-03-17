
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="mb-6 w-full">
      <Input
        type="search"
        placeholder="Search for events..."
        className="w-full bg-card shadow-sm border-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<Search className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default SearchBar;
