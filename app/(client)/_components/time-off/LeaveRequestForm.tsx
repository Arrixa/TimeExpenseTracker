// components/LeaveRequestForm.tsx
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useToast } from "@/app/components/ui/use-toast"
import { z } from "zod";
import { getAllLeaveTypes, addLeaveRequest } from './actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Card, CardContent, CardFooter } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { FaCircleNotch } from 'react-icons/fa6'
import { FaSave } from 'react-icons/fa'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'

interface LeaveRequestFormProps {
    leaveDate: string; // The type here is string because dates will be passed in the form of 'YYYY-MM-DD'
}

// Define an interface for your leave types
interface LeaveType {
    id: string;
    name: string;
}

const FormSchema = z.object({
    date: z.string(),
    leaveType: z.string(),
    notes: z.string(),
})

export function LeaveRequestForm({ leaveDate }: LeaveRequestFormProps) {
    const { toast } = useToast();
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: leaveDate,
            leaveType: "",
            notes: "",
        },
    });


    //fetch all leave types from database
    useEffect(() => {
        const fetchLeaveTypes = async () => {
            const types: LeaveType[] = await getAllLeaveTypes(); // Ensure this matches the expected return type
            setLeaveTypes(types);
        };

        fetchLeaveTypes();
    }, []);

    // Handle form submission
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setIsLoading(true) // Enable loading indicator
        try {
            // Assuming `login` is an async action that returns a promise
            const result = await addLeaveRequest(data);

            if (result?.error) {
                toast({
                    description: 'Leave Request Submission failed: ' + result?.error,
                    variant: "destructive",
                  })
                console.log(result?.error);
            } else {
                // Handle success, maybe set a success toast here
                toast({
                    description: 'Leave Request Submitted Successful',
                    variant: "default",
                  })
            }

        } catch (error) {
            // Handle error, maybe set an error toast here
            toast({
                description: 'Leave Request Submission failed: ' + error,
                variant: "default",
              })
            console.log("Catch Error:" + error);
        } finally {
            setIsLoading(false) // Disable loading indicator regardless of outcome
        }
    }

    return (
        < Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Card className="flex-1 py-4" >
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Leave Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" className="w-full" placeholder="" {...field} autoFocus />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="leaveType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Leave Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-[280px]">
                                                <SelectValue placeholder="Select Leave Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {leaveTypes.map((type) => (
                                                        <SelectItem value={type.id} key={type.id}>{type.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>

                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Input className="w-full" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ?
                                <FaCircleNotch className=' animate-spin' /> :
                                <span className='flex flex-row items-center'><FaSave size={20} />&nbsp; Save</span>
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form >
    );
}
