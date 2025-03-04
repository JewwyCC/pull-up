
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { categories } from '@/data/mockData';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, setActiveCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-6 overflow-x-auto pb-2">
      <div className="flex gap-2 w-max">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={cn(
              "px-4 py-1.5 cursor-pointer transition-all",
              activeCategory === category.id ? "bg-primary" : "bg-card hover:bg-secondary"
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
