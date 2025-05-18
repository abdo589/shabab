
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../context/AuthContext';

interface User {
  id: number;
  name: string;
  nationalId: string;
  phone: string;
  address: string;
  gender: string;
  registrationDate: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
  status: 'قادم' | 'منتهي';
}

const mockUsers: User[] = [
  { id: 1, name: 'أحمد محمد علي', nationalId: '29901011234567', phone: '01012345678', address: 'الإسكندرية - المنتزة', gender: 'ذكر', registrationDate: '2025-01-15' },
  { id: 2, name: 'سارة محمود إبراهيم', nationalId: '30001011234567', phone: '01112345678', address: 'الإسكندرية - المنتزة', gender: 'أنثى', registrationDate: '2025-01-20' },
  { id: 3, name: 'محمد أحمد خالد', nationalId: '29801011234567', phone: '01212345678', address: 'الإسكندرية - المنتزة', gender: 'ذكر', registrationDate: '2025-01-25' },
  { id: 4, name: 'فاطمة علي حسن', nationalId: '29701011234567', phone: '01512345678', address: 'الإسكندرية - المنتزة', gender: 'أنثى', registrationDate: '2025-01-30' },
];

const mockEvents: Event[] = [
  { id: 1, title: 'افطار صائم', date: '2025-04-10', participants: 45, status: 'منتهي' },
  { id: 2, title: 'توزيع مواد غذائية', date: '2025-05-15', participants: 30, status: 'منتهي' },
  { id: 3, title: 'مبادرة شتاء دافئ', date: '2025-12-20', participants: 0, status: 'قادم' },
];

const AdminDashboard = () => {
  const [users] = useState<User[]>(mockUsers);
  const [events] = useState<Event[]>(mockEvents);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const handleDownloadExcel = () => {
    toast({
      title: "جاري التحميل",
      description: "تم بدء تحميل ملف البيانات بصيغة Excel",
    });
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
      <h2 className="text-2xl font-bold">لوحة التحكم</h2>
      
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
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.nationalId}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>{user.registrationDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
                        <TableCell>{event.date}</TableCell>
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
