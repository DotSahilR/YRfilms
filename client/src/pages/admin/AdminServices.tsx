import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { servicesApi, formatINR, type Service } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    const data = await servicesApi.getAll();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => { loadServices(); }, []);

  const toggleEnabled = async (id: string, enabled: boolean) => {
    await servicesApi.update(id, { enabled: !enabled });
    toast({ title: enabled ? 'Service disabled' : 'Service enabled' });
    loadServices();
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        className="font-heading text-3xl text-foreground"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Services Management
      </motion.h1>
      
      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => (
            <motion.div 
              key={i} 
              className="h-24 bg-muted rounded-sm"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="bg-card border border-border p-6 flex items-center justify-between group hover:border-accent/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <div>
                <h3 className="font-heading text-xl text-card-foreground">{service.name}</h3>
                <p className="font-body text-sm text-muted-foreground">
                  {formatINR(service.price)} • {service.duration}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <motion.span 
                  className="text-sm text-muted-foreground"
                  animate={{ opacity: service.enabled ? 1 : 0.5 }}
                >
                  {service.enabled ? 'Active' : 'Disabled'}
                </motion.span>
                <Switch 
                  checked={service.enabled} 
                  onCheckedChange={() => toggleEnabled(service.id, service.enabled)} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
