
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  full_name: string;
  national_id: string;
  phone: string;
  email?: string;
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

interface StatCardsProps {
  users: User[];
  events: Event[];
}

const StatCards = ({ users, events }: StatCardsProps) => {
  const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);

  return (
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
          <span className="text-blue-dark text-2xl font-bold">{totalParticipants}</span>
        </CardHeader>
      </Card>
    </div>
  );
};

export default StatCards;
