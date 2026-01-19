import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import Gallery from './models/Gallery.js';
import Service from './models/Service.js';
import Booking from './models/Booking.js';

// Load environment variables
dotenv.config();

// MongoDB connection string
// NOTE: Do not hardcode credentials here. Use server/.env (MONGO_URI).
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ Missing MONGO_URI. Create server/.env and set MONGO_URI=<your connection string>.');
  process.exit(1);
}

// Sample projects data
const sampleProjects = [
  {
    title: 'Elegant Wedding Celebration',
    description: 'A beautiful outdoor wedding ceremony captured with cinematic precision. Every moment from the vows to the first dance was documented with artistic vision.',
    category: 'weddings',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    coverImagePublicId: 'yrfilms/projects/wedding-cover-1',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        alt: 'Wedding ceremony',
        publicId: 'yrfilms/projects/wedding-1',
        order: 0,
      },
      {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
        alt: 'Wedding reception',
        publicId: 'yrfilms/projects/wedding-2',
        order: 1,
      },
      {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
        alt: 'Bridal portraits',
        publicId: 'yrfilms/projects/wedding-3',
        order: 2,
      },
    ],
    technologies: ['Canon EOS R5', 'Sony A7III'],
    featured: true,
    visible: true,
    date: '2024-06-15',
  },
  {
    title: 'Corporate Headshots Collection',
    description: 'Professional headshots for a tech company team. Clean, modern aesthetic with consistent lighting and composition.',
    category: 'corporate',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    coverImagePublicId: 'yrfilms/projects/corporate-cover-1',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        alt: 'Corporate headshot',
        publicId: 'yrfilms/projects/corporate-1',
        order: 0,
      },
      {
        src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
        alt: 'Professional portrait',
        publicId: 'yrfilms/projects/corporate-2',
        order: 1,
      },
    ],
    technologies: ['Studio Lighting', 'Canon EOS R5'],
    featured: false,
    visible: true,
    date: '2024-05-20',
  },
  {
    title: 'Portrait Session - Family',
    description: 'A warm family portrait session in natural light. Capturing genuine connections and timeless moments.',
    category: 'portraits',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    coverImagePublicId: 'yrfilms/projects/portrait-cover-1',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
        alt: 'Family portrait',
        publicId: 'yrfilms/projects/portrait-1',
        order: 0,
      },
      {
        src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
        alt: 'Family moments',
        publicId: 'yrfilms/projects/portrait-2',
        order: 1,
      },
    ],
    technologies: ['Natural Light', 'Sony A7III'],
    featured: true,
    visible: true,
    date: '2024-07-10',
  },
  {
    title: 'Music Festival Coverage',
    description: 'Dynamic event photography capturing the energy and atmosphere of a major music festival.',
    category: 'events',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafb3?w=800',
    coverImagePublicId: 'yrfilms/projects/event-cover-1',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafb3?w=800',
        alt: 'Concert stage',
        publicId: 'yrfilms/projects/event-1',
        order: 0,
      },
      {
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        alt: 'Crowd energy',
        publicId: 'yrfilms/projects/event-2',
        order: 1,
      },
    ],
    technologies: ['Event Photography', 'Canon EOS R5'],
    featured: false,
    visible: true,
    date: '2024-08-05',
  },
];

// Sample services data
const sampleServices = [
  {
    name: 'Wedding Collection',
    description: 'Complete wedding day coverage with a cinematic approach. We capture every precious moment from preparation to celebration.',
    price: 250000,
    duration: '8-10 hours',
    includes: ['Two photographers', 'Full day coverage', '500+ edited images', 'Online gallery', 'Engagement session'],
    popular: true,
    enabled: true,
  },
  {
    name: 'Portrait Session',
    description: 'Personal or professional portraits crafted with artistic vision. Perfect for individuals, families, or creative projects.',
    price: 35000,
    duration: '2 hours',
    includes: ['Studio or location', '30+ edited images', 'Outfit changes', 'Light retouching', 'Digital delivery'],
    popular: false,
    enabled: true,
  },
  {
    name: 'Corporate & Events',
    description: 'Professional event documentation and corporate photography. From conferences to headshots.',
    price: 85000,
    duration: '4 hours',
    includes: ['Event coverage', 'Headshots', '150+ edited images', 'Same-day previews', 'Commercial license'],
    popular: false,
    enabled: true,
  },
  {
    name: 'Editorial & Fashion',
    description: 'High-end fashion and editorial photography for magazines, brands, and creative portfolios.',
    price: 175000,
    duration: 'Half day',
    includes: ['Creative direction', 'Studio access', '40+ edited images', 'High-end retouching', 'Print-ready files'],
    popular: true,
    enabled: true,
  },
];

// Sample gallery data
const sampleGallery = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    alt: 'Wedding ceremony',
    category: 'weddings',
    featured: true,
    visible: true,
    order: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    alt: 'Family portrait',
    category: 'portraits',
    featured: true,
    visible: true,
    order: 1,
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    alt: 'Corporate headshot',
    category: 'corporate',
    featured: false,
    visible: true,
    order: 2,
  },
  {
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafb3?w=800',
    alt: 'Concert event',
    category: 'events',
    featured: false,
    visible: true,
    order: 3,
  },
];

// Sample bookings data
const sampleBookings = [
  {
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    phone: '+91 98765 43210',
    service: 'Wedding Collection',
    preferredDate: '2025-06-15',
    message: 'We are getting married at the botanical gardens and would love to discuss your wedding packages.',
    status: 'new',
    notes: '',
  },
  {
    name: 'James & Co Marketing',
    email: 'james@company.com',
    phone: '+91 98765 12345',
    service: 'Corporate & Events',
    preferredDate: '2025-02-20',
    message: 'Looking for corporate headshots for our team of 15 people.',
    status: 'contacted',
    notes: 'Sent pricing info via email',
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Gallery.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Existing data cleared');

    // Seed Users
    console.log('👤 Seeding users...');
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@yrfilms.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`✅ Created admin user: ${adminUser.email}`);

    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@yrfilms.com',
      password: 'user123',
      role: 'user',
    });
    console.log(`✅ Created regular user: ${regularUser.email}`);

    // Seed Projects
    console.log('📸 Seeding projects...');
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Created ${createdProjects.length} projects`);

    // Seed Services
    console.log('💼 Seeding services...');
    const createdServices = await Service.insertMany(sampleServices);
    console.log(`✅ Created ${createdServices.length} services`);

    // Seed Gallery
    console.log('🖼️  Seeding gallery...');
    const createdGallery = await Gallery.insertMany(sampleGallery);
    console.log(`✅ Created ${createdGallery.length} gallery images`);

    // Seed Bookings
    console.log('📅 Seeding bookings...');
    const createdBookings = await Booking.insertMany(sampleBookings);
    console.log(`✅ Created ${createdBookings.length} bookings`);

    // Summary
    console.log('\n📊 Seed Summary:');
    console.log(`   Users: ${await User.countDocuments()}`);
    console.log(`   Projects: ${await Project.countDocuments()}`);
    console.log(`   Services: ${await Service.countDocuments()}`);
    console.log(`   Gallery: ${await Gallery.countDocuments()}`);
    console.log(`   Bookings: ${await Booking.countDocuments()}`);
    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@yrfilms.com / admin123');
    console.log('   User:  user@yrfilms.com / user123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seed
seedDatabase();
