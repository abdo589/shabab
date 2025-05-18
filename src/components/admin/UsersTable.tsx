
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { User } from './models';

interface UsersTableProps {
  users: User[];
  loading: boolean;
}

const UsersTable = ({ users, loading }: UsersTableProps) => {
  const { toast } = useToast();

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
        "نوع العضوية": user.member_type || "عضو",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle>قائمة المسجلين</CardTitle>
            <Button 
              variant="outline" 
              onClick={handleDownloadExcel}
              className="text-sm flex items-center gap-2"
            >
              <Download size={16} />
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
                    <TableHead>نوع العضوية</TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الجنس</TableHead>
                    <TableHead>تاريخ التسجيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        لا توجد بيانات متاحة
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user, index) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.national_id}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.member_type || "عضو"}</TableCell>
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
    </motion.div>
  );
};

export default UsersTable;
