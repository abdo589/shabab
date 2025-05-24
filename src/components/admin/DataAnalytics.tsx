
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

  return (
    <div className="space-y-6">
      <AnalyticsStats 
        users={users} 
        events={events} 
        monthlyUserData={monthlyUserData} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyUsersChart data={monthlyUserData} />
        <EventStatusChart data={eventStatusData} />
        <EventParticipationChart data={eventParticipationData} />
        <GenderChart data={genderData} />
      </div>
    </div>
  );
};

export default DataAnalytics;
