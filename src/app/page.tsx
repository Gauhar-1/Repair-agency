import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import LocalExpertise from '@/components/landing/LocalExpertise'; 
import ServicePricingGrid from '@/components/landing/ServicePricingGrid';
import MeetTheTeam from '@/components/landing/MeetTheTeam'; 
import Testimonials from '@/components/landing/Testimonials'; 
import BookingEngine from '@/components/booking/BookingEngine';
import FAQ from '@/components/landing/FAQ'; 
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-hidden">
      {/* 1. Sticky Navigation & Emergency Contact */}
      <Header />

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        {/* 2. The Hook (Conversion Engine) */}
        <Hero />
        
        {/* 3. Local SEO & The Assam Context (Why we beat national apps) */}
        <LocalExpertise />
        
        
        {/* 5. Core Services (Flat-rate pricing) */}
        <ServicePricingGrid />
        
        
        {/* 7. The W-2 Full-Time Advantage (Trust) */}
        <MeetTheTeam />
        
        {/* 8. The Frictionless Booking Flow */}
        <div id="book" className="scroll-mt-24">
          <BookingEngine />
        </div>

        {/* 9. Social Proof (The Review Flywheel Output) */}
        <Testimonials />

        {/* 10. Objection Handling */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}