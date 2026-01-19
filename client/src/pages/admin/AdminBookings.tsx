import { useState, useEffect } from 'react';
import { bookingsApi, type Booking } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    const data = await bookingsApi.getAll();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => { loadBookings(); }, []);

  const updateStatus = async (id: string, status: Booking['status']) => {
    await bookingsApi.update(id, { status });
    toast({ title: 'Status updated' });
    loadBookings();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-foreground">Booking Inquiries</h1>
      
      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-muted animate-pulse" />)}</div>
      ) : bookings.length === 0 ? (
        <p className="text-muted-foreground">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-card border border-border p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading text-xl text-card-foreground">{booking.name}</h3>
                  <p className="font-body text-sm text-muted-foreground">{booking.email} • {booking.phone}</p>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    <strong>Service:</strong> {booking.service} | <strong>Date:</strong> {booking.preferredDate}
                  </p>
                  <p className="font-body text-sm text-card-foreground mt-2">{booking.message}</p>
                </div>
                <Select value={booking.status} onValueChange={(value) => updateStatus(booking.id, value as Booking['status'])}>
                  <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
