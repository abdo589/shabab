
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If the user is logged in but not an admin, redirect to home
    if (isLoggedIn && !isAdmin) {
      navigate('/');
    }
  }, [isLoggedIn, isAdmin, navigate]);

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
                <AdminDashboard />
              ) : (
                <div className="max-w-md mx-auto">
                  <LoginForm />
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
