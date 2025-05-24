
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Users, Activity, TrendingUp } from 'lucide-react';
import { User, Event } from '../models';
import { MonthlyData } from './dataUtils';

interface AnalyticsStatsProps {
  users: User[];
  events: Event[];
  monthlyUserData: MonthlyData[];
}

const AnalyticsStats = ({ users, events, monthlyUserData }: AnalyticsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الفعاليات</p>
              <p className="text-2xl font-bold">{events.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">مجموع المشاركين</p>
              <p className="text-2xl font-bold">
                {events.reduce((sum, event) => sum + event.participants, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CalendarDays className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">هذا الشهر</p>
              <p className="text-2xl font-bold">
                {monthlyUserData.length > 0 ? monthlyUserData[monthlyUserData.length - 1]?.count || 0 : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsStats;
