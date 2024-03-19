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
import { DaySchedule, allProjectsProps, WeeklyScheduleProps, ProjectActivityProps, TimeEntry } from '@/lib/interfaces';
import { generateSchedule } from '@/lib/time/generateSchedule';
import { calculateTotalHours } from '@/lib/time/calculateTotalHours';
import { handleTimeChange } from '@/lib/time/handleTimeChange';
import { addHours } from '@/lib/time/addHours';
import { removeHourEntry } from '@/lib/time/removeHourEntry';
import TotalHours from './TotalHours';
import WeekNavigator from './WeekNavigator';
 

// type HourEntry = {
//     startTime: string;
//     endTime: string;
//     notes: string;
//     project: string;
//     activity: string;
//     // type: string;
// };
 
// type DaySchedule = {
//     day: string;
//     date: string;
//     hours: HourEntry[];
// };

// const initialSchedule: DaySchedule[] = [
//     { day: 'Monday', date: 'Mar 11', hours: [{ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' }] },
//     { day: 'Tuesday', date: 'Mar 12', hours: [{ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' }] },
//     { day: 'Wednesday', date: 'Mar 13', hours: [{ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' }] },
// ];

const initialSchedule: DaySchedule[] = [];
 
const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ allProjects }) => {
    const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
    const [selectedProjectId, setSelectedProjectId] = useState<string>('');
    const [selectedActivityId, setSelectedActivityId] = useState<string>('');
    const [selectedProjectActivityId, setSelectedProjectActivityId] = useState<string>('');
    const [filteredActivities, setFilteredActivities] = useState<ProjectActivityProps[]>([]);
    const [currentWeek, setCurrentWeek] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('08:00')
    const [endTime, setEndTime] = useState<string>('17:00')

 
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
 
        setStartDate(startOfWeek.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        }));
        setEndDate(endOfWeek.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
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

      setStartDate(nextWeekStart.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }));
      setEndDate(nextWeekEnd.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }));

      generateSchedule(nextWeekStart, nextWeekEnd); // Generate schedule for previous week
    }

    const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);

    const prevWeekStart = new Date(startDate);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);

    const prevWeekEnd = new Date(prevWeekStart);
    prevWeekEnd.setDate(prevWeekEnd.getDate() + 6);

    setStartDate(prevWeekStart.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }));
    setEndDate(prevWeekEnd.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }));

    generateSchedule(prevWeekStart, prevWeekEnd); // Generate schedule for previous week
    };

    const handleCurrentWeek = () => {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
    
      setStartDate(startOfWeek.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }));
      setEndDate(endOfWeek.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }));
    
      setCurrentWeek(Math.ceil((now.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24 * 7))); // Calculate current week number
      generateSchedule(startOfWeek, endOfWeek); // Generate schedule for current week
    };

    useEffect(() => {
        if (selectedProjectId) {
          const activitiesForProject = allProjects.activities.filter(activity => activity.projectId === selectedProjectId);
          setFilteredActivities(activitiesForProject);
        }
      }, [selectedProjectId, allProjects.activities]);

    // const projectActivitiesMap = new Map();

    // useEffect(() => {
    //   allProjects.activities.forEach((activity) => {
    //     const projectActivities = projectActivitiesMap.get(activity.projectId) || [];
    //     projectActivities.push(activity);
    //     projectActivitiesMap.set(activity.projectId, projectActivities);
    //   });
    // }, [allProjects.activities]);

    // useEffect(() => {
    //   if (selectedProjectId) {
    //     const activities = projectActivitiesMap.get(selectedProjectId) || [];
    //     setFilteredActivities(activities);
    //   } else {
    //     setFilteredActivities([]);
    //   }
    // }, [selectedProjectId, projectActivitiesMap]);



      const handleSaveAll = async () => {
        // Transform schedule state to match backend expectations
        const timeEntries: TimeEntry[] = schedule.flatMap(daySchedule => 
          daySchedule.hours.map(hourEntry => ({
            day: daySchedule.day,
            date: daySchedule.isoDate,
            startTime: hourEntry.startTime,
            endTime: hourEntry.endTime,
            notes: hourEntry.notes,
            projectActivityId: selectedProjectActivityId,
          }))
        );
      
        try {
          const response = await fetch('/api/time', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(timeEntries),
          });
      
          if (!response.ok) {
            throw new Error('Failed to save time entries');
          }
      
          // Handle successful save (e.g., clear form, show message)
          console.log('Time entries saved successfully');
          // Optionally, clear the form or give user feedback
        } catch (error) {
          console.error('Error saving time entries:', error);
          // Handle error (e.g., show error message to user)
        }
      };  

      const handleSave = async (dayIndex: number) => {
        // Transform schedule state to match backend expectations
        const daySchedule = schedule[dayIndex];
        const timeEntries: TimeEntry[] = daySchedule.hours.map(hourEntry => ({
            day: daySchedule.day,
            date: daySchedule.isoDate,
            startTime: hourEntry.startTime,
            endTime: hourEntry.endTime,
            notes: hourEntry.notes,
            projectActivityId: selectedProjectActivityId, 
        }));
      
        try {
          const response = await fetch('/api/time', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(timeEntries),
          });
      
          if (!response.ok) {
            throw new Error('Failed to save time entries');
          }
      
          // Handle successful save (e.g., clear form, show message)
          console.log('Time entries saved successfully');
          // Optionally, clear the form or give user feedback
        } catch (error) {
          console.error('Error saving time entries:', error);
          // Handle error (e.g., show error message to user)
        }
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
                                              handleTimeChange(dayIndex, entryIndex, 'startTime', e.target.value, schedule, setSchedule, totalHoursDisplayRef,
                                              setStartTime(e.target.value)
                                              )}
                                        />
                                    {/* </div>
                                    <div className="flex-1"> */}
                                        <Input
                                            className='mr-2'
                                            type='time'
                                            value={schedule[dayIndex].hours[entryIndex].endTime}
                                            placeholder='17:00'
                                            onChange={(e: any) => handleTimeChange(dayIndex, entryIndex, 'endTime', e.target.value, schedule, setSchedule, totalHoursDisplayRef,
                                            // setEndTime(value)
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row mb-2">
                                    <Select onValueChange={setSelectedProjectId}>
                                        <SelectTrigger className="w-[150px] border-border mr-2">
                                            <SelectValue placeholder="Select project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allProjects.projects.map((project) => (
                                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select disabled={!selectedProjectId} onValueChange={setSelectedProjectActivityId}>
                                        <SelectTrigger className="w-[150px] border-border mr-2">
                                            <SelectValue placeholder="Select activity" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredActivities.map((activity) => (
                                            <SelectItem key={activity.id} value={activity.id}>{activity.activityName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex-1">
                                            <Input className='md:w-96 mr-2'
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
                            <div className='flex flex-col md:flex-row justify-between'>
                                <Button
                                    variant={'flairnowOutline'}
                                    className="mt-2"
                                    onClick={() => addHours(dayIndex, schedule, setSchedule)}
                                >
                                    <IoAddCircle />&nbsp; Add hours
                                </Button>
                                <Button
                                    className="mt-2"
                                    variant='flairnow'
                                    onClick={() => handleSave(dayIndex)}
                                >
                                    Save
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <TotalHours schedule={schedule} handleSaveAll={handleSaveAll} />
        </div>
    );
};
 
export default WeeklySchedule;