import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { authApi } from '@/lib/store';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AnimatedInput = ({ 
  icon: Icon, 
  label, 
  type = "text",
  showPasswordToggle = false,
  ...props 
}: { 
  icon: React.ElementType;
  label: string;
  type?: string;
  showPasswordToggle?: boolean;
  [key: string]: unknown;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const actualType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <label className="text-sm text-primary-foreground/60 font-body uppercase tracking-widest">
        {label}
      </label>
      <div 
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 z-10">
          <Icon size={18} />
        </div>
        <Input
          type={actualType}
          className="h-14 pl-12 pr-12 bg-secondary/50 border-studio-medium/30 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent transition-all duration-300 rounded-lg"
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors z-10"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {isHovering && (
          <>
            <div 
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(107, 114, 142, 0.15), transparent 80%)`
              }}
            />
            <div 
              className="absolute inset-0 rounded-lg pointer-events-none border border-accent/30"
              style={{
                maskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 80%)`
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await authApi.login(data.email, data.password);
      if (result.success && result.user) {
        toast({
          title: 'Welcome back!',
          description: result.user.role === 'admin' ? 'Logged in as administrator.' : 'Successfully logged in.',
        });
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: 'Login failed',
          description: result.error || 'Invalid email or password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex">
      <motion.div 
        className="w-full lg:w-1/2 bg-primary flex flex-col justify-center p-8 md:p-16 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(107, 114, 142, 0.08), transparent 60%)`
            }}
          />
        )}

        <motion.div 
          className="absolute top-20 -left-20 w-40 h-40 border border-accent/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute bottom-20 -right-20 w-60 h-60 border border-accent/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 max-w-md mx-auto w-full">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            <span className="font-body text-sm uppercase tracking-widest">Back to Site</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border-2 border-primary-foreground flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-primary-foreground">YR</span>
              </div>
              <span className="font-heading text-2xl text-primary-foreground">FILMS</span>
            </div>
            <h1 className="font-heading text-4xl text-primary-foreground mb-2">Welcome Back</h1>
            <p className="font-body text-primary-foreground/60">
              Sign in to your account
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AnimatedInput
                          icon={Mail}
                          label="Email"
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AnimatedInput
                          icon={Lock}
                          label="Password"
                          showPasswordToggle
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <button type="button" className="text-sm text-accent hover:text-primary-foreground transition-colors font-body">
                    Forgot your password?
                  </button>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg relative overflow-hidden group" 
                    disabled={loading}
                  >
                    <span className="relative z-10">
                      {loading ? 'Signing in...' : 'Sign In'}
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-accent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </form>
            </Form>

            <motion.div 
              className="mt-10 pt-8 border-t border-studio-medium/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-body text-sm text-center text-primary-foreground/40 mb-4">
                Demo Credentials
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <motion.div 
                  className="p-4 bg-secondary/30 rounded-lg border border-studio-medium/20"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(107, 114, 142, 0.4)' }}
                >
                  <p className="text-accent mb-2 font-body uppercase tracking-wider text-[10px]">Admin</p>
                  <p className="text-primary-foreground/60">admin@yrfilms.com</p>
                  <p className="text-primary-foreground/60">admin123</p>
                </motion.div>
                <motion.div 
                  className="p-4 bg-secondary/30 rounded-lg border border-studio-medium/20"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(107, 114, 142, 0.4)' }}
                >
                  <p className="text-accent mb-2 font-body uppercase tracking-wider text-[10px]">User</p>
                  <p className="text-primary-foreground/60">user@yrfilms.com</p>
                  <p className="text-primary-foreground/60">user123</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=2000&auto=format&fit=crop"
          alt="Photography"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        
        <motion.div 
          className="absolute bottom-20 left-10 right-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-heading text-4xl text-primary-foreground leading-tight">
            "Every frame tells a story, every image holds emotion."
          </p>
          <p className="font-body text-primary-foreground/60 mt-4">— YRfilms</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
