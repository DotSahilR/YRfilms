import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, EyeOff, Star, Plus, X, Upload, FolderPlus, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { projectsApi, type Project, type ProjectImage } from '@/lib/store';
import { toast } from '@/hooks/use-toast';
import weddingImage from '@/assets/gallery-wedding.jpg';
import portraitImage from '@/assets/gallery-portrait.jpg';
import corporateImage from '@/assets/gallery-corporate.jpg';
import eventImage from '@/assets/gallery-event.jpg';

const imageMap: Record<string, string> = {
  '/gallery-wedding.jpg': weddingImage,
  '/gallery-portrait.jpg': portraitImage,
  '/gallery-corporate.jpg': corporateImage,
  '/gallery-event.jpg': eventImage,
};

const categories = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'portraits', label: 'Portraits' },
  { value: 'events', label: 'Events' },
  { value: 'corporate', label: 'Corporate' },
];

// Drag and drop image upload component
const ImageDropZone = ({ 
  images, 
  onImagesChange 
}: { 
  images: { src: string; alt: string; file?: File }[];
  onImagesChange: (images: { src: string; alt: string; file?: File }[]) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length === 0) {
      toast({ title: 'Please drop image files only', variant: 'destructive' });
      return;
    }

    const newImages = files.map((file, index) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
      file,
    }));

    onImagesChange([...images, ...newImages]);
  }, [images, onImagesChange]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
      file,
    }));

    onImagesChange([...images, ...newImages]);
    e.target.value = '';
  }, [images, onImagesChange]);

  const removeImage = useCallback((index: number) => {
    const newImages = [...images];
    // Revoke object URL to prevent memory leaks
    if (newImages[index].file) {
      URL.revokeObjectURL(newImages[index].src);
    }
    newImages.splice(index, 1);
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-accent bg-accent/10' 
            : 'border-border hover:border-accent/50'
        }`}
        animate={{ 
          scale: isDragging ? 1.02 : 1,
          borderColor: isDragging ? 'hsl(var(--accent))' : 'hsl(var(--border))'
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          animate={{ y: isDragging ? -5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <ImagePlus className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-body text-foreground mb-2">
            {isDragging ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="font-body text-sm text-muted-foreground">
            or click to browse
          </p>
        </motion.div>

        {isDragging && (
          <motion.div
            className="absolute inset-0 bg-accent/5 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Image Preview Grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div 
            className="grid grid-cols-3 sm:grid-cols-4 gap-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative aspect-square group rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Cover badge */}
                {index === 0 && (
                  <motion.span 
                    className="absolute top-2 left-2 text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded-sm font-body uppercase tracking-wider"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    Cover
                  </motion.span>
                )}
                
                {/* Remove button */}
                <motion.button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} />
                </motion.button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {images.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {images.length} image{images.length !== 1 ? 's' : ''} selected. First image will be used as cover.
        </p>
      )}
    </div>
  );
};

const AdminGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'weddings' as 'weddings' | 'portraits' | 'events' | 'corporate',
    date: '',
  });
  const [uploadedImages, setUploadedImages] = useState<{ src: string; alt: string; file?: File }[]>([]);

  const loadProjects = async () => {
    const data = await projectsApi.getAll();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const toggleVisibility = async (id: string, visible: boolean) => {
    await projectsApi.update(id, { visible: !visible });
    toast({ title: visible ? 'Project hidden' : 'Project visible' });
    loadProjects();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await projectsApi.update(id, { featured: !featured });
    toast({ title: featured ? 'Removed from featured' : 'Added to featured' });
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    await projectsApi.delete(id);
    toast({ title: 'Project deleted' });
    loadProjects();
  };

  const handleCreateProject = async () => {
    if (!newProject.title || !newProject.description) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    if (uploadedImages.length === 0) {
      toast({ title: 'Please add at least one image', variant: 'destructive' });
      return;
    }

    // In a real app, you'd upload images to a storage service here
    // For demo, we'll use the object URLs or placeholder images
    const projectImages: ProjectImage[] = uploadedImages.map((img, index) => ({
      id: `img_${Date.now()}_${index}`,
      src: img.file ? img.src : img.src, // In production, this would be the uploaded URL
      alt: img.alt || `${newProject.title} - Image ${index + 1}`,
      order: index + 1,
    }));

    await projectsApi.create({
      title: newProject.title,
      description: newProject.description,
      category: newProject.category,
      coverImage: uploadedImages[0]?.src || '/gallery-wedding.jpg',
      images: projectImages,
      featured: false,
      visible: true,
      date: newProject.date || new Date().toISOString().split('T')[0],
    });

    toast({ title: 'Project created successfully!' });
    
    // Cleanup object URLs
    uploadedImages.forEach(img => {
      if (img.file) {
        URL.revokeObjectURL(img.src);
      }
    });

    setNewProject({
      title: '',
      description: '',
      category: 'weddings',
      date: '',
    });
    setUploadedImages([]);
    setIsNewProjectOpen(false);
    loadProjects();
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-heading text-3xl text-foreground">Gallery Management</h1>
        
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2">
                <FolderPlus size={18} />
                New Project
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Create New Project</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Sarah & Michael Wedding"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newProject.date}
                    onChange={(e) => setNewProject(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProject.category}
                  onValueChange={(value) => setNewProject(prev => ({ 
                    ...prev, 
                    category: value as 'weddings' | 'portraits' | 'events' | 'corporate' 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the project..."
                  rows={3}
                />
              </div>
              
              {/* Image Upload Section */}
              <div className="space-y-2">
                <Label>Project Images *</Label>
                <ImageDropZone 
                  images={uploadedImages}
                  onImagesChange={setUploadedImages}
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => {
                  setIsNewProjectOpen(false);
                  setUploadedImages([]);
                }}>
                  Cancel
                </Button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleCreateProject}>
                    Create Project
                  </Button>
                </motion.div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <motion.div 
              key={i} 
              className="aspect-square bg-muted rounded-sm"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <motion.div
                  className="overflow-hidden rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={imageMap[project.coverImage] || project.coverImage} 
                    alt={project.title} 
                    className={`w-full aspect-square object-cover transition-all duration-500 ${!project.visible ? 'opacity-50 grayscale' : ''} group-hover:scale-110`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = weddingImage;
                    }}
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 rounded-sm"
                  initial={false}
                >
                  <p className="text-primary-foreground text-sm font-medium text-center px-2 truncate w-full">
                    {project.title}
                  </p>
                  <p className="text-primary-foreground/60 text-xs">
                    {project.images.length} image{project.images.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => toggleVisibility(project.id, project.visible)} 
                        className="text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        {project.visible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => toggleFeatured(project.id, project.featured)} 
                        className="text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        <Star size={18} fill={project.featured ? 'currentColor' : 'none'} />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => deleteProject(project.id)} 
                        className="text-primary-foreground hover:bg-destructive/80"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
                
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <span className="text-xs bg-primary/80 text-primary-foreground px-2 py-1 rounded-sm backdrop-blur-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <motion.span 
                      className="text-xs bg-accent/80 text-accent-foreground px-2 py-1 rounded-sm backdrop-blur-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      Featured
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
