import API_BASE_URL, { getAuthHeaders, getAuthHeadersForFormData } from '@/config/api';

export interface ProjectImage {
  id?: string;
  _id?: string;
  src: string;
  alt: string;
  order: number;
  publicId?: string;
}

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  category: 'weddings' | 'portraits' | 'events' | 'corporate';
  coverImage: string;
  images: ProjectImage[];
  technologies?: string[];
  githubLink?: string;
  liveLink?: string;
  featured: boolean;
  visible: boolean;
  date: string;
  createdAt?: string;
}

export interface GalleryImage {
  id?: string;
  _id?: string;
  src: string;
  alt: string;
  category: 'weddings' | 'portraits' | 'events' | 'corporate';
  featured: boolean;
  visible: boolean;
  order: number;
  createdAt?: string;
  projectId?: string;
  publicId?: string;
}

export interface Service {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  popular: boolean;
  enabled: boolean;
  createdAt?: string;
}

export interface Booking {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
  status: 'new' | 'contacted' | 'booked' | 'archived';
  notes: string;
  createdAt?: string;
}

export interface ContentBlock {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  content: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface StudioData {
  galleries: GalleryImage[];
  projects: Project[];
  services: Service[];
  bookings: Booking[];
  content: ContentBlock[];
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const defaultServices: Service[] = [
  {
    id: generateId(),
    name: 'Wedding Collection',
    description: 'Complete wedding day coverage with a cinematic approach. We capture every precious moment from preparation to celebration.',
    price: 250000,
    duration: '8-10 hours',
    includes: ['Two photographers', 'Full day coverage', '500+ edited images', 'Online gallery', 'Engagement session'],
    popular: true,
    enabled: true,
  },
  {
    id: generateId(),
    name: 'Portrait Session',
    description: 'Personal or professional portraits crafted with artistic vision. Perfect for individuals, families, or creative projects.',
    price: 35000,
    duration: '2 hours',
    includes: ['Studio or location', '30+ edited images', 'Outfit changes', 'Light retouching', 'Digital delivery'],
    popular: false,
    enabled: true,
  },
  {
    id: generateId(),
    name: 'Corporate & Events',
    description: 'Professional event documentation and corporate photography. From conferences to headshots.',
    price: 85000,
    duration: '4 hours',
    includes: ['Event coverage', 'Headshots', '150+ edited images', 'Same-day previews', 'Commercial license'],
    popular: false,
    enabled: true,
  },
  {
    id: generateId(),
    name: 'Editorial & Fashion',
    description: 'High-end fashion and editorial photography for magazines, brands, and creative portfolios.',
    price: 175000,
    duration: 'Half day',
    includes: ['Creative direction', 'Studio access', '40+ edited images', 'High-end retouching', 'Print-ready files'],
    popular: true,
    enabled: true,
  },
];

const defaultBookings: Booking[] = [
  {
    id: generateId(),
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    phone: '+91 98765 43210',
    service: 'Wedding Collection',
    preferredDate: '2025-06-15',
    message: 'We are getting married at the botanical gardens and would love to discuss your wedding packages.',
    status: 'new',
    notes: '',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: generateId(),
    name: 'James & Co Marketing',
    email: 'james@company.com',
    phone: '+91 98765 12345',
    service: 'Corporate & Events',
    preferredDate: '2025-02-20',
    message: 'Looking for corporate headshots for our team of 15 people.',
    status: 'contacted',
    notes: 'Sent pricing info via email',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const defaultContent: ContentBlock[] = [
  {
    id: generateId(),
    key: 'hero',
    title: 'YR',
    subtitle: 'FILMS',
    content: 'We capture moments that transcend time. Every frame tells a story, every image holds emotion.',
  },
  {
    id: generateId(),
    key: 'about',
    title: 'Our Philosophy',
    content: 'At YRfilms, we believe photography is more than documentation—it is art. Founded on the principles of storytelling and authenticity, we approach every session with intention and craft.',
  },
  {
    id: generateId(),
    key: 'philosophy',
    title: 'The Art of Light',
    content: 'Light shapes everything. It defines mood, reveals character, and transforms ordinary moments into extraordinary memories.',
  },
];

const STORAGE_KEY = 'yrfilms_data';
const AUTH_KEY = 'yrfilms_auth';
const TOKEN_KEY = 'yrfilms_token';

const getLocalData = (): StudioData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const defaultData: StudioData = {
    galleries: [],
    projects: [],
    services: defaultServices,
    bookings: defaultBookings,
    content: defaultContent,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
};

const saveLocalData = (data: StudioData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const normalizeProject = (project: any): Project => {
  return {
    ...project,
    id: project._id || project.id,
    images: (project.images || []).map((img: any) => ({
      ...img,
      id: img._id || img.id,
    })),
  };
};

const normalizeGallery = (gallery: any): GalleryImage => {
  return {
    ...gallery,
    id: gallery._id || gallery.id,
  };
};

const normalizeService = (service: any): Service => {
  return {
    ...service,
    id: service._id || service.id,
  };
};

const normalizeBooking = (booking: any): Booking => {
  return {
    ...booking,
    id: booking._id || booking.id,
  };
};

export const projectsApi = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/all`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        return data.projects.map(normalizeProject);
      }
      return [];
    } catch (error) {
      console.error('Error fetching all projects:', error);
      return [];
    }
  },
  
  async getVisible(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await response.json();
      if (data.success) {
        return data.projects.map(normalizeProject);
      }
      return [];
    } catch (error) {
      console.error('Error fetching visible projects:', error);
      return [];
    }
  },
  
  async getByCategory(category: string): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects?category=${category}`);
      const data = await response.json();
      if (data.success) {
        return data.projects.map(normalizeProject);
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return [];
    }
  },
  
  async getFeatured(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects?featured=true`);
      const data = await response.json();
      if (data.success) {
        return data.projects.map(normalizeProject);
      }
      return [];
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  },
  
  async getById(id: string): Promise<Project | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
      const data = await response.json();
      if (data.success) {
        return normalizeProject(data.project);
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching project by id:', error);
      return undefined;
    }
  },
  
  async create(projectData: FormData): Promise<Project | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: getAuthHeadersForFormData(),
        body: projectData,
      });
      const data = await response.json();
      if (data.success) {
        return normalizeProject(data.project);
      }
      throw new Error(data.error || 'Failed to create project');
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
  
  async update(id: string, updates: Partial<Project> | FormData): Promise<Project | null> {
    try {
      const isFormData = updates instanceof FormData;
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: isFormData ? getAuthHeadersForFormData() : getAuthHeaders(),
        body: isFormData ? updates : JSON.stringify(updates),
      });
      const data = await response.json();
      if (data.success) {
        return normalizeProject(data.project);
      }
      return null;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  },
  
  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  },
  
  async addImage(projectId: string, image: Omit<ProjectImage, 'id' | 'order'>): Promise<ProjectImage | null> {
    const formData = new FormData();
    formData.append('alt', image.alt);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/images`, {
        method: 'POST',
        headers: getAuthHeadersForFormData(),
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return { ...data.image, id: data.image._id };
      }
      return null;
    } catch (error) {
      console.error('Error adding image:', error);
      return null;
    }
  },
  
