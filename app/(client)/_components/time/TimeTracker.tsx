'use client'
import { DateSelect } from "@/app/components/common/DateSelect";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from "@/app/components/ui/use-toast"
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { ProfileFormProps } from '@/lib/interfaces';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Calendar } from "@/app/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/ui/select"

const FormSchema = z.object({
//   hours: z.string().optional(),
  date: z.string().optional(),
  hours: z.number().optional(),
  start: z.string().min(1, 'Start time is required'),
  end: z.string().min(1, 'End time is required'),
  project: z.string().optional(),
  activity: z.string().optional(),
  notes: z.string().optional(),
});

const TimeTracker = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        //   hours: '',
          start: '',
          end: '',
          date: '',
          project: '',
          activity: '',
          notes: '',
        },
      });
    
      const { toast } = useToast();
      const [date, setDate] = useState<Date>();
      const [project, setProject] = useState<String>();
      const [activity, setActivity] = useState<String>();
      const hours = ''
      // start + end
      const [currentWeek, setCurrentWeek] = useState(0);
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
     
      useEffect(() => {
        const now = new Date();
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
     
        setCurrentWeek(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));
     
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
     
        setStartDate(startOfWeek.toISOString().split('T')[0]);
        setEndDate(endOfWeek.toISOString().split('T')[0]);
      }, []);

      const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              hours: hours,
              date: date,
              project: project,
              activity: activity,
              notes: data.notes,
              email: data.email,
              status: 'DRAFT'
            })
          })
    
          console.log('Form submission response:', response);
          // FTN-2 / FTM-20 7. 
          if (response.ok) {
            toast({
              description: "The user information saved successfully.",
            })
            // const res = await response.json();
            // const responseData = res.updatedInfo;
            
          } else {
            toast({
              variant: "destructive",
              title: "Time report failed to save.",
              description: "Please try again.",
            })
            console.error("Save failed");
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Time report failed to save.",
            description: "Please try again.",
          })
          console.error("Save failed:", error);
        }
      };
    
  return (
    <main>
        <Card className="px-2">
            <CardHeader>
                <CardTitle>Week: {currentWeek}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{startDate} - {endDate}</p>
            </CardContent>
        </Card>
        <Card className="p-2 flex md:flex-row mt-2">
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full px-2'>
                    <div className="flex flex-row justify-between">
                        <FormField
                            control={form.control}
                            name='start'
                            render={({ field }) => (
                            <FormItem className="flex flex-col items-left mt-4 flex-1">
                                <Label className="mx-4" htmlFor="start">Starting time</Label>
                                <FormControl className="">
                                <Input type="text" id="start" placeholder='08:00' 
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='end'
                            render={({ field }) => (
                            <FormItem className="flex flex-col items-left mt-4 flex-1">
                            <Label htmlFor="end" className="mx-4 ">Ending time</Label>
                                <FormControl className="">
                                <Input type="text" id="end" placeholder='17:00' 
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name='project'
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-left mt-4 flex-2">
                                <Label className="w-1/2 ml-4">Project</Label>
                                <Select 
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setProject(value);
                                }}
                                defaultValue={field.value}>
                                <FormControl className='w-full'>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select project" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="projectA">Project A</SelectItem>
                                    <SelectItem value="projectB">Project B</SelectItem>
                                    <SelectItem value="projectC">Project C</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name='activity'
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-left mt-4 flex-2">
                                <Label className="mx-4">Activity</Label>
                                <Select 
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setActivity(value);
                                }}
                                defaultValue={field.value}>
                                <FormControl className='w-full'>
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select activity" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="activityA">Activity A</SelectItem>
                                    <SelectItem value="activityB">Activity B</SelectItem>
                                    <SelectItem value="activityC">Activity C</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                    <FormField
                    control={form.control}
                    name='notes'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-left mt-4 flex-3">
                        <Label htmlFor="notes" className="w-1/2 mx-4">Notes</Label>
                            <FormControl className="">
                            <Input type="notes" id="notes" placeholder='Enter your notes' {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="flex flex-col-reverse md:flex-row justify-between">
                    {/* <Button variant='flairnowOutline' className='my-4 text-md' onClick={() => setIsEditMode(false)}>Cancel</Button> */}
                    <Button className='my-4 text-md' type='submit'>
                    Submit
                    </Button>
                </div>
                </form>
            </Form> 
        </Card>
        
    </main>
  )
}

export default TimeTracker;

        {/* <DateSelect /> */}
        {/* <Calendar
            showWeekNumber
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
        /> */}