import { Hero } from '@/components/home/Hero';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Philosophy } from '@/components/home/Philosophy';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToAction } from '@/components/home/CallToAction';

const Index = () => {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Philosophy />
      <ServicesPreview />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Index;