  async removeImage(projectId: string, imageId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/images/${imageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error removing image:', error);
      return false;
    }
  },
};

export const galleryApi = {
  async getAll(): Promise<GalleryImage[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery/all`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        return data.galleries.map(normalizeGallery);
      }
      return [];
    } catch (error) {
      console.error('Error fetching all gallery:', error);
      return [];
    }
  },
  
  async getVisible(): Promise<GalleryImage[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery`);
      const data = await response.json();
      if (data.success) {
        return data.galleries.map(normalizeGallery);
      }
      return [];
    } catch (error) {
      console.error('Error fetching visible gallery:', error);
      return [];
    }
  },
  
  async getByCategory(category: string): Promise<GalleryImage[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery?category=${category}`);
      const data = await response.json();
      if (data.success) {
        return data.galleries.map(normalizeGallery);
      }
      return [];
    } catch (error) {
      console.error('Error fetching gallery by category:', error);
      return [];
    }
  },
  
  async getFeatured(): Promise<GalleryImage[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery?featured=true`);
      const data = await response.json();
      if (data.success) {
        return data.galleries.map(normalizeGallery);
      }
      return [];
    } catch (error) {
      console.error('Error fetching featured gallery:', error);
      return [];
    }
  },
  
  async create(imageData: FormData): Promise<GalleryImage | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: 'POST',
        headers: getAuthHeadersForFormData(),
        body: imageData,
      });
      const data = await response.json();
      if (data.success) {
        return normalizeGallery(data.gallery);
      }
      throw new Error(data.error || 'Failed to create gallery image');
    } catch (error) {
      console.error('Error creating gallery image:', error);
      throw error;
    }
  },
  
  async update(id: string, updates: Partial<GalleryImage> | FormData): Promise<GalleryImage | null> {
    try {
      const isFormData = updates instanceof FormData;
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'PUT',
        headers: isFormData ? getAuthHeadersForFormData() : getAuthHeaders(),
        body: isFormData ? updates : JSON.stringify(updates),
      });
      const data = await response.json();
      if (data.success) {
        return normalizeGallery(data.gallery);
      }
      return null;
    } catch (error) {
      console.error('Error updating gallery image:', error);
      return null;
    }
  },
  
  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      return false;
    }
  },
};

