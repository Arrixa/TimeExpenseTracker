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
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
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
  email: z.string().min(1, 'Email is required').email('Invalid email'),
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
          email: '',
        },
      });
    
      const { toast } = useToast();
      const [date, setDate] = useState<Date>();
      const [project, setProject] = useState<String>();
      const [activity, setActivity] = useState<String>();
      const hours = ''
      // start + end

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
        {/* <DateSelect /> */}
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
        />
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full px-2'>
            <div className="flex flex-col">
                <div className="">
                <FormField
                    control={form.control}
                    name='start'
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4">
                        <Label className="w-1/2 mx-4" htmlFor="start">Starting time</Label>
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
                    <FormItem className="flex flex-col items-left mt-4">
                    <Label htmlFor="end" className="w-1/2 md:mx-4 ml-1">Ending time</Label>
                        <FormControl className="">
                        <Input type="text" id="end" placeholder='17:00' 
                            {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                </div>
                <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4">
                    <Label htmlFor="email" className="w-1/2 mx-4">Email</Label>
                        <FormControl className="">
                        <Input type="email" id="email" placeholder='Enter your email' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name='project'
                render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4">
                        <Label className="w-1/2 mx-4">Project</Label>
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
                    <FormItem className="flex flex-col items-left mt-4">
                        <Label className="w-1/2 mx-4">Activity</Label>
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
                            <SelectItem value="activityA">activity A</SelectItem>
                            <SelectItem value="activityB">activity B</SelectItem>
                            <SelectItem value="activityC">activity C</SelectItem>
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
                    <FormItem className="flex flex-col items-left mt-4">
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
        <Card>

        </Card>
        
    </main>
  )
}

export default TimeTracker;
