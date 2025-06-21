
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from './BottomNavigation';

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen thai-gradient flex items-center justify-center">
        <div className="zen-card p-8">
          <div className="animate-zen-pulse lotus-glow w-16 h-16 mx-auto mb-4">
            <div className="w-8 h-8 bg-zen-lotus rounded-full mx-auto"></div>
          </div>
          <p className="text-center text-gray-600 font-thai">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen thai-gradient pb-20">
      <div className="max-w-md mx-auto">
        <Outlet />
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
