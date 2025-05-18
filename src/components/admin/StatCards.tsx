
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Event } from './models';
import { Users, Calendar, UserCheck } from 'lucide-react';

interface StatCardsProps {
  users: User[];
  events: Event[];
}

const StatCards = ({ users, events }: StatCardsProps) => {
  const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Users className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-lg">إجمالي المسجلين</CardTitle>
          </div>
          <span className="text-blue-dark text-2xl font-bold">{users.length}</span>
        </CardHeader>
      </Card>
      
      <Card className="border-t-4 border-t-green-500">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Calendar className="h-8 w-8 text-green-500" />
            <CardTitle className="text-lg">إجمالي الفعاليات</CardTitle>
          </div>
          <span className="text-blue-dark text-2xl font-bold">{events.length}</span>
        </CardHeader>
      </Card>
      
      <Card className="border-t-4 border-t-amber-500">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <UserCheck className="h-8 w-8 text-amber-500" />
            <CardTitle className="text-lg">المشاركات النشطة</CardTitle>
          </div>
          <span className="text-blue-dark text-2xl font-bold">{totalParticipants}</span>
        </CardHeader>
      </Card>
    </div>
  );
};

export default StatCards;
