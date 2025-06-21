
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
import { ProtectedRoute } from '@/components/security/ProtectedRoute';

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
              
              {/* Protected app routes */}
              <Route path="/app/home" element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/app/chat" element={
                <ProtectedRoute>
                  <Layout>
                    <AiChat />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/app/content" element={
                <ProtectedRoute>
                  <Layout>
                    <Content />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/app/therapist" element={
                <ProtectedRoute>
                  <Layout>
                    <Therapist />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/app/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
              
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
