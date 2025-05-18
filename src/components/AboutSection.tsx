
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image Part */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="/lovable-uploads/fc8783d2-523f-4cb1-88a7-dc34fb46d4ff.png"
                alt="حزب مستقبل وطن - قيادات الحزب"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-blue-dark text-white p-4 rounded-lg shadow-lg">
                <span className="font-bold">قيادات الحزب</span>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">من نحن</h2>
            <h3 className="text-xl md:text-2xl text-blue-dark mb-4">حزب مستقبل وطن - أمانة الشباب بقسم المنتزة أول</h3>
            
            <p className="mb-4 text-gray-700">
              حزب مستقبل وطن هو حزب سياسي مصري تأسس لدعم التنمية والإصلاح في مصر، ويهدف إلى بناء جسور التواصل بين المواطنين والحكومة، وتعزيز مشاركة الشباب في الحياة السياسية والاجتماعية.
            </p>
            
            <p className="mb-6 text-gray-700">
              أمانة الشباب بقسم المنتزة أول تعمل على تنفيذ رؤية الحزب من خلال مشاريع ومبادرات محلية تهدف إلى تحسين معيشة المواطنين والارتقاء بالخدمات المقدمة لهم، وتشجيع مشاركة الشباب في بناء مستقبل أفضل لمصر.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                to="/about" 
                className="px-6 py-3 bg-blue-gradient text-white rounded-md hover:opacity-90 transition-all"
              >
                اقرأ المزيد عن الحزب
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-3 border-2 border-blue-dark text-blue-dark rounded-md hover:bg-blue-50 transition-all"
              >
                انضم إلينا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
