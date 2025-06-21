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
import { QueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/security/ProtectedRoute';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/home" element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/ai-chat" element={
                <ProtectedRoute>
                  <Layout>
                    <AiChat />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/content" element={
                <ProtectedRoute>
                  <Layout>
                    <Content />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/therapist" element={
                <ProtectedRoute>
                  <Layout>
                    <Therapist />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
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
    </QueryClient>
  );
}

export default App;
