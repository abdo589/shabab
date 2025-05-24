
import { User, Event } from '../models';

export interface MonthlyData {
  month: string;
  count: number;
  date: Date;
}

export interface EventStatusData {
  name: string;
  value: number;
}

export interface EventParticipationData {
  name: string;
  participants: number;
  date: string;
}

export interface GenderData {
  name: string;
  value: number;
}

export const getMonthlyUserData = (users: User[]): MonthlyData[] => {
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

export const getEventStatusData = (events: Event[]): EventStatusData[] => {
  const statusCount = events.reduce((acc, event) => {
    acc[event.status] = (acc[event.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count
  }));
};

export const getEventParticipationData = (events: Event[]): EventParticipationData[] => {
  return events.map(event => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    participants: event.participants,
    date: event.date
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getGenderData = (users: User[]): GenderData[] => {
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
