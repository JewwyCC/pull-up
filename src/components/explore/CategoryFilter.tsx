
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { categories } from '@/data/mockData';
import { Filter, X } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, setActiveCategory }: CategoryFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        {isFilterOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
        <span>{isFilterOpen ? 'Close' : 'Filter'}</span>
        {activeCategory !== 'all' && (
          <Badge variant="default" className="ml-1 text-xs">1</Badge>
        )}
      </Button>
      
      {isFilterOpen && (
        <div className="absolute z-10 mt-2 w-max max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg shadow-lg p-3 animate-in fade-in-0 zoom-in-95">
          <div className="mb-2 flex justify-between items-center">
            <h3 className="text-sm font-medium">Categories</h3>
            {activeCategory !== 'all' && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs" 
                onClick={() => setActiveCategory('all')}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={cn(
                  "px-3 py-1 cursor-pointer transition-all",
                  activeCategory === category.id ? "bg-primary" : "bg-card hover:bg-secondary"
                )}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsFilterOpen(false);
                }}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
