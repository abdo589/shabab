
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const JoinCTA = () => {
  return (
    <section className="py-20 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(rgba(0, 42, 94, 0.85), rgba(0, 42, 94, 0.85)), url(/lovable-uploads/f51677d7-df3c-48e8-9410-c3ca099181fb.png)' }}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">انضم إلينا اليوم</h2>
          <p className="text-lg mb-8 opacity-90">
            كن جزءاً من فريق حزب مستقبل وطن وشارك في بناء مستقبل أفضل لمصر.
            نحن بحاجة إلى طاقتك وأفكارك الإبداعية للمساهمة في تنمية المجتمع.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-blue-dark px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all animate-pulse-glow"
          >
            انضم إلينا الآن
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-300 bg-opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-200 bg-opacity-20 blur-xl"></div>
      </div>
    </section>
  );
};

export default JoinCTA;
