// components/LeaveRequestForm.tsx
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod";
import { addLeaveType } from './actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Card, CardContent, CardFooter } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { FaCircleNotch } from 'react-icons/fa6'
import { FaSave } from 'react-icons/fa'

interface LeaveTypeFormProps {
    // leaveDate: string; // The type here is string because dates will be passed in the form of 'YYYY-MM-DD'
}

const FormSchema = z.object({
    name: z.string()
})

export function LeaveTypeForm() {

    const { register, handleSubmit, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    // const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: ""
        },
    });

    // Handle form submission
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setIsLoading(true) // Enable loading indicator
        try {
            // Assuming `login` is an async action that returns a promise
            const result = await addLeaveType(data);

            if (result?.error) {
                toast.error('Leave Type Submission failed: ' + result?.error);
                console.log(result?.error);
            } else {
                // Handle success, maybe set a success toast here
                toast.success('Leave Type Submitted Successful');
            }

        } catch (error) {
            // Handle error, maybe set an error toast here
            toast.error('Leave Type Submission failed: ' + error)
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Leave Type</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="w-full" placeholder="" {...field} autoFocus />
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
