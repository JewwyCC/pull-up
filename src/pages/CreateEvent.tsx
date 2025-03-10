
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Sparkles, Image } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';

// Simple form structure for spontaneous events
const CreateEvent = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [autoGenerateImage, setAutoGenerateImage] = useState(true);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    duration: '',
    description: ''
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
      
      const demoDescription = formData.category === 'Sports'
        ? 'Join us for a casual basketball game. All skill levels welcome!'
        : formData.category === 'Social'
        ? 'Let\'s meet for coffee and great conversation. Open to everyone!'
        : 'Spontaneous gathering. Come join us!';
      
      setFormData(prev => ({
        ...prev,
        title: demoTitle,
        description: demoDescription
      }));
      
      setIsGenerating(false);
      
      // Generate image if auto-generate is enabled
      if (autoGenerateImage) {
        handleGenerateImage();
      }
      
      toast.success("Event details generated!", {
        description: "Feel free to edit these suggestions",
      });
    }, 1500);
  };
  
  const handleGenerateImage = () => {
    if (!formData.title && !formData.description && !formData.category) {
      toast.error("Please provide some details first", {
        description: "We need a title, description, or category to generate a relevant image",
      });
      return;
    }
    
    setIsGeneratingImage(true);
    
    // Simulate AI image generation (in a real app, this would call an image generation API)
    setTimeout(() => {
      // Generate placeholder images based on category
      let placeholderImage = "";
      
      switch(formData.category) {
        case "Sports":
          placeholderImage = "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&q=80";
          break;
        case "Social":
          placeholderImage = "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80";
          break;
        case "Wellness":
          placeholderImage = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80";
          break;
        case "Tech":
          placeholderImage = "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80";
          break;
        case "Arts":
          placeholderImage = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80";
          break;
        default:
          placeholderImage = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80";
      }
      
      setGeneratedImageUrl(placeholderImage);
      setIsGeneratingImage(false);
      
      toast.success("Image generated!", {
        description: "We've created an image based on your event details",
      });
    }, 2000);
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
    
    // Calculate ending time based on duration (for demo purposes)
    const now = new Date();
    let endTime = new Date(now);
    
    switch(formData.duration) {
      case "30min":
        endTime.setMinutes(now.getMinutes() + 30);
        break;
      case "1hour":
        endTime.setHours(now.getHours() + 1);
        break;
      case "2hours":
        endTime.setHours(now.getHours() + 2);
        break;
      case "3hours":
        endTime.setHours(now.getHours() + 3);
        break;
      case "4hours+":
        endTime.setHours(now.getHours() + 4);
        break;
    }
    
    const formattedEndTime = `Ends at ${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')} ${endTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    // In a real app, this would send data to an API
    const eventData = {
      ...formData,
      endTime: formattedEndTime,
      image: generatedImageUrl,
      attendees: 1 // Start with creator only
    };
    
    console.log("Event data:", eventData);
    
    toast.success("Event created successfully!", {
      description: "Your event is now live for others to join",
      duration: 3000
    });
    
    // Navigate back to explore page
    navigate('/explore');
  };
  
  // Reset image when category changes
  useEffect(() => {
    if (autoGenerateImage && formData.category) {
      handleGenerateImage();
    }
  }, [formData.category]);
  
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add some details about your event"
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
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
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2" htmlFor="auto-generate-image">
                  <Image className="w-4 h-4 text-primary" />
                  Auto-generate image
                </Label>
                <Switch 
                  id="auto-generate-image"
                  checked={autoGenerateImage}
                  onCheckedChange={setAutoGenerateImage}
                />
              </div>
              
              {autoGenerateImage ? (
                <div className="text-sm text-muted-foreground">
                  An image will be automatically generated based on your event details.
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full"
                >
                  {isGeneratingImage ? "Generating..." : "Generate Image"}
                </Button>
              )}
              
              {generatedImageUrl && (
                <div className="mt-4 rounded-lg overflow-hidden border border-border">
                  <img 
                    src={generatedImageUrl} 
                    alt="Generated event image" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
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
