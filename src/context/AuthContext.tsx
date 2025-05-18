
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  // Initialize auth state from local storage
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsLoggedIn(authData.isLoggedIn);
      setIsAdmin(authData.isAdmin);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Check credentials against the hard-coded admin values
    if (username === "admin" && password === "watan2025") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      
      // Store auth state in local storage
      localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, isAdmin: true }));
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
      return true;
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    // Clear auth state from local storage
    localStorage.removeItem('auth');
    
    toast({
      title: "تم تسجيل الخروج",
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
