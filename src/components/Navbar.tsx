
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 space-x-reverse" onClick={closeMobileMenu}>
          <img 
            src="/lovable-uploads/bde8e349-1ec1-4665-83e8-e1df50416b31.png" 
            alt="حزب مستقبل وطن" 
            className="h-14 w-14"
          />
          <div className="text-right">
            <h1 className="text-blue-dark font-bold text-xl leading-tight">حزب مستقبل وطن</h1>
            <p className="text-sm text-gray-600">أمانة الشباب - قسم منتزة أول</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 space-x-reverse">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive('/') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
            }`}
          >
            الرئيسية
          </Link>
          <Link 
            to="/about" 
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive('/about') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
            }`}
          >
            من نحن
          </Link>
          <Link 
            to="/events" 
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive('/events') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
            }`}
          >
            الفعاليات
          </Link>
          <Link 
            to="/videos" 
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive('/videos') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
            }`}
          >
            الفيديوهات
          </Link>
          <Link 
            to="/register" 
            className="mr-4 px-6 py-2 bg-blue-dark text-white rounded-md hover:bg-blue-darkest transition-colors duration-200 animate-pulse-glow"
          >
            انضم إلينا
          </Link>
          
          {isLoggedIn && (
            <>
              <Link 
                to="/admin" 
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/admin') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
                }`}
              >
                لوحة التحكم
              </Link>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="hover:bg-red-100 hover:text-red-600"
              >
                تسجيل الخروج
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive('/') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileMenu}
            >
              الرئيسية
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive('/about') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileMenu}
            >
              من نحن
            </Link>
            <Link 
              to="/events" 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive('/events') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileMenu}
            >
              الفعاليات
            </Link>
            <Link 
              to="/videos" 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive('/videos') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileMenu}
            >
              الفيديوهات
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-blue-dark text-white rounded-md hover:bg-blue-darkest"
              onClick={closeMobileMenu}
            >
              انضم إلينا
            </Link>
            
            {isLoggedIn && (
              <>
                <Link 
                  to="/admin" 
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive('/admin') ? 'bg-blue-light text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={closeMobileMenu}
                >
                  لوحة التحكم
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="px-4 py-2 text-right text-red-600 w-full rounded-md hover:bg-red-50"
                >
                  تسجيل الخروج
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
