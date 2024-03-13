import { calculateTotalHours } from "./calculateTotalHours";

export const removeHourEntry = (dayIndex: number, entryIndex: number, schedule, setSchedule, totalHoursDisplayRef) => {
  const newSchedule = [...schedule];
  newSchedule[dayIndex].hours.splice(entryIndex, 1);
  setSchedule(newSchedule);

  // Recalculate total hours after removing entry
  const totalHours = calculateTotalHours(schedule, dayIndex);
  if (totalHoursDisplayRef.current) {
      totalHoursDisplayRef.current.textContent = `${totalHours}h`;
  }
};