
import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-gradient text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between mb-8">
          {/* Party Info */}
          <div className="mb-8 lg:mb-0 lg:w-1/3">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/bde8e349-1ec1-4665-83e8-e1df50416b31.png" 
                alt="حزب مستقبل وطن" 
                className="h-16 w-16 mr-3"
              />
              <div>
                <h2 className="text-xl font-bold">حزب مستقبل وطن</h2>
                <p className="text-sm opacity-80">أمانة الشباب - قسم منتزة أول</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              كلنا نعمل من أجل مصر - نسعى لبناء مستقبل أفضل للوطن من خلال تمكين الشباب وتنمية المجتمع
            </p>
            <div className="flex items-center space-x-4 space-x-reverse">
              <a 
                href="https://www.facebook.com/share/14EVvuCiPNU/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 lg:mb-0">
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:underline">الرئيسية</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:underline">من نحن</Link>
              </li>
              <li>
                <Link to="/events" className="text-sm hover:underline">الفعاليات</Link>
              </li>
              <li>
                <Link to="/videos" className="text-sm hover:underline">الفيديوهات</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:underline">انضم إلينا</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <p className="text-sm">
                <span className="opacity-80">العنوان:</span><br />
                شارع 56 البكباشي العيسوي، الاسكندرية، مصر
              </p>
              <p className="text-sm">
                <span className="opacity-80">رقم التواصل:</span><br />
                01142258314
              </p>
            </div>
          </div>
        </div>

        {/* Egypt Flag & Slogan */}
        <div className="border-t border-white border-opacity-20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/39f82d89-9d2a-4870-9fac-55f1c2de88b2.png" 
                alt="علم مصر" 
                className="w-12 h-8 object-cover"
              />
              <p className="mr-3 text-sm">كلنا نعمل من أجل مصر</p>
            </div>
            <div className="text-sm opacity-80">
              <p>تم باشراف معالي الامين محمد سلام امين الشباب قسم منتزة</p>
              <p>تم التصميم بواسطة م/ عبدالرحمن مصطفى</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
