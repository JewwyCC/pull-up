
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, MapPin, 
  Users, ImagePlus, InfoIcon, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';

const categories = [
  { id: 'social', name: 'Social' },
  { id: 'sports', name: 'Sports' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'tech', name: 'Tech' },
  { id: 'arts', name: 'Arts' },
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    duration: '',
    category: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImagePreview(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (simple validation)
    if (!formData.title || !formData.location || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields", {
        description: "Title, location, date and time are required",
        duration: 3000
      });
      return;
    }
    
    // In a real app, this would send data to an API
    console.log("Event data:", { ...formData, image: imagePreview });
    
    toast.success("Event created successfully!", {
      description: "Your event is now live for others to join",
      duration: 3000
    });
    
    // Navigate back to explore page
    navigate('/explore');
  };
  
  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/explore">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Create Event</h1>
          </div>
          
          <Button type="submit" form="create-event-form">
            Publish
          </Button>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <form id="create-event-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-base">Event Image</Label>
            
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden h-48 bg-muted">
                <img 
                  src={imagePreview} 
                  alt="Event preview" 
                  className="w-full h-full object-cover"
                />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 rounded-lg cursor-pointer bg-muted/50 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Event Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Give your event a catchy title"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="What's this event all about?"
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[100px] bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Location and Time */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <MapPin className="w-4 h-4 text-primary" />
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                name="location"
                placeholder="Where is this happening?"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-muted/50"
                prefix={<MapPin className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <Calendar className="w-4 h-4 text-primary" />
                Date <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-muted/50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-base">
                  <Clock className="w-4 h-4 text-primary" />
                  Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="bg-muted/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-base">Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => handleSelectChange('duration', value)}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="How long?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                    <SelectItem value="3hours">3 hours</SelectItem>
                    <SelectItem value="4hours+">4+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="pt-6 flex justify-end">
            <Button type="submit" size="lg" className="rounded-xl">
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
