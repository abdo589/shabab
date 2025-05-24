
import { motion } from 'framer-motion';
import { User, Event } from './models';
import AnalyticsStats from './analytics/AnalyticsStats';
import MonthlyUsersChart from './analytics/MonthlyUsersChart';
import EventStatusChart from './analytics/EventStatusChart';
import EventParticipationChart from './analytics/EventParticipationChart';
import GenderChart from './analytics/GenderChart';
import {
  getMonthlyUserData,
  getEventStatusData,
  getEventParticipationData,
  getGenderData
} from './analytics/dataUtils';

interface DataAnalyticsProps {
  users: User[];
  events: Event[];
}

const DataAnalytics = ({ users, events }: DataAnalyticsProps) => {
  const monthlyUserData = getMonthlyUserData(users);
  const eventStatusData = getEventStatusData(events);
  const eventParticipationData = getEventParticipationData(events);
  const genderData = getGenderData(users);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={sectionVariants}>
        <AnalyticsStats 
          users={users} 
          events={events} 
          monthlyUserData={monthlyUserData} 
        />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={sectionVariants}
      >
        <MonthlyUsersChart data={monthlyUserData} />
        <EventStatusChart data={eventStatusData} />
        <EventParticipationChart data={eventParticipationData} />
        <GenderChart data={genderData} />
      </motion.div>
    </motion.div>
  );
};

export default DataAnalytics;
