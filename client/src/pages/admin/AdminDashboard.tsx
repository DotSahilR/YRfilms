import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, Calendar, TrendingUp } from 'lucide-react';
import { galleryApi, servicesApi, bookingsApi, type Booking } from '@/lib/store';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    galleries: 0,
    services: 0,
    bookings: 0,
    newBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      const [galleries, services, bookings] = await Promise.all([
        galleryApi.getAll(),
        servicesApi.getAll(),
        bookingsApi.getAll(),
      ]);
      
      setStats({
        galleries: galleries.length,
        services: services.length,
        bookings: bookings.length,
        newBookings: bookings.filter(b => b.status === 'new').length,
      });
      
      setRecentBookings(bookings.slice(0, 5));
      setLoading(false);
    };
    loadData();
  }, []);
  
  const statCards = [
    { icon: Image, label: 'Gallery Images', value: stats.galleries, color: 'bg-accent' },
    { icon: FileText, label: 'Active Services', value: stats.services, color: 'bg-secondary' },
    { icon: Calendar, label: 'Total Inquiries', value: stats.bookings, color: 'bg-primary' },
    { icon: TrendingUp, label: 'New Inquiries', value: stats.newBookings, color: 'bg-muted' },
  ];
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
        <p className="font-body text-muted-foreground mt-1">
          Welcome back to YRfilms admin panel.
        </p>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-card border border-border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`w-10 h-10 ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={20} className="text-primary-foreground" />
            </div>
            <p className="font-heading text-3xl text-card-foreground">{stat.value}</p>
            <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Recent Bookings */}
      <motion.div
        className="bg-card border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="p-6 border-b border-border">
          <h2 className="font-heading text-xl text-card-foreground">Recent Inquiries</h2>
        </div>
        <div className="divide-y divide-border">
          {recentBookings.length === 0 ? (
            <div className="p-6 text-center">
              <p className="font-body text-muted-foreground">No inquiries yet.</p>
            </div>
          ) : (
            recentBookings.map(booking => (
              <div key={booking.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-body font-medium text-card-foreground">{booking.name}</p>
                  <p className="font-body text-sm text-muted-foreground">
                    {booking.service} • {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`
                  px-3 py-1 text-xs font-body uppercase tracking-wider
                  ${booking.status === 'new' ? 'bg-accent text-accent-foreground' : ''}
                  ${booking.status === 'contacted' ? 'bg-secondary text-secondary-foreground' : ''}
                  ${booking.status === 'booked' ? 'bg-primary text-primary-foreground' : ''}
                  ${booking.status === 'archived' ? 'bg-muted text-muted-foreground' : ''}
                `}>
                  {booking.status}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
