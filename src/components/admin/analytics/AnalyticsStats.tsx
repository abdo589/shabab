
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Users, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { User, Event } from '../models';
import { MonthlyData } from './dataUtils';

interface AnalyticsStatsProps {
  users: User[];
  events: Event[];
  monthlyUserData: MonthlyData[];
}

const AnalyticsStats = ({ users, events, monthlyUserData }: AnalyticsStatsProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <motion.div variants={iconVariants} initial="hidden" animate="visible">
                <Users className="h-8 w-8 text-blue-600" />
              </motion.div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                <motion.p 
                  className="text-2xl font-bold"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {users.length}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <motion.div variants={iconVariants} initial="hidden" animate="visible">
                <Activity className="h-8 w-8 text-green-600" />
              </motion.div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الفعاليات</p>
                <motion.p 
                  className="text-2xl font-bold"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {events.length}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <motion.div variants={iconVariants} initial="hidden" animate="visible">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </motion.div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">مجموع المشاركين</p>
                <motion.p 
                  className="text-2xl font-bold"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {events.reduce((sum, event) => sum + event.participants, 0)}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <Card className="border-t-4 border-t-orange-500 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <motion.div variants={iconVariants} initial="hidden" animate="visible">
                <CalendarDays className="h-8 w-8 text-orange-600" />
              </motion.div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">هذا الشهر</p>
                <motion.p 
                  className="text-2xl font-bold"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {monthlyUserData.length > 0 ? monthlyUserData[monthlyUserData.length - 1]?.count || 0 : 0}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsStats;
