
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="hero-gradient text-white min-h-[90vh] pt-24 pb-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blue-dark opacity-20 z-0 pattern-dots"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 text-right"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              حزب <span className="text-blue-200">مستقبل وطن</span> 
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6">
              أمانة الشباب - قسم منتزة أول
            </h2>
            <p className="text-lg mb-8 opacity-90">
              كلنا نعمل من أجل مصر - شباب مصر يبنون المستقبل ويشاركون في نهضة الوطن من خلال المبادرات المجتمعية والتنموية
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/register" 
                className="btn-float bg-white text-blue-dark px-6 py-3 rounded-md font-bold hover:bg-blue-100 transition-all"
              >
                انضم إلينا
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 border-2 border-white rounded-md font-bold hover:bg-white hover:bg-opacity-10 transition-all"
              >
                تعرف علينا
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/76a8a601-f09c-4cc3-a8a8-e117e33201ea.png" 
                alt="شباب مستقبل وطن" 
                className="rounded-lg shadow-xl animate-float max-w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-darkest px-4 py-2 rounded-lg shadow-lg">
                <p className="font-bold text-sm">كلنا نعمل من أجل مصر</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
