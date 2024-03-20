import { DaySchedule } from "../interfaces";

export const generateSchedule = (startDate: Date, endDate: Date): DaySchedule[] => {
    const newSchedule: DaySchedule[] = [];
    const currentDate = new Date(startDate.getTime()); // Clone startDate to avoid modifying the original date

    while (currentDate <= endDate) {
        const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
        const isWeekend = day === 'Sat' || day === 'Sun';

        newSchedule.push({
            day: day,
            date: currentDate.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }),
            isoDate: currentDate.
            toISOString().split('T')[0], // Add the ISO string representation of the date
            data: []
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return newSchedule;
};
