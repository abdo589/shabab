
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import * as XLSX from 'xlsx';

interface User {
  id: string;
  full_name: string;
  national_id: string;
  phone: string;
  address: string;
  gender: string;
  birth_date: string;
  education?: string;
  job_title?: string;
  created_at: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
  status: 'قادم' | 'منتهي';
}

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

  const handleDownloadExcel = () => {
    try {
      // Format data for Excel
      const formattedData = users.map(user => ({
        "الاسم": user.full_name,
        "الرقم القومي": user.national_id,
        "رقم الهاتف": user.phone,
        "البريد الإلكتروني": user.email || "",
        "العنوان": user.address,
        "الجنس": user.gender,
        "تاريخ الميلاد": user.birth_date,
        "المؤهل التعليمي": user.education || "",
        "المهنة": user.job_title || "",
        "تاريخ التسجيل": new Date(user.created_at).toLocaleDateString('ar-EG')
      }));
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "المسجلين");
      
      // Generate Excel file
      XLSX.writeFile(workbook, "المسجلين-حزب-مستقبل-وطن.xlsx");
      
      toast({
        title: "تم التحميل بنجاح",
        description: "تم تحميل بيانات المسجلين بصيغة Excel",
      });
    } catch (error) {
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل الملف",
        variant: "destructive",
      });
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-red-600">غير مصرح بالوصول. يرجى تسجيل الدخول كمسؤول.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">لوحة التحكم</h2>
        <Button variant="outline" onClick={logout} className="text-sm">
          تسجيل الخروج
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-lg">إجمالي المسجلين</CardTitle>
            <span className="text-blue-dark text-2xl font-bold">{users.length}</span>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-lg">إجمالي الفعاليات</CardTitle>
            <span className="text-blue-dark text-2xl font-bold">{events.length}</span>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-lg">المشاركات النشطة</CardTitle>
            <span className="text-blue-dark text-2xl font-bold">
              {events.reduce((sum, event) => sum + event.participants, 0)}
            </span>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">المستخدمون المسجلين</TabsTrigger>
          <TabsTrigger value="events">الفعاليات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>قائمة المسجلين</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadExcel}
                  className="text-sm"
                >
                  تحميل كملف Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-dark" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">م</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الرقم القومي</TableHead>
                        <TableHead>رقم الهاتف</TableHead>
                        <TableHead>العنوان</TableHead>
                        <TableHead>الجنس</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            لا توجد بيانات متاحة
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user, index) => (
                          <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.full_name}</TableCell>
                            <TableCell>{user.national_id}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString('ar-EG')}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>قائمة الفعاليات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">م</TableHead>
                      <TableHead>اسم الفعالية</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>عدد المشاركين</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.id}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString('ar-EG')}</TableCell>
                        <TableCell>{event.participants}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              event.status === 'قادم' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {event.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
