export const addHours = (dayIndex: number, schedule, setSchedule) => {
  const newSchedule = [...schedule];
  newSchedule[dayIndex].hours.push({ startTime: '', endTime: '', notes: '', type: 'Regular hours' });
  setSchedule(newSchedule);
};