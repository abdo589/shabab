
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from './models';
import { Download, Search, Loader2, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';

interface UsersTableProps {
  users: User[];
  loading: boolean;
}

const UsersTable = ({ users, loading }: UsersTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exporting, setExporting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
  };

  const exportToExcel = () => {
    setExporting(true);
    try {
      const exportData = users.map(user => ({
        'الاسم': user.full_name,
        'الرقم القومي': user.national_id,
        'رقم الهاتف': user.phone,
        'البريد الإلكتروني': user.email || '-',
        'العنوان': user.address,
        'الجنس': user.gender,
        'تاريخ الميلاد': user.birth_date,
        'نوع العضوية': user.member_type || 'عضو',
        'تاريخ التسجيل': formatDate(user.created_at),
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "المسجلين");
      XLSX.writeFile(wb, "المسجلين_حزب_مستقبل_وطن.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setExporting(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name.includes(searchTerm) || 
    user.national_id.includes(searchTerm) ||
    user.phone.includes(searchTerm) ||
    (user.email && user.email.includes(searchTerm))
  );

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="بحث..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          onClick={exportToExcel} 
          disabled={exporting || users.length === 0} 
          className="bg-green-600 hover:bg-green-700 transition-all min-w-[160px]"
        >
          {exporting ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري التصدير...
            </>
          ) : (
            <>
              <FileText className="ml-2 h-4 w-4" />
              تصدير إلى Excel
            </>
          )}
        </Button>
      </div>

      <div>
        <Table>
          <TableCaption>قائمة الأعضاء المسجلين ({filteredUsers.length})</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-right font-bold">الإسم</TableHead>
              <TableHead className="text-right font-bold">رقم الهاتف</TableHead>
              <TableHead className="text-right font-bold">الرقم القومي</TableHead>
              <TableHead className="text-right font-bold">الجنس</TableHead>
              <TableHead className="text-right font-bold">نوع العضوية</TableHead>
              <TableHead className="text-right font-bold">تاريخ التسجيل</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-dark" />
                  </div>
                  <span className="mt-2 block">جاري تحميل البيانات...</span>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchTerm ? 'لا توجد نتائج مطابقة للبحث' : 'لا يوجد مستخدمين مسجلين بعد'}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-blue-50 transition-colors">
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.national_id}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.member_type || 'عضو'}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
