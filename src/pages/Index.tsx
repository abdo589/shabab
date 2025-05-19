
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturedEvents from '../components/FeaturedEvents';
import PartyPrinciples from '../components/PartyPrinciples';
import JoinCTA from '../components/JoinCTA';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PartyPrinciples />
        <FeaturedEvents />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
