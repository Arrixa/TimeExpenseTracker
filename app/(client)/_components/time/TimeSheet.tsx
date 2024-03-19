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

import { DaySchedule, allProjectsProps, WeeklyScheduleProps, ProjectActivityProps, TimeEntry } from '@/lib/interfaces';
import { generateSchedule } from '@/lib/time/generateSchedule';
import { calculateTotalHours } from '@/lib/time/calculateTotalHours';
import { handleTimeChange } from '@/lib/time/handleTimeChange';
import { addHours } from '@/lib/time/addHours';
import { removeHourEntry } from '@/lib/time/removeHourEntry';
import TotalHours from './TotalHours';
import WeekNavigator from './WeekNavigator';
import TimeTracker from './TimeTracker';
import { Drawer, DrawerTrigger } from '@/app/components/ui/drawer';

const initialSchedule: DaySchedule[] = [];

const TimeSheet: React.FC<WeeklyScheduleProps> = ({ allProjects, timeSheetData }) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');


  console.log(timeSheetData, 'fetched times')
  const totalHoursDisplayRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateSchedule = () => {
      const now = new Date();
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      const dayInMilliseconds = 1000 * 60 * 60 * 24;
      const pastDaysOfYear = Math.floor((now.getTime() - firstDayOfYear.getTime()) / dayInMilliseconds);

      setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));

      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      setStartDate(startOfWeek.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }));
      setEndDate(endOfWeek.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }));

      // Filter time sheet data for the current week
      const filteredData = timeSheetData.filter((entry) => {
        const entryDate = new Date(entry.startTime);
        return entryDate >= startOfWeek && entryDate <= endOfWeek;
      });

      // Generate initial schedule
      const genSchedule = generateSchedule(startOfWeek, endOfWeek);

      // Update the schedule with filtered data
      const updatedSchedule = genSchedule.map((daySchedule) => {
        const dayData = filteredData.filter((entry) => {
          const entryDate = new Date(entry.startTime);
          return entryDate.toLocaleDateString('en-CA') === daySchedule.date;
        });
        return { ...daySchedule, data: dayData };
      });

      setSchedule(updatedSchedule);
    };

    updateSchedule(); // Initial update when component mounts

    // Cleanup function for useEffect
    return () => {
      // Any cleanup code if needed
    };
  }, [currentWeek, timeSheetData]);

//   useEffect(() => {
//     const now = new Date();
//     const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
//     const dayInMilliseconds = 1000 * 60 * 60 * 24;
//     const pastDaysOfYear = Math.floor((now.getTime() - firstDayOfYear.getTime()) / dayInMilliseconds);

//     setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));

//     const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(endOfWeek.getDate() + 6);

//     setStartDate(startOfWeek.toLocaleDateString('en-CA', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     }));
//     setEndDate(endOfWeek.toLocaleDateString('en-CA', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     }));

//     // Generate initial schedule
//     const genSchedule = generateSchedule(startOfWeek, endOfWeek);

//     // Filter time sheet data for the current week
//     const filteredData = timeSheetData.filter((entry) => {
//       const entryDate = new Date(entry.startTime);
//       return entryDate >= startOfWeek && entryDate <= endOfWeek;
//     });

//     // Update the schedule with filtered data
//     const updatedSchedule = genSchedule.map((daySchedule) => {
//       const dayData = filteredData.filter((entry) => {
//         const entryDate = new Date(entry.startTime);
//         return entryDate.toLocaleDateString('en-CA') === daySchedule.date;
//       });
//       return { ...daySchedule, data: dayData };
//     });

//     setSchedule(updatedSchedule);
// }, [currentWeek, timeSheetData]);

  // useEffect(() => {
  //     const now = new Date();
  //     const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
  //     const dayInMilliseconds = 1000 * 60 * 60 * 24;
  //     const pastDaysOfYear = Math.floor((now.getTime() - firstDayOfYear.getTime()) / dayInMilliseconds);

  //     setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));

  //     const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
  //     const endOfWeek = new Date(startOfWeek);
  //     endOfWeek.setDate(endOfWeek.getDate() + 6);

  //     setStartDate(startOfWeek.toLocaleDateString('en-CA', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit'
  //     }));
  //     setEndDate(endOfWeek.toLocaleDateString('en-CA', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit'
  //     }));

  //     const genSchedule = generateSchedule(startOfWeek, endOfWeek); // Generate initial schedule

  //     // Filter time sheet data for the current week
  //     const filteredData = timeSheetData.filter((entry) => {
  //       const entryDate = new Date(entry.startTime);
  //       return entryDate >= startOfWeek && entryDate <= endOfWeek;
  //     });

  //     // Update the schedule with filtered data
  //     const updatedSchedule = schedule.map((daySchedule) => {
  //       const dayData = filteredData.filter((entry) => {
  //         const entryDate = new Date(entry.startTime);
  //         return entryDate.toLocaleDateString('en-CA') === daySchedule.date;
  //       });
  //       return { ...daySchedule, data: dayData };
  //     });

  //     setSchedule(updatedSchedule);
  // }, [currentWeek]);

  const handleNextWeek = () => {
    // setCurrentWeek(currentWeek + 1);
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
  // setCurrentWeek(currentWeek - 1);

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

  console.log(schedule, 'SCHEDULE')

  return (
    <main className='flex flex-col w-full'>
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
                      <CardDescription>
                        <div className="flex items-center justify-between">
                          <p>Review your time report.</p>
                          <Drawer>
                            <DrawerTrigger asChild className="w-1/2">
                              <Button variant="flairnowOutline" className="mt-4 w-fit">
                                Add hours
                              </Button>
                            </DrawerTrigger>
                            <TimeTracker allProjects={allProjects} schedule={daySchedule}  />
                          </Drawer>
                        </div>
                      </CardDescription>
                  </CardHeader>
                  <CardContent className=''>
                    {timeSheetData.map((entry, entryIndex) => {
                      const entryDate = new Date(entry.startTime).toLocaleDateString('en-CA');
                      if (entryDate === daySchedule.date) {
                        return (
                          <div key={entryIndex} className="mt-2 flex flex-col lg:flex-row">
                            <div className="flex flex-row mb-2">
                              <p>{new Date(entry.startTime).toLocaleTimeString()}</p>
                              <p>{new Date(entry.endTime).toLocaleTimeString()}</p>
                            </div>
                            <div className="flex flex-row">
                              <Button className='' variant={'outline'}>
                                <MdDelete size={20} color='red' />
                              </Button>
                            </div>
                          </div>
                        );
                      }
                      return null; // If entry date doesn't match, return null
                    })}
                  </CardContent>
                  {/* <CardContent className=''>
                  {daySchedule.data.map((time, index) => (
                    <div key={index} className="mt-2 flex flex-col lg:flex-row">
                      <div className="flex flex-row mb-2">
                        <p>{time.startTime}</p>
                        <p>{time.endTime}</p>
                      </div>
                      <div className="flex flex-row">
                        <Button className='' variant={'outline'}>
                          <MdDelete size={20} color='red' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>  */}
              </Card>
          ))}
    </main>
  )
}

export default TimeSheet;

{/* <CardContent className=''>
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
</CardContent> */}