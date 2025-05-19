
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

// Import smaller components
import StatCards from './admin/StatCards';
import UsersTable from './admin/UsersTable';
import EventsTable from './admin/EventsTable';
import { User, Event } from './admin/models';

const mockEvents: Event[] = [
  { id: 1, title: 'افطار صائم', date: '2025-04-10', participants: 45, status: 'منتهي' },
  { id: 2, title: 'توزيع مواد غذائية', date: '2025-05-15', participants: 30, status: 'منتهي' },
  { id: 3, title: 'مبادرة شتاء دافئ', date: '2025-12-20', participants: 0, status: 'قادم' },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [events] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      if (data) {
        console.log("تم استلام بيانات المستخدمين:", data.length);
        setUsers(data);
      }
    } catch (error) {
      console.error("خطأ في استرجاع البيانات:", error);
      if (error instanceof Error) {
        toast({
          title: "خطأ في استرجاع البيانات",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    
    // إعادة تحميل البيانات كل 30 ثانية
    const interval = setInterval(() => {
      fetchRegistrations();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">مرحباً بك في لوحة التحكم</h2>
        <Button 
          variant="outline" 
          onClick={onLogout} 
          className="text-sm flex gap-2 items-center"
        >
          <LogOut size={16} />
          تسجيل الخروج
        </Button>
      </div>
      
      {/* Stats Cards */}
      <StatCards users={users} events={events} />
      
      <Tabs defaultValue="users" className="mt-6">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="users" className="data-[state=active]:bg-white">المستخدمون المسجلين</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-white">الفعاليات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UsersTable users={users} loading={loading} />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsTable events={events} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminDashboard;
