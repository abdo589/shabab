
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
  status: 'قادم' | 'منتهي';
}

interface EventsTableProps {
  events: Event[];
}

const EventsTable = ({ events }: EventsTableProps) => {
  return (
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
  );
};

export default EventsTable;
