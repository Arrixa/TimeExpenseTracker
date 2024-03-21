'use client'
import { Button } from '@/app/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { DaySchedule, allProjectsProps, WeeklyScheduleProps, ProjectActivityProps, TimeEntry } from '@/lib/interfaces';
import WeekNavigator from './WeekNavigator';
import TimeTracker from './TimeTracker';
import { Drawer, DrawerTrigger } from '@/app/components/ui/drawer';
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { Label } from '@/app/components/ui/label';
import { formatDisplayDate } from '@/lib/time/formatDisplayDate';
import { formatDisplayTime } from '@/lib/time/formatTimeDisplay';


const TimeSheet: React.FC<WeeklyScheduleProps> = ({ allProjects, timeSheetData }) => {
  const [schedule, setSchedule] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getWeekStartAndEnd = (date = new Date()) => {
    const start = new Date(date.setDate(date.getDate() - date.getDay() + 1)); 
    const end = new Date(date.setDate(date.getDate() - date.getDay() + 7)); 
    return { start, end };
  };

  // Function to handle the current week display.
  const handleCurrentWeek = () => {
    const { start, end } = getWeekStartAndEnd(new Date());
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const getStartAndEndOfWeek = (referenceDate: string) => {
    const startOfWeek = new Date(referenceDate);
    startOfWeek.setHours(0, 0, 0, 0); // start of the day to avoid hour issues
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Adjust to your week start (e.g., 1 for Monday)
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Last day of the week
  
    return {
      start: startOfWeek.toISOString().split('T')[0],
      end: endOfWeek.toISOString().split('T')[0],
    };
  };
  
  const handlePreviousWeek = () => {
    const currentStart = new Date(startDate);
    currentStart.setDate(currentStart.getDate() - 7); // Go back 7 days to get to the previous week
  
    const { start, end } = getStartAndEndOfWeek(currentStart);
    setStartDate(start);
    setEndDate(end);
  };
  
  const handleNextWeek = () => {
    const currentEnd = new Date(endDate);
    currentEnd.setDate(currentEnd.getDate() + 1); // Move to the next day after the end date
  
    const { start, end } = getStartAndEndOfWeek(currentEnd);
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset hours to start of the day
    // Find the first day of the week
    let start = new Date(now);
    start.setDate(start.getDate() - start.getDay() + 1);
    // Find the last day of the week
    let end = new Date(start);
    end.setDate(start.getDate() + 6);
  
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    handleCurrentWeek();
  }, []);

  useEffect(() => {
    const updateSchedule = async () => {
      // const data = await fetchTimeSheetData();
      const filteredData = timeSheetData.filter(entry => {
        const entryDate = new Date(entry.startTime).toISOString().split('T')[0];
        return entryDate >= startDate && entryDate <= endDate;
      });

      // Generate schedule for each day of the week.
      const newSchedule = [];
      for (let day = new Date(startDate); day <= new Date(endDate); day.setDate(day.getDate() + 1)) {
        const dayStr = day.toISOString().split('T')[0];
        const dayEntries = filteredData.filter(entry => entry.date === dayStr);
        
        newSchedule.push({
          date: dayStr,
          entries: dayEntries,
        });
      }

      setSchedule(newSchedule);
    };

    updateSchedule();
  }, [startDate, endDate]);


  console.log('SCHEDULE:', schedule)
  return (
    <main className='flex flex-col w-full'>
      <WeekNavigator
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
        handleCurrentWeek={handleCurrentWeek}
        startDate={startDate}
        endDate={endDate}
        schedule={schedule}
      />
      {schedule.map(day => {
        // Calculate the total hours for the day
        const totalHoursForDay = day.entries.reduce((totalHours, entry) => totalHours + entry.hours, 0);

        return (
          <Card key={day.date} className='mt-2'>
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>
                <h3>{formatDisplayDate(day.date)}</h3>
              </CardTitle>
              <CardDescription className=''>
                <Drawer>
                  <DrawerTrigger asChild className="w-1/2">
                    <Button variant="flairnowOutline" className="mt-4 w-fit">
                      Add hours
                    </Button>
                  </DrawerTrigger>
                  <TimeTracker allProjects={allProjects} day={day}/>
                </Drawer>
                <span className='px-4'>{totalHoursForDay} h</span>
              </CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-4'>
              <Label>Start time:</Label>
              <Label>End time:</Label>
              <Label>Time zone:</Label>
              <Label>Status:</Label>
            </CardContent>
            <CardContent>
              {day.entries.length > 0 ? (
                day.entries.map(entry => (
                  <div key={entry.id} className='grid grid-cols-4 gap-1'>
                    <p>{formatDisplayTime(entry.startTime)} </p>
                    <p>{formatDisplayTime(entry.endTime)}</p>
                    <p>{entry.timeZone}</p>
                    <p>{capitaliseFirstLetter(entry.status)}</p>
                  </div>
                ))
              ) : (
                <p>No entries for this day.</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </main>
  )
}

export default TimeSheet;

// {Object.entries(groupedData).map(([date, entries]) => (
//   <Card key={date} className="mb-4">
//       <CardHeader>
//           <CardTitle>
//               <div className="flex items-center justify-between">
//                   <h3 className="text-md font-medium">
//                       {date}
//                   </h3>
//                   <span className="text-sm ">
//                       {entries.reduce((acc, curr) => acc + curr.hours, 0)}&nbsp;h
//                   </span>
//               </div>
//           </CardTitle>
//           <CardDescription>Enter the detailed time report.</CardDescription>
//       </CardHeader>
//       <CardContent>
//           {entries.map((entry, index) => (
//               <div key={entry.id} className="mt-2 flex space-x-2">
//                   <p>Start Time: {new Date(entry.startTime).toLocaleTimeString()}</p>
//                   <p>End Time: {new Date(entry.endTime).toLocaleTimeString()}</p>
//               </div>
//           ))}
//       </CardContent>
//   </Card>
// ))}