export const servicesApi = {
  async getAll(): Promise<Service[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      if (data.success) {
        return data.services.map(normalizeService);
      }
      return [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },
  
  async getEnabled(): Promise<Service[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/enabled`);
      const data = await response.json();
      if (data.success) {
        return data.services.map(normalizeService);
      }
      return [];
    } catch (error) {
      console.error('Error fetching enabled services:', error);
      return [];
    }
  },
  
  async create(service: Omit<Service, 'id' | 'createdAt'>): Promise<Service | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(service),
      });
      const data = await response.json();
      if (data.success) {
        return normalizeService(data.service);
      }
      throw new Error(data.error || 'Failed to create service');
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },
  
  async update(id: string, updates: Partial<Service>): Promise<Service | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (data.success) {
        return normalizeService(data.service);
      }
      return null;
    } catch (error) {
      console.error('Error updating service:', error);
      return null;
    }
  },
  
  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting service:', error);
      return false;
    }
  },
};

export const bookingsApi = {
  async getAll(): Promise<Booking[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        return data.bookings.map(normalizeBooking);
      }
      return [];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  },
  
  async create(booking: Omit<Booking, 'id' | 'status' | 'notes' | 'createdAt'>): Promise<Booking> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      const data = await response.json();
      if (data.success) {
        return normalizeBooking(data.booking);
      }
      throw new Error(data.error || 'Failed to create booking');
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
  
  async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (data.success) {
        return normalizeBooking(data.booking);
      }
      return null;
    } catch (error) {
      console.error('Error updating booking:', error);
      return null;
    }
  },
  
  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
  },
};

export const contentApi = {
  async getAll(): Promise<ContentBlock[]> {
    const data = getLocalData();
    return data.content;
  },
  
  async getByKey(key: string): Promise<ContentBlock | undefined> {
    const data = getLocalData();
    return data.content.find(c => c.key === key);
  },
  
  async update(key: string, updates: Partial<ContentBlock>): Promise<ContentBlock | null> {
    const data = getLocalData();
    const index = data.content.findIndex(c => c.key === key);
    if (index === -1) return null;
    data.content[index] = { ...data.content[index], ...updates };
    saveLocalData(data);
    return data.content[index];
  },
};

export const authApi = {
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success && data.user && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      
      return { success: false, error: data.error || 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Failed to connect to server' };
    }
  },
  
  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
  
  getUser(): AdminUser | null {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  },
  
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      
      if (data.success && data.user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
        return true;
      }
      
      this.logout();
      return false;
    } catch (error) {
      this.logout();
      return false;
    }
  },
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
