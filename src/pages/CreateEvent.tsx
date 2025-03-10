
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/data/mockData';

// Simple form structure for spontaneous events
const CreateEvent = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    duration: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenerateDetails = () => {
    setIsGenerating(true);
    
    // Simulate AI generation (in a real app, this would call an AI API)
    setTimeout(() => {
      const demoTitle = formData.category === 'Sports' 
        ? 'Pickup Basketball Game' 
        : formData.category === 'Social' 
          ? 'Coffee & Conversation' 
          : 'Spontaneous Meetup';
      
      setFormData(prev => ({
        ...prev,
        title: demoTitle,
      }));
      
      setIsGenerating(false);
      
      toast.success("Event details generated!", {
        description: "Feel free to edit these suggestions",
      });
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (simple validation)
    if (!formData.title || !formData.location || !formData.duration) {
      toast.error("Please fill in all required fields", {
        description: "Title, location, and duration are required",
        duration: 3000
      });
      return;
    }
    
    // In a real app, this would send data to an API
    console.log("Event data:", formData);
    
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
            <h1 className="text-xl font-semibold">Create Spontaneous Event</h1>
          </div>
          
          <Button type="submit" form="create-event-form">
            Publish
          </Button>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <form id="create-event-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-muted/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Quick Creation</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select a category and we'll suggest details for your spontaneous event.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat.id !== 'all').map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleGenerateDetails} 
                disabled={!formData.category || isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Event Details"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Event Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="What are you planning?"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                name="location"
                placeholder="Where is this happening?"
                value={formData.location}
                onChange={handleInputChange}
                prefix={<MapPin className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Duration <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleSelectChange('duration', value)}
              >
                <SelectTrigger>
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
          
          <div className="pt-4 flex justify-end">
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
