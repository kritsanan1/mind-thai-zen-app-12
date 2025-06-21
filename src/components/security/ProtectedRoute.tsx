
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        console.log('Redirecting to auth - user not authenticated');
        navigate('/auth', { replace: true });
        return;
      }
      setIsChecking(false);
    }
  }, [user, loading, requireAuth, navigate]);

  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zen-pearl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-zen-blue" />
          <p className="text-gray-600 font-thai">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null; // Will redirect above
  }

  return <>{children}</>;
};
