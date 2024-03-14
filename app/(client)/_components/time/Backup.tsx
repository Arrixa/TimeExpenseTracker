// // components/WeeklySchedule.tsx
// 'use client'
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { useEffect, useRef, useState } from 'react';
// import { MdDelete } from "react-icons/md";
// import { IoAddCircle } from "react-icons/io5";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";
 
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
 
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
 
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
 
// import { GoAlertFill } from "react-icons/go";
 
// import { Textarea } from '@/components/ui/textarea';
 
 
// type HourEntry = {
//     startTime: string;
//     endTime: string;
//     notes: string;
//     type: string;
// };
 
// type DaySchedule = {
//     day: string;
//     date: string;
//     hours: HourEntry[];
// };
 
// const initialSchedule: DaySchedule[] = [];
 
 
// const WeeklySchedule = () => {
//     const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
 
//     const [currentWeek, setCurrentWeek] = useState<number>(0);
//     const [startDate, setStartDate] = useState<string>('');
//     const [endDate, setEndDate] = useState<string>('');
 
//     const totalHoursDisplayRef = useRef<HTMLElement>(null);
 
//     const generateSchedule = (startDate: Date, endDate: Date) => {
//         const newSchedule: DaySchedule[] = [];
//         const currentDate = new Date(startDate);
//         while (currentDate <= endDate) {
//             const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
//             const isWeekend = day === 'Sat' || day === 'Sun';
 
//             newSchedule.push({
//                 day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
//                 date: currentDate.toLocaleDateString('en-US', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric',
//                 }),
//                 hours: isWeekend ? [] : [{ startTime: '00:00', endTime: '00:00', notes: '', type: 'Regular hours' }],
//             });
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
//         setSchedule(newSchedule);
//     };
 
//     // useEffect(() => {
//     //     const now = new Date();
//     //     const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
//     //     const dayInMilliseconds = 1000 * 60 * 60 * 24;
//     //     const pastDaysOfYear = Math.floor((now.getTime() - firstDayOfYear.getTime()) / dayInMilliseconds);
 
//     //     setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));
 
//     //     const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
//     //     const endOfWeek = new Date(startOfWeek);
//     //     endOfWeek.setDate(endOfWeek.getDate() + 6);
 
//     //     // Format dates to DD-MMM-YYYY
//     //     const formattedStartDate = startOfWeek.toLocaleDateString('en-US', {
//     //         day: '2-digit',
//     //         month: 'short',
//     //         year: 'numeric',
//     //     });
//     //     const formattedEndDate = endOfWeek.toLocaleDateString('en-US', {
//     //         day: '2-digit',
//     //         month: 'short',
//     //         year: 'numeric',
//     //     });
 
//     //     setStartDate(formattedStartDate);
//     //     setEndDate(formattedEndDate);
 
//     //     // Generate initial schedule based on Start Date and End Date
//     //     const initialSchedule: DaySchedule[] = [];
//     //     const currentDate = new Date(startOfWeek);
//     //     while (currentDate <= endOfWeek) {
 
//     //         const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
//     //         const isWeekend = day === 'Sat' || day === 'Sun';
 
//     //         initialSchedule.push({
//     //             day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
//     //             date: currentDate.toLocaleDateString('en-US', {
//     //                 day: '2-digit',
//     //                 month: 'short',
//     //                 year: 'numeric',
//     //             }),
//     //             hours: isWeekend ? [] : [{ startTime: '00:00', endTime: '00:00', notes: '', type: 'Regular hours' }], // Default empty entry
//     //         });
//     //         currentDate.setDate(currentDate.getDate() + 1);
//     //     }
//     //     setSchedule(initialSchedule);
 
//     // }, []);
 
//     useEffect(() => {
//         const now = new Date();
//         const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
//         const dayInMilliseconds = 1000 * 60 * 60 * 24;
//         const pastDaysOfYear = Math.floor((now.getTime() - firstDayOfYear.getTime()) / dayInMilliseconds);
 
//         setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));
 
//         const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(endOfWeek.getDate() + 6);
 
//         setStartDate(startOfWeek.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
//         setEndDate(endOfWeek.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
 
//         generateSchedule(startOfWeek, endOfWeek); // Generate initial schedule
//     }, []);
 
 
//     const calculateTotalHours = (dayIndex: number): number => {
//         const dayEntries = schedule[dayIndex].hours;
//         let totalHours = 0;
//         for (const entry of dayEntries) {
//             if (entry.startTime && entry.endTime) {
//                 // Implement logic to calculate total hours from start and end times (assuming time format is HH:MM)
//                 const startHours = parseInt(entry.startTime.split(':')[0]);
//                 const startMinutes = parseInt(entry.startTime.split(':')[1]);
//                 const endHours = parseInt(entry.endTime.split(':')[0]);
//                 const endMinutes = parseInt(entry.endTime.split(':')[1]);
 
//                 const totalMinutes = (endHours - startHours) * 60 + (endMinutes - startMinutes);
//                 totalHours += totalMinutes / 60;
//             }
//         }
//         // Round total hours to two decimal places using toFixed()
//         totalHours = parseFloat(totalHours.toFixed(2));
 
//         return totalHours;
//     };
 
//     const addHours = (dayIndex: number) => {
//         const newSchedule = [...schedule];
//         newSchedule[dayIndex].hours.push({ startTime: '', endTime: '', notes: '', type: 'Regular hours' });
//         setSchedule(newSchedule);
//     };
 
//     const handleTimeChange = (dayIndex: number, entryIndex: number, field: 'startTime' | 'endTime', value: string) => {
//         const newSchedule = [...schedule];
 
//         newSchedule[dayIndex].hours[entryIndex][field] = value;
//         setSchedule(newSchedule);
 
//         // Recalculate total hours after time change
//         const totalHours = calculateTotalHours(dayIndex);
//         if (totalHoursDisplayRef.current) {
//             totalHoursDisplayRef.current.textContent = `${totalHours}h`;
//         }
//     };
 
//     const removeHourEntry = (dayIndex: number, entryIndex: number) => {
//         const newSchedule = [...schedule];
//         newSchedule[dayIndex].hours.splice(entryIndex, 1);
//         setSchedule(newSchedule);
 
//         // Recalculate total hours after removing entry
//         const totalHours = calculateTotalHours(dayIndex);
//         if (totalHoursDisplayRef.current) {
//             totalHoursDisplayRef.current.textContent = `${totalHours}h`;
//         }
//     };
 
//     const handlePreviousWeek = () => {
//         setCurrentWeek(currentWeek - 1);
 
//         const prevWeekStart = new Date(startDate);
//         prevWeekStart.setDate(prevWeekStart.getDate() - 7);
 
//         const prevWeekEnd = new Date(prevWeekStart);
//         prevWeekEnd.setDate(prevWeekEnd.getDate() + 6);
 
//         setStartDate(prevWeekStart.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
//         setEndDate(prevWeekEnd.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
 
//         generateSchedule(prevWeekStart, prevWeekEnd); // Generate schedule for previous week
//     };
 
//     const handleNextWeek = () => {
//         setCurrentWeek(currentWeek + 1);
//         // Update start and end dates based on new week
//         const nextWeekStart = new Date(startDate);
//         nextWeekStart.setDate(nextWeekStart.getDate() + 7);
 
//         const nextWeekEnd = new Date(nextWeekStart);
//         nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
 
//         setStartDate(nextWeekStart.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
//         setEndDate(nextWeekEnd.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
 
//         generateSchedule(nextWeekStart, nextWeekEnd); // Generate schedule for previous week
//     }
 
//     const handleCurrentWeek = () => {
//         const now = new Date();
//         const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(endOfWeek.getDate() + 6);
 
//         setStartDate(startOfWeek.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
//         setEndDate(endOfWeek.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//         }));
 
//         setCurrentWeek(Math.ceil((now.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24 * 7))); // Calculate current week number
//         generateSchedule(startOfWeek, endOfWeek); // Generate schedule for current week
//     };
 
//     function calculateTotalHoursForWeek(): number {
//         let totalHours = 0;
//         schedule.forEach((daySchedule) => {
//             totalHours += calculateTotalHours(schedule.indexOf(daySchedule));
//         });
//         return totalHours;
//     }
 
 
//     return (
//         <div className='flex'>
//             <div className="rounded-lg p-6">
//                 <div className="sticky top-0 flex justify-center items-center mb-4 p-2 space-x-2 border-b border-gray-500 bg-white/90 dark:bg-black/80">
//                     <Button onClick={handlePreviousWeek} variant="ghost">
//                         <IoChevronBack />
//                     </Button>
//                     <h2 className="text-lg font-semibold">{startDate + " - " + endDate}</h2>
//                     <Button onClick={handleNextWeek} variant="ghost">
//                         <IoChevronForward />
//                     </Button>
//                     <Button onClick={handleCurrentWeek} variant="outline" className=''>
//                         Today
//                     </Button>
//                 </div>
//                 {schedule.map((daySchedule, dayIndex) => (
//                     <Card key={dayIndex} className="mb-4">
//                         <CardHeader>
//                             <CardTitle>
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="text-md  font-medium">{daySchedule.day}, {daySchedule.date}</h3>
//                                     <span ref={totalHoursDisplayRef} className="text-sm ">{calculateTotalHours(dayIndex)}&nbsp;h</span>
//                                 </div>
//                             </CardTitle>
//                             <CardDescription>Enter the detailed time report.</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             {daySchedule.hours.map((entry, entryIndex) => (
//                                 <div key={entryIndex} className="mt-2 flex space-x-2">
//                                     <div className="flex-1">
//                                         <Input
//                                             type='time'
//                                             value={schedule[dayIndex].hours[entryIndex].startTime}
//                                             placeholder='08:00'
//                                             onChange={(e) => handleTimeChange(dayIndex, entryIndex, 'startTime', e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="flex-1">
//                                         <Input
//                                             type='time'
//                                             value={schedule[dayIndex].hours[entryIndex].endTime}
//                                             placeholder='17:00'
//                                             onChange={(e) => handleTimeChange(dayIndex, entryIndex, 'endTime', e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="flex-1">
//                                         <Select>
//                                             <SelectTrigger className="w-[180px]">
//                                                 <SelectValue placeholder="Select Project" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectGroup>
//                                                     <SelectItem value="regularhours">Regular hours</SelectItem>
//                                                     <SelectItem value="other">Other</SelectItem>
//                                                 </SelectGroup>
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                     <div className="flex-1">
//                                         <Input className='md:w-96'
//                                             placeholder="Notes"
//                                         />
//                                     </div>
//                                     <Button className='' variant={'outline'}
//                                         onClick={() => removeHourEntry(dayIndex, entryIndex)}>
//                                         <MdDelete size={20} color='red' />
//                                     </Button>
//                                 </div>
//                             ))}
//                             <Button
//                                 variant={'outline'}
//                                 className="mt-2"
//                                 onClick={() => addHours(dayIndex)}
//                             >
//                                 <IoAddCircle />Add hours
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//             <Card className="sticky top-0 mt-20 w-72 h-72">
//                 <CardHeader>
//                     <CardTitle>
//                     <h2 className="text-3xl font-semibold text-center">{calculateTotalHoursForWeek()}&nbsp;h</h2>
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className='flex flex-col justify-between space-y-4'>
//                     <p className="text-sm text-center">Worked this week</p>
//                     <Button
 
//                     // onClick={handleSubmitTimesheet}
//                     >
//                         Submit time
//                     </Button>
//                     <p className='text-xs'>Timesheets are sent for your manager approval.</p>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };
 
// export default WeeklySchedule;

// 'use client'
// import { Input } from '@/app/components/ui/input';
// import React, { useEffect, useState } from 'react';
 
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
 
 
// const WeeklySchedule = () => {
//     const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);
 
//     const addHours = (dayIndex: number) => {
//         const newSchedule = [...schedule];
//         newSchedule[dayIndex].hours.push({ startTime: '09:00', endTime: '17:00', notes: '', project: "Select project", activity: 'Select activity' });
//         setSchedule(newSchedule);
//     };

//     const handleTimeChange = (dayIndex: number, entryIndex: number, field: 'startTime' | 'endTime', value: string) => {
//         const newSchedule = [...schedule];
//         const entry = newSchedule[dayIndex].hours[entryIndex];

