import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import SignupForm from '@/components/SignupForm';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoSection />
      <SignupForm />
      <FAQ />
    </main>
  );
}
