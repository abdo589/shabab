
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from './dataUtils';

interface MonthlyUsersChartProps {
  data: MonthlyData[];
}

const MonthlyUsersChart = ({ data }: MonthlyUsersChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تسجيل المستخدمين الجدد (آخر 6 شهور)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
  );
};

export default MonthlyUsersChart;
