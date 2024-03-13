import { DaySchedule } from "../interfaces";

export const generateSchedule = (startDate: Date, endDate: Date) => {
  const newSchedule: DaySchedule[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const isWeekend = day === 'Sat' || day === 'Sun';

      newSchedule.push({
          day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
          date: currentDate.toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          }),
          hours: isWeekend ? [] : [{ startTime: '00:00', endTime: '00:00', notes: '', type: 'Regular hours' }],
      });
      currentDate.setDate(currentDate.getDate() + 1);
  }
  return newSchedule;
};