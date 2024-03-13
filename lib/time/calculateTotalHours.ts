import { DaySchedule } from "../interfaces";

export const calculateTotalHours = (dayIndex: number, schedule: DaySchedule[]): number => {
  // Safeguard to ensure the daySchedule exists at the provided index
  if (schedule[dayIndex] === undefined) {
    console.error("DaySchedule not found at index:", dayIndex);
    return 0; // Return 0 as there are no hours to calculate
  }

  const dayEntries = schedule[dayIndex].hours;
  let totalHours = 0;

  for (const entry of dayEntries) {
    if (entry.startTime && entry.endTime) {
      // Implement logic to calculate total hours from start and end times (assuming time format is HH:MM)
      const startHours = parseInt(entry.startTime.split(':')[0], 10);
      const startMinutes = parseInt(entry.startTime.split(':')[1], 10);
      const endHours = parseInt(entry.endTime.split(':')[0], 10);
      const endMinutes = parseInt(entry.endTime.split(':')[1], 10);

      const totalMinutes = (endHours - startHours) * 60 + (endMinutes - startMinutes);
      totalHours += totalMinutes / 60;
    }
  }

  // Round total hours to two decimal places using toFixed()
  totalHours = parseFloat(totalHours.toFixed(2));

  return totalHours;
};
