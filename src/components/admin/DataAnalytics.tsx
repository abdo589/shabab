
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, Users, Activity, TrendingUp } from 'lucide-react';
import { User, Event } from './models';

interface DataAnalyticsProps {
  users: User[];
  events: Event[];
}

interface MonthlyData {
  month: string;
  count: number;
  date: Date;
}

const DataAnalytics = ({ users, events }: DataAnalyticsProps) => {
  // تحليل البيانات حسب الشهر
  const getMonthlyUserData = () => {
    const monthlyData: Record<string, MonthlyData> = {};
    const monthNames = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    users.forEach(user => {
      const date = new Date(user.created_at);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: `${monthName} ${year}`,
          count: 0,
          date: date
        };
      }
      monthlyData[monthKey].count++;
    });

    return Object.values(monthlyData)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(-6); // آخر 6 شهور
  };

  // تحليل الفعاليات حسب الحالة
  const getEventStatusData = () => {
    const statusCount = events.reduce((acc, event) => {
      acc[event.status] = (acc[event.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count
    }));
  };

  // تحليل المشاركة في الفعاليات
  const getEventParticipationData = () => {
    return events.map(event => ({
      name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
      participants: event.participants,
      date: event.date
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // تحليل النوع الاجتماعي
  const getGenderData = () => {
    const genderCount = users.reduce((acc, user) => {
      const gender = user.gender === 'male' ? 'ذكور' : 'إناث';
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(genderCount).map(([gender, count]) => ({
      name: gender,
      value: count
    }));
  };

  const monthlyUserData = getMonthlyUserData();
  const eventStatusData = getEventStatusData();
  const eventParticipationData = getEventParticipationData();
  const genderData = getGenderData();

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* إحصائيات سريعة */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الرسم البياني لتسجيل المستخدمين حسب الشهر */}
        <Card>
          <CardHeader>
            <CardTitle>تسجيل المستخدمين الجدد (آخر 6 شهور)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyUserData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* الرسم البياني لحالة الفعاليات */}
        <Card>
          <CardHeader>
            <CardTitle>حالة الفعاليات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {eventStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* الرسم البياني لمشاركة الفعاليات */}
        <Card>
          <CardHeader>
            <CardTitle>عدد المشاركين في الفعاليات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eventParticipationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="participants" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع النوع الاجتماعي */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع المستخدمين حسب النوع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataAnalytics;
