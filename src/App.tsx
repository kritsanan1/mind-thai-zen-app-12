
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import AiChat from '@/pages/AiChat';
import Content from '@/pages/Content';
import Therapist from '@/pages/Therapist';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import Privacy from '@/pages/Privacy';
import Layout from '@/components/Layout';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Landing page */}
              <Route path="/" element={<Index />} />
              
              {/* Protected app routes with Layout wrapper */}
              <Route path="/app" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="chat" element={<AiChat />} />
                <Route path="content" element={<Content />} />
                <Route path="therapist" element={<Therapist />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
