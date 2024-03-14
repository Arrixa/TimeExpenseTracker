import { calculateTotalHours } from "./calculateTotalHours";

export const handleTimeChange = (dayIndex: number, entryIndex: number, field: 'startTime' | 'endTime', value: string, schedule, setSchedule, totalHoursDisplayRef) => {
  const newSchedule = [...schedule];

  newSchedule[dayIndex].hours[entryIndex][field] = value;
  setSchedule(newSchedule);

  // Recalculate total hours after time change
  const totalHours = calculateTotalHours(schedule, dayIndex);
  if (totalHoursDisplayRef.current) {
      totalHoursDisplayRef.current.textContent = `${totalHours}h`;
  }
}; 

