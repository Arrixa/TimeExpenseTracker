import { DaySchedule } from "../interfaces";
import { calculateTotalHours } from "./calculateTotalHours";

export function calculateTotalHoursForWeek(schedule: DaySchedule[]): number {
  let totalHours = 0;
  if (Array.isArray(schedule)) {
    schedule.forEach((daySchedule: DaySchedule) => {
      totalHours += calculateTotalHours(schedule.indexOf(daySchedule), schedule);
    });
  } else {
    console.error("Expected schedule to be an array, received:", typeof schedule);
  }
  return totalHours;
}