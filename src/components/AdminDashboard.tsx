
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import { supabase } from "@/integrations/supabase/client";

// Import smaller components
import Header from './admin/Header';
import StatCards from './admin/StatCards';
import UsersTable from './admin/UsersTable';
import EventsTable from './admin/EventsTable';
import { User, Event } from './admin/models';

const mockEvents: Event[] = [
  { id: 1, title: 'افطار صائم', date: '2025-04-10', participants: 45, status: 'منتهي' },
  { id: 2, title: 'توزيع مواد غذائية', date: '2025-05-15', participants: 30, status: 'منتهي' },
  { id: 3, title: 'مبادرة شتاء دافئ', date: '2025-12-20', participants: 0, status: 'قادم' },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin, logout } = useAuth();

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
        setUsers(data);
      }
    } catch (error) {
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
    if (isAdmin) {
      fetchRegistrations();
    }
  }, [isAdmin]);
  
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-red-600">غير مصرح بالوصول. يرجى تسجيل الدخول كمسؤول.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header onLogout={logout} />
      
      {/* Stats Cards */}
      <StatCards users={users} events={events} />
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">المستخدمون المسجلين</TabsTrigger>
          <TabsTrigger value="events">الفعاليات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UsersTable users={users} loading={loading} />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsTable events={events} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
