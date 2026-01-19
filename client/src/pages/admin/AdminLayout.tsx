import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Image, FileText, Calendar, Settings, LogOut, Menu, X } from 'lucide-react';
import { authApi } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/services', label: 'Services', icon: FileText },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(authApi.getUser());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = async () => {
    await authApi.logout();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/admin');
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-sm"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-primary text-primary-foreground
        transform transition-transform duration-300 lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/10">
            <Link to="/" className="block">
              <h1 className="font-heading text-2xl">LUMEN</h1>
              <p className="font-body text-xs uppercase tracking-widest text-primary-foreground/50 mt-1">
                Admin Panel
              </p>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {sidebarLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-sm transition-colors
                      ${location.pathname === link.href 
                        ? 'bg-primary-foreground/10 text-primary-foreground' 
                        : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5'
                      }
                    `}
                  >
                    <link.icon size={18} />
                    <span className="font-body text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User & Logout */}
          <div className="p-4 border-t border-primary-foreground/10">
            <div className="px-4 py-2 mb-4">
              <p className="font-body text-sm text-primary-foreground">{user.name}</p>
              <p className="font-body text-xs text-primary-foreground/50">{user.email}</p>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
