
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Mail, Lock, UserCheck, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';

type FormData = {
  email: string;
  password: string;
  name?: string;
};

const Auth = () => {
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // If already logged in, redirect to explore
  if (user) {
    return <Navigate to="/explore" replace />;
  }

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!email.endsWith('.edu')) return "Only .edu email addresses are allowed";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
    return true;
  };

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      let success;
      
      if (activeTab === 'login') {
        success = await login(data.email, data.password);
      } else {
        success = await signup(data.email, data.password, data.name);
      }
      
      if (success) {
        navigate('/explore');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(null);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome to the Community</CardTitle>
          <CardDescription>
            Connect with students and events on your campus
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <CardContent className="pt-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email (.edu)</Label>
                  <Input
                    id="email"
                    placeholder="you@university.edu"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                    {...register('email', { 
                      required: "Email is required", 
                      validate: validateEmail
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                    {...register('password', { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    autoComplete="name"
                    prefix={<UserCheck className="h-4 w-4 text-muted-foreground" />}
                    {...register('name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email (.edu)</Label>
                  <Input
                    id="email"
                    placeholder="you@university.edu"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
                    {...register('email', { 
                      required: "Email is required", 
                      validate: validateEmail
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    prefix={<Lock className="h-4 w-4 text-muted-foreground" />}
                    {...register('password', { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
                  )}
                </div>
              </TabsContent>
              
              <CardFooter className="flex justify-end px-0 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting 
                    ? "Processing..." 
                    : activeTab === 'login' ? "Login" : "Create Account"
                  }
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
