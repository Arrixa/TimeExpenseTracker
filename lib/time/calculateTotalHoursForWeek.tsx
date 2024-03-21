import { DaySchedule } from "../interfaces";

export function calculateTotalHoursForWeek(schedule: DaySchedule[]) {
  let totalHours = 0;
  schedule.forEach(daySchedule => {
    // Loop through each entry in a day to sum hours
    daySchedule.entries.forEach(entry => {
      totalHours += entry.hours;
    });
  });
  return totalHours;
}