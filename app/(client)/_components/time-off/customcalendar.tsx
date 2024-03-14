'use client'
import { Button } from '@/app/components/ui/button';
import React, { useState } from 'react';
import {
    IoChevronBack,
    IoChevronForward,
    IoAddCircleOutline,
    IoCalendarClearOutline
} from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"
import { LeaveRequestForm } from './LeaveRequestForm';
import { LeaveTypeForm } from './LeaveTypeForm';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CustomCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [leaveReqDate, setleaveReqDate] = useState(new Date());
    const [showLeaveReqForm, setshowLeaveReqForm] = useState<boolean>(false);

    // A function to get the first day of the month
    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    // A function to get the total number of days in a month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const totalDaysInMonth = getDaysInMonth(year, month);

    // Calculate the number of days from the previous month to display
    const previousMonthDisplay = firstDayOfMonth;
    const nextMonthDisplay = (7 - ((totalDaysInMonth + firstDayOfMonth) % 7)) % 7;

    // Array of all days to display in the calendar
    const calendarDays = [
        ...Array.from({ length: previousMonthDisplay }, (_, i) => {
            // Previous month days
            const day = new Date(year, month, -i).getDate();
            return { day, currentMonth: false, isToday: false };
        }).reverse(),
        ...Array.from({ length: totalDaysInMonth }, (_, i) => {
            // Current month days
            const day = i + 1;
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === new Date().toDateString(); // Check if it's today
            return { day, currentMonth: true, isToday };
        }),
        ...Array.from({ length: nextMonthDisplay }, (_, i) => {
            // Next month days
            return { day: i + 1, currentMonth: false, isToday: false };
        }),
    ];

    // Get the week number for a date
    const getWeekNumber = (date: Date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // Calculate the first week number of the month
    let firstWeekNumber = getWeekNumber(new Date(year, month, 1));

    return (
        <div>
            <div className='flex justify-between'>
                <div className="flex items-center mb-4 space-x-2">
                    <Button className='rounded-full'
                        onClick={() => setCurrentDate(new Date())}
                    >
                        Today
                    </Button>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                    >
                        <IoChevronBack />
                    </Button>
                    <span>{currentDate.toLocaleString('default', { month: 'long' })} {year}</span>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                    >
                        <IoChevronForward />
                    </Button>
                </div>
                <Sheet>
                    <SheetTrigger className='flex space-x-2 items-center bg-primary text-white px-4 rounded-lg mb-2'>
                        <IoCalendarClearOutline />
                        <span className='text-sm'>Request Time Off</span>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Request Time Off</SheetTitle>
                            <SheetDescription>
                                <LeaveRequestForm leaveDate={leaveReqDate.toISOString().split('T')[0]} />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                {/* 
                <Sheet>
                    <SheetTrigger className='flex space-x-2 items-center bg-primary text-white px-4 rounded-lg mb-2'>
                        <FaRegNoteSticky />
                        <span className='text-sm'>Add Leave Type</span>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add Leave Type</SheetTitle>
                            <SheetDescription>
                                <LeaveTypeForm />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            */}
            </div>

            <div className="grid grid-cols-8 text-center border-collapse">
                <div className="border p-2">Week</div>
                {daysOfWeek.map((day) => (
                    <div key={day} className="border p-2">
                        {day}
                    </div>
                ))}
                {calendarDays.map((calendarDay, i) => {
                    // Increment week number if it's a new week
                    if (i % 7 === 0 && i !== 0) {
                        firstWeekNumber++;
                    }

                    return (
                        <React.Fragment key={i}>
                            {i % 7 === 0 && (
                                <div className="border bg-gray-200 dark:bg-gray-700 flex justify-center items-center">
                                    {firstWeekNumber}
                                </div>
                            )}
                            <div
                                className={`flex flex-col justify-between items-end border w-full h-24  ${calendarDay.currentMonth ? 'bg-white dark:bg-neutral-900'
                                    : 'bg-gray-200 dark:bg-gray-800'
                                    } 
                                    `}
                            >
                                <Button variant={`${calendarDay.isToday ? 'flairnow' : 'ghost'}`} size={'icon'} disabled={calendarDay.currentMonth ? false : true}>
                                    {calendarDay.day}
                                </Button>
                            </div>
                        </React.Fragment>

                    );
                })}
            </div>
        </div>
    );
};

export default CustomCalendar;
