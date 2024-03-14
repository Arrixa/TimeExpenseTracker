'use client'
import { Input } from '@/app/components/ui/input';
import React, { useEffect, useState } from 'react';
 
type HourEntry = {
    startTime: string;
    endTime: string;
    notes: string;
    project: string;
    activity: string;
    // type: string;
};
 
type DaySchedule = {
    day: string;
    date: string;
    hours: HourEntry[];
};

const initialSchedule: DaySchedule[] = [
    { day: 'Monday', date: 'Mar 11', hours: [{ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' }] },
    { day: 'Tuesday', date: 'Mar 12', hours: [{ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' }] },
    { day: 'Wednesday', date: 'Mar 13', hours: [{ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' }] },
];
 
 
const WeeklySchedule = () => {
    const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
 
    const addHours = (dayIndex: number) => {
        const newSchedule = [...schedule];
        newSchedule[dayIndex].hours.push({ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' });
        setSchedule(newSchedule);
    };

    const handleTimeChange = (dayIndex: number, entryIndex: number, field: 'startTime' | 'endTime', value: string) => {
        const newSchedule = [...schedule];
        const entry = newSchedule[dayIndex].hours[entryIndex];

        if (field === 'startTime') {
            const startTime = new Date(`2000-01-01 ${value}`);
            const endTime = new Date(`2000-01-01 ${entry.endTime}`);

            // Calculate the difference in milliseconds
            const diffMs = endTime.getTime() - startTime.getTime();
            // If the difference is negative, set endTime to be the next day
            if (diffMs < 0) {
                endTime.setDate(endTime.getDate() + 1);
            }
            // Update endTime in the entry
            entry.endTime = `${endTime.getHours() < 10 ? '0' : ''}${endTime.getHours()}:${endTime.getMinutes() < 10 ? '0' : ''}${endTime.getMinutes()}`;
        } else if (field === 'endTime') {
            const endTime = new Date(`2000-01-01 ${value}`);
            const startTime = new Date(`2000-01-01 ${entry.startTime}`);

            // Calculate the difference in milliseconds
            const diffMs = endTime.getTime() - startTime.getTime();
            // If the difference is negative, set endTime to be the next day
            if (diffMs < 0) {
                endTime.setDate(endTime.getDate() + 1);
            }
            // Update endTime in the entry
            entry.endTime = `${endTime.getHours() < 10 ? '0' : ''}${endTime.getHours()}:${endTime.getMinutes() < 10 ? '0' : ''}${endTime.getMinutes()}`;
        }

        setSchedule(newSchedule);
    };

    const calculateTotalHours = (hours: HourEntry[]) => {
        let totalHours = 0;
        hours.forEach(entry => {
            const startTime = new Date(`2000-01-01 ${entry.startTime}`);
            const endTime = new Date(`2000-01-01 ${entry.endTime}`);

            // Calculate the difference in milliseconds
            let diffMs = endTime.getTime() - startTime.getTime();
            // If the difference is negative, add a day to the difference
            if (diffMs < 0) {
                diffMs += 24 * 60 * 60 * 1000; // Add 1 day in milliseconds
            }
            // Convert milliseconds to hours and add to totalHours
            totalHours += diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
        });
        return totalHours;
    };
 
    return (
        <div className=" shadow rounded-lg p-6">
            <div className="mb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">March 11 - 17, 2024</h2>
            </div>
            {schedule.map((daySchedule, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-md  font-medium">{daySchedule.day}, {daySchedule.date}</h3>
                        <span className="text-sm ">{calculateTotalHours(daySchedule.hours)}h</span>
                    </div>
                    {daySchedule.hours.map((entry, entryIndex) => (
                        <div key={entryIndex} className="mt-2 flex">
                            <div className="flex-1 mr-2">
                                <Input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    defaultValue="09:00"
                                    value={entry.startTime}
                                    onChange={(e) => handleTimeChange(dayIndex, entryIndex, 'startTime', e.target.value)}
                               />
                            </div>
                            <div className="flex-1 mx-2">
                                <Input
                                    type="text"
                                    className="w-full p-2 border  rounded-md"
                                    defaultValue="17:00"
                                    value={entry.endTime}
                                    onChange={(e) => handleTimeChange(dayIndex, entryIndex, 'endTime', e.target.value)}
                                />
                            </div>
                            <div className="flex-1 mx-2">
                                <select className="w-full p-2 border  rounded-md ">
                                    <option>Regular hours</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="flex-1 ml-2">
                                <Input
                                    type="text"
                                    className="w-full p-2 border  rounded-md"
                                    placeholder="Notes"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        className="mt-2 text-blue-500 hover:text-blue-700"
                        onClick={() => addHours(dayIndex)}
                    >
                        Add hours
                    </button>
                </div>
            ))}
        </div>
    );
};
 
export default WeeklySchedule;