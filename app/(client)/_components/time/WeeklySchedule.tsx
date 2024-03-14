'use client'
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { DaySchedule } from '@/lib/interfaces';
import { generateSchedule } from '@/lib/time/generateSchedule';
import { calculateTotalHours } from '@/lib/time/calculateTotalHours';
import { handleTimeChange } from '@/lib/time/handleTimeChange';
import { addHours } from '@/lib/time/addHours';
import { removeHourEntry } from '@/lib/time/removeHourEntry';
import TotalHours from './TotalHours';
import WeekNavigator from './WeekNavigator';
 
const initialSchedule: DaySchedule[] = [];
 
 
const WeeklySchedule = () => {
    const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
 
    const [currentWeek, setCurrentWeek] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
 
    const totalHoursDisplayRef = useRef<HTMLElement>(null);
 
    useEffect(() => {
        const now = new Date();
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const dayInMilliseconds = 1000 * 60 * 60 * 24;
        const pastDaysOfYear = Math.floor((now.getTime() - firstDayOfYear.getTime()) / dayInMilliseconds);
 
        setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));
 
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
 
        setStartDate(startOfWeek.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }));
        setEndDate(endOfWeek.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }));
 
        const genSchedule = generateSchedule(startOfWeek, endOfWeek); // Generate initial schedule
        setSchedule(genSchedule);
    }, []);

    const handleNextWeek = () => {
      setCurrentWeek(currentWeek + 1);
      // Update start and end dates based on new week
      const nextWeekStart = new Date(startDate);
      nextWeekStart.setDate(nextWeekStart.getDate() + 7);

      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);

      setStartDate(nextWeekStart.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
      }));
      setEndDate(nextWeekEnd.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
      }));

      generateSchedule(nextWeekStart, nextWeekEnd); // Generate schedule for previous week
  }

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);

    const prevWeekStart = new Date(startDate);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);

    const prevWeekEnd = new Date(prevWeekStart);
    prevWeekEnd.setDate(prevWeekEnd.getDate() + 6);

    setStartDate(prevWeekStart.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }));
    setEndDate(prevWeekEnd.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }));

    generateSchedule(prevWeekStart, prevWeekEnd); // Generate schedule for previous week
};

  const handleCurrentWeek = () => {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
    
      setStartDate(startOfWeek.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
      }));
      setEndDate(endOfWeek.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
      }));
    
      setCurrentWeek(Math.ceil((now.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24 * 7))); // Calculate current week number
      generateSchedule(startOfWeek, endOfWeek); // Generate schedule for current week
    };
 
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className="rounded-lg p-4">
                <WeekNavigator
                    handlePreviousWeek={handlePreviousWeek}
                    handleNextWeek={handleNextWeek}
                    handleCurrentWeek={handleCurrentWeek}
                    startDate={startDate}
                    endDate={endDate}
                />
                {schedule.map((daySchedule, dayIndex) => (
                    <Card key={dayIndex} className="mb-4">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-md  font-medium">{daySchedule.day}, {daySchedule.date}</h3>
                                    <span ref={totalHoursDisplayRef} className="text-sm ">{calculateTotalHours(dayIndex, schedule)}&nbsp;h</span>
                                </div>
                            </CardTitle>
                            <CardDescription>Enter the detailed time report.</CardDescription>
                        </CardHeader>
                        <CardContent className=''>
                            {daySchedule.hours.map((entry, entryIndex) => (
                                <div key={entryIndex} className="mt-2 flex flex-col lg:flex-row">
                                    <div className="flex flex-row mb-2">
                                        <Input
                                            type='time'
                                            className='mr-2'
                                            value={schedule[dayIndex].hours[entryIndex].startTime}
                                            placeholder='08:00'
                                            onChange={(e: any) =>
                                              handleTimeChange(dayIndex, entryIndex, 'startTime', e.target.value, schedule, setSchedule, totalHoursDisplayRef)}
                                        />
                                    {/* </div>
                                    <div className="flex-1"> */}
                                        <Input
                                            className='mr-2'
                                            type='time'
                                            value={schedule[dayIndex].hours[entryIndex].endTime}
                                            placeholder='17:00'
                                            onChange={(e: any) => handleTimeChange(dayIndex, entryIndex, 'endTime', e.target.value, schedule, setSchedule, totalHoursDisplayRef)}
                                        />
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <Select>
                                            <SelectTrigger className="w-[150px] border-border mr-2">
                                                <SelectValue placeholder="Select project" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="project1">Project 1</SelectItem>
                                                    <SelectItem value="project2">Project 2</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    {/* </div>
                                    <div className="flex-1"> */}
                                        <Select>
                                            <SelectTrigger className="w-[150px] border-border mr-2">
                                                <SelectValue placeholder="Select activity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="activityA">Activity A</SelectItem>
                                                    <SelectItem value="activityB">Activity B</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex-1">
                                            <Input className='md:w-96'
                                                placeholder="Notes"
                                            />
                                        </div>
                                        <Button className='' variant={'outline'}
                                            onClick={() => removeHourEntry(dayIndex, entryIndex, schedule, setSchedule, totalHoursDisplayRef)}>
                                            <MdDelete size={20} color='red' />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                variant={'outline'}
                                className="mt-2"
                                onClick={() => addHours(dayIndex, schedule, setSchedule)}
                            >
                                <IoAddCircle />&nbsp; Add hours
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <TotalHours schedule={schedule} />
        </div>
    );
};
 
export default WeeklySchedule;