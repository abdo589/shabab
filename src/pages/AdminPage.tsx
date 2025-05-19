
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if admin is already logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check admin credentials
    if (username === 'admin' && password === 'watan2025') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
    } else {
      toast({
        title: "فشل تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "تم تسجيل الخروج بنجاح",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-blue-gradient text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2 text-center">لوحة التحكم</h1>
            <p className="text-sm opacity-90 max-w-2xl mx-auto text-center">
              إدارة بيانات ونشاطات حزب مستقبل وطن - أمانة الشباب بقسم المنتزة أول
            </p>
          </div>
        </section>
        
        {/* Admin Content */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {isLoggedIn ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-6 text-center">تسجيل دخول المسؤول</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            type="text"
                            placeholder="اسم المستخدم"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-blue-gradient hover:opacity-90">
                        تسجيل الدخول
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
