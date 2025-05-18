
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Convert Google Drive link to embedded format
    const driveUrl = "https://drive.google.com/file/d/1dFeXjWiPgQ2fZ2DMLvEbT-0o7nDBmJNm/view";
    const fileId = driveUrl.match(/\/d\/([^\/]*)/)?.[1] || '';
    setPdfUrl(`https://drive.google.com/file/d/${fileId}/preview`);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-blue-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
              <p className="text-lg opacity-90">
                تعرف على حزب مستقبل وطن وأهدافه ورؤيته ورسالته في خدمة المجتمع المصري
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Party Image */}
              <div className="lg:col-span-1">
                <motion.div
                  className="sticky top-24"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img 
                    src="/lovable-uploads/bde8e349-1ec1-4665-83e8-e1df50416b31.png" 
                    alt="شعار حزب مستقبل وطن" 
                    className="w-full max-w-xs mx-auto mb-6"
                  />
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">حزب مستقبل وطن</h3>
                    <p className="text-gray-600 mb-4">تأسس حزب مستقبل وطن بهدف دعم الدولة المصرية والمساهمة في تحقيق التنمية المستدامة والإصلاح الشامل.</p>
                    <div className="text-sm text-gray-500">
                      <p className="mb-1"><strong>سنة التأسيس:</strong> 2014</p>
                      <p className="mb-1"><strong>المقر الرئيسي:</strong> القاهرة، مصر</p>
                      <p><strong>الانتشار:</strong> جميع محافظات مصر</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* About Text */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-blue-dark">تاريخ وأهداف الحزب</h2>
                  
                  <div className="prose prose-lg max-w-none mb-10">
                    <p>
                      تأسس حزب مستقبل وطن انطلاقاً من رؤية واضحة لدعم الدولة المصرية في مسيرتها نحو التنمية والإصلاح الشامل. يهدف الحزب إلى المساهمة في بناء جسور التواصل بين المواطنين والحكومة، وتعزيز مشاركة الشباب في الحياة السياسية والاجتماعية.
                    </p>
                    
                    <p>
                      يسعى الحزب من خلال أمانات الشباب في المحافظات المختلفة إلى تنفيذ مبادرات مجتمعية تلامس احتياجات المواطنين وتعمل على تحسين حياتهم اليومية، وذلك من خلال مشروعات الدعم الاجتماعي والاقتصادي والثقافي.
                    </p>
                    
                    <p>
                      أمانة الشباب بقسم المنتزة أول بالإسكندرية هي إحدى الأمانات الفعالة التي تعمل على تنفيذ رؤية الحزب من خلال العديد من المبادرات والفعاليات التي تستهدف مختلف شرائح المجتمع، وخاصة الفئات الأكثر احتياجاً.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">رؤية الحزب</h3>
                    <p>
                      يتطلع حزب مستقبل وطن إلى المساهمة في بناء مصر قوية ومتطورة، تنعم بالاستقرار السياسي والاقتصادي والاجتماعي، وتتمتع بمكانة إقليمية ودولية مرموقة، من خلال دعم مؤسسات الدولة وجهودها في تحقيق التنمية المستدامة والإصلاح الشامل.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">رسالة الحزب</h3>
                    <p>
                      العمل على تحقيق نهضة شاملة في مختلف المجالات السياسية والاقتصادية والاجتماعية والثقافية، من خلال تبني سياسات وبرامج تعزز مفاهيم المواطنة والديمقراطية والعدالة الاجتماعية، وتمكين المرأة والشباب، وتحقيق التكافل الاجتماعي، ودعم الفئات الأكثر احتياجاً.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">لوائح الحزب</h3>
                    <p>
                      يمكنك الاطلاع على اللوائح الداخلية للحزب من خلال المستند التالي:
                    </p>
                  </div>
                  
                  {/* PDF Viewer */}
                  <div className="bg-gray-100 p-4 rounded-lg mb-10">
                    {pdfUrl && (
                      <iframe
                        src={pdfUrl}
                        width="100%"
                        height="500"
                        title="لوائح حزب مستقبل وطن"
                        className="border-0 rounded"
                      ></iframe>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
