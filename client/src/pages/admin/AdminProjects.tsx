"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, EyeOff, Star, Images, X, Upload, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { projectsApi, type Project } from '@/lib/store';
import { toast } from '@/hooks/use-toast';

const categories = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'portraits', label: 'Portraits' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'events', label: 'Events' },
];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'weddings' as Project['category'],
    date: new Date().toISOString().split('T')[0],
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const loadProjects = async () => {
    setLoading(true);
    const data = await projectsApi.getAll();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const handleCreateProject = async () => {
    if (!formData.title || uploadedFiles.length === 0) {
      toast({ 
        title: 'Missing information', 
        description: 'Please add a title and at least one image.',
        variant: 'destructive' 
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('visible', 'true');
      formDataToSend.append('featured', 'false');
      
      uploadedFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });
      
      await projectsApi.create(formDataToSend);
      
      toast({ title: 'Project created successfully!' });
      setIsCreateOpen(false);
      resetForm();
      loadProjects();
    } catch (error: any) {
      toast({ 
        title: 'Error creating project', 
        description: error.message || 'Something went wrong',
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'weddings',
      date: new Date().toISOString().split('T')[0],
    });
    setUploadedFiles([]);
    setPreviewUrls([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPreviewUrls(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    const formData = new FormData();
    formData.append('visible', String(!visible));
    await projectsApi.update(id, formData);
    toast({ title: visible ? 'Project hidden' : 'Project visible' });
    loadProjects();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const formData = new FormData();
    formData.append('featured', String(!featured));
    await projectsApi.update(id, formData);
    toast({ title: featured ? 'Removed from featured' : 'Added to featured' });
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await projectsApi.delete(id);
      toast({ title: 'Project deleted' });
      loadProjects();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Projects</h1>
          <p className="font-body text-muted-foreground mt-1">
            Manage your photography projects and galleries
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={18} />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Create New Project</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Project Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Sarah & Michael Wedding"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="An elegant sunset ceremony at the botanical gardens..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as Project['category'] }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
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
                  <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Project Images
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border hover:border-accent p-8 text-center cursor-pointer transition-colors group"
                >
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3 group-hover:text-accent transition-colors" />
                  <p className="font-body text-muted-foreground group-hover:text-foreground">
                    Click to upload images
                  </p>
                  <p className="font-body text-xs text-muted-foreground/60 mt-1">
                    PNG, JPG up to 10MB each
                  </p>
                </div>
                
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {previewUrls.map((src, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img 
                          src={src} 
                          alt={`Upload ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeUploadedImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-0.5">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setIsCreateOpen(false);
                    resetForm();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleCreateProject}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: projects.length },
          { label: 'Visible', value: projects.filter(p => p.visible).length },
          { label: 'Featured', value: projects.filter(p => p.featured).length },
          { label: 'Total Images', value: projects.reduce((acc, p) => acc + p.images.length, 0) },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card border border-border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {stat.label}
            </p>
            <p className="font-heading text-3xl text-card-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-[4/3] bg-muted animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border">
          <Images className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-body text-muted-foreground">No projects yet</p>
          <Button className="mt-4" onClick={() => setIsCreateOpen(true)}>
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id || project._id}
                className="bg-card border border-border overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      !project.visible ? 'opacity-50' : ''
                    }`}
                  />
                  
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleVisibility(project.id || project._id || '', project.visible)}
                      className="text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      {project.visible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleFeatured(project.id || project._id || '', project.featured)}
                      className="text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <Star size={20} fill={project.featured ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setSelectedProject(project)}
                      className="text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <Edit2 size={20} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteProject(project.id || project._id || '')}
                      className="text-primary-foreground hover:bg-destructive/80"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    {!project.visible && (
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-1 font-body uppercase tracking-wider">
                        Hidden
                      </span>
                    )}
                    {project.featured && (
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-1 font-body uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-sm px-3 py-1 flex items-center gap-2">
                    <Images size={14} className="text-primary-foreground" />
                    <span className="font-body text-xs text-primary-foreground">
                      {project.images.length}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    {project.category} • {project.date}
                  </span>
                  <h3 className="font-heading text-xl text-card-foreground mt-2 mb-1">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Category
                  </p>
                  <p className="font-body text-foreground capitalize">{selectedProject.category}</p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Date
                  </p>
                  <p className="font-body text-foreground">{selectedProject.date}</p>
                </div>
              </div>
              
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Description
                </p>
                <p className="font-body text-foreground">{selectedProject.description}</p>
              </div>
              
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Project Images ({selectedProject.images.length})
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {selectedProject.images.map((img, idx) => (
                    <div key={img.id || img._id || idx} className="relative aspect-square">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-0.5">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
