'use client';

import Preloader    from '@/components/ui/Preloader';
import Ticker       from '@/components/home/Ticker';
import Hero         from '@/components/home/Hero';
import About        from '@/components/home/About';
import Services     from '@/components/home/Services';
import Equipment    from '@/components/home/Equipment';
import Showcase     from '@/components/home/Showcase';
import Product3D    from '@/components/home/Product3D';
import Features     from '@/components/home/Features';
import VideoCTA     from '@/components/home/VideoCTA';
import Testimonials from '@/components/home/Testimonials';
import Delivery     from '@/components/home/Delivery';
import Contact      from '@/components/home/Contact';
import Footer       from '@/components/layout/Footer';
import { useCursor }         from '@/hooks/useCursor';
import { useReveal }         from '@/hooks/useReveal';
import { useScrollParallax } from '@/hooks/useScrollParallax';

export default function Home() {
  useCursor();
  useReveal();
  useScrollParallax();

  return (
    <>
      <div id="grain" />
      <div id="cur"   />
      <Preloader />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Equipment />
        <Showcase />
        <Product3D />
        <Features />
        <VideoCTA />
        <Testimonials />
        <Delivery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
