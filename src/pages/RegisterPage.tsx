
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-blue-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3 text-center">انضم إلينا</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto text-center">
              كن جزءاً من فريق حزب مستقبل وطن وشارك في بناء مستقبل أفضل لمصر
            </p>
          </div>
        </section>
        
        {/* Registration Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-dark text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">قم بالتسجيل</h3>
                  <p className="text-gray-600 text-sm">املأ نموذج التسجيل بجميع البيانات المطلوبة</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-dark text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">تلقى التأكيد</h3>
                  <p className="text-gray-600 text-sm">سيتم التواصل معك لتأكيد بياناتك والترحيب بك</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-dark text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">ابدأ المشاركة</h3>
                  <p className="text-gray-600 text-sm">شارك في أنشطة وفعاليات الحزب وكن جزءاً من التغيير</p>
                </div>
              </div>
              
              <RegistrationForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