//         if (field === 'startTime') {
//             const startTime = new Date(`2000-01-01 ${value}`);
//             const endTime = new Date(`2000-01-01 ${entry.endTime}`);

//             // Calculate the difference in milliseconds
//             const diffMs = endTime.getTime() - startTime.getTime();
//             // If the difference is negative, set endTime to be the next day
//             if (diffMs < 0) {
//                 endTime.setDate(endTime.getDate() + 1);
//             }
//             // Update endTime in the entry
//             entry.endTime = `${endTime.getHours() < 10 ? '0' : ''}${endTime.getHours()}:${endTime.getMinutes() < 10 ? '0' : ''}${endTime.getMinutes()}`;
//         } else if (field === 'endTime') {
//             const endTime = new Date(`2000-01-01 ${value}`);
//             const startTime = new Date(`2000-01-01 ${entry.startTime}`);

//             // Calculate the difference in milliseconds
//             const diffMs = endTime.getTime() - startTime.getTime();
//             // If the difference is negative, set endTime to be the next day
//             if (diffMs < 0) {
//                 endTime.setDate(endTime.getDate() + 1);
//             }
//             // Update endTime in the entry
//             entry.endTime = `${endTime.getHours() < 10 ? '0' : ''}${endTime.getHours()}:${endTime.getMinutes() < 10 ? '0' : ''}${endTime.getMinutes()}`;
//         }

//         setSchedule(newSchedule);
//     };

//     const calculateTotalHours = (hours: HourEntry[]) => {
//         let totalHours = 0;
//         hours.forEach(entry => {
//             const startTime = new Date(`2000-01-01 ${entry.startTime}`);
//             const endTime = new Date(`2000-01-01 ${entry.endTime}`);

//             // Calculate the difference in milliseconds
//             let diffMs = endTime.getTime() - startTime.getTime();
//             // If the difference is negative, add a day to the difference
//             if (diffMs < 0) {
//                 diffMs += 24 * 60 * 60 * 1000; // Add 1 day in milliseconds
//             }
//             // Convert milliseconds to hours and add to totalHours
//             totalHours += diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
//         });
//         return totalHours;
//     };
 
//     return (
//         <div className=" shadow rounded-lg p-6">
//             <div className="mb-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold">March 11 - 17, 2024</h2>
//             </div>
//             {schedule.map((daySchedule, dayIndex) => (
//                 <div key={dayIndex} className="mb-4">
//                     <div className="flex items-center justify-between">
//                         <h3 className="text-md  font-medium">{daySchedule.day}, {daySchedule.date}</h3>
//                         <span className="text-sm ">{calculateTotalHours(daySchedule.hours)}h</span>
//                     </div>
//                     {daySchedule.hours.map((entry, entryIndex) => (
//                         <div key={entryIndex} className="mt-2 flex">
//                             <div className="flex-1 mr-2">
//                                 <Input
//                                     type="text"
//                                     className="w-full p-2 border rounded-md"
//                                     defaultValue="09:00"
//                                     value={entry.startTime}
//                                     onChange={(e) => handleTimeChange(dayIndex, entryIndex, 'startTime', e.target.value)}
//                                />
//                             </div>
//                             <div className="flex-1 mx-2">
//                                 <Input
//                                     type="text"
//                                     className="w-full p-2 border  rounded-md"
//                                     defaultValue="17:00"
//                                     value={entry.endTime}
//                                     onChange={(e) => handleTimeChange(dayIndex, entryIndex, 'endTime', e.target.value)}
//                                 />
//                             </div>
//                             <div className="flex-1 mx-2">
//                                 <select className="w-full p-2 border  rounded-md ">
//                                     <option>Regular hours</option>
//                                     <option>Other</option>
//                                 </select>
//                             </div>
//                             <div className="flex-1 ml-2">
//                                 <Input
//                                     type="text"
//                                     className="w-full p-2 border  rounded-md"
//                                     placeholder="Notes"
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <button
//                         className="mt-2 text-blue-500 hover:text-blue-700"
//                         onClick={() => addHours(dayIndex)}
//                     >
//                         Add hours
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };
 
// export default WeeklySchedule;