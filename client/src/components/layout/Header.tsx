import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authApi, type AdminUser } from '@/lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// All pages are now dark mode - always use light text

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  
  useEffect(() => {
    setUser(authApi.getUser());
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = async () => {
    await authApi.logout();
    setUser(null);
    navigate('/');
  };

  // Complete dark mode - always use light text colors
  const getTextColor = () => 'text-foreground';
  const getTextColorMuted = () => 'text-muted-foreground';
  const getBorderColor = () => 'border-foreground/50';
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-card/98 backdrop-blur-xl shadow-xl border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-50">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className={`w-10 h-10 border-2 ${getBorderColor()} flex items-center justify-center relative overflow-hidden transition-colors duration-300`}
              whileHover={{ borderColor: "hsl(var(--accent))" }}
            >
              <motion.span 
                className={`font-heading text-lg ${getTextColor()} font-bold transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
              >
                YR
              </motion.span>
            </motion.div>
            <span className={`font-heading text-xl font-semibold tracking-tight ${getTextColor()} hidden sm:block transition-colors duration-300`}>
              FILMS
            </span>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <motion.ul 
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <Link
                to={link.href}
                className={`text-sm font-body uppercase tracking-widest transition-all duration-300 link-underline relative ${
                  location.pathname === link.href 
                    ? `${getTextColor()} opacity-100` 
                    : `${getTextColorMuted()} hover:${getTextColor()} hover:opacity-100`
                }`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Auth Buttons */}
        <motion.div
          className="hidden md:flex items-center gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`${getTextColor()} hover:${getTextColor()} hover:bg-accent/10 gap-2 transition-colors duration-300`}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <User size={16} />
                  </motion.div>
                  <span className="hidden lg:block">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-secondary border-studio-medium">
                <DropdownMenuItem className="text-secondary-foreground/70 text-xs uppercase tracking-wider">
                  {user.role === 'admin' ? 'Administrator' : 'Member'}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-studio-medium" />
                {user.role === 'admin' && (
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin/dashboard')}
                    className="cursor-pointer text-secondary-foreground hover:bg-studio-accent/20"
                  >
                    <Settings size={16} className="mr-2" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-secondary-foreground hover:bg-studio-accent/20"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/login')}
                className={`${getBorderColor().replace('border-', 'border-')}/50 ${getTextColor()} hover:bg-primary hover:text-primary-foreground transition-all duration-300`}
              >
                Sign In
              </Button>
            </motion.div>
          )}
        </motion.div>
        
        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden relative z-50 p-2 ${mobileMenuOpen ? 'text-studio-light' : getTextColor()} transition-colors duration-300`}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-primary z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-heading text-4xl transition-all duration-300 ${
                      location.pathname === link.href 
                        ? 'text-studio-light' 
                        : 'text-studio-light/60 hover:text-studio-light'
                    }`}
                  >
                    <motion.span
                      whileHover={{ x: 10, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Auth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-8 pt-8 border-t border-studio-light/20 w-48 text-center"
              >
                {user ? (
                  <div className="space-y-4">
                    <p className="text-studio-light/60 text-sm">{user.email}</p>
                    {user.role === 'admin' && (
                      <Button
                        variant="outline"
                        className="w-full border-studio-light/50 text-studio-light"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/admin/dashboard');
                        }}
                      >
                        Admin Dashboard
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full text-studio-light/70"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-studio-light/50 text-studio-light"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
