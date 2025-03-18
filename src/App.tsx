
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Explore from "./pages/Explore";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="bg-background min-h-screen">
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/explore" element={<Explore />} />
                <Route path="/event/:eventId" element={<EventDetail />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Navbar />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
