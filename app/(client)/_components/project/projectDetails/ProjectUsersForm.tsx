'use client'
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from '@/app/components/ui/label';
import { DateSelect } from '@/app/components/common/DateSelect';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/app/components/ui/drawer';

// Define the schema for activities as part of the form
const FormSchema = z.object({
  userEmail: z.string().min(1, 'User email is required'),
  rate: z.string().optional(),
  rateBy: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  approver: z.boolean().optional(),
  reviewer: z.boolean().optional(),
});

const ProjectUsersForm = (id, onUserAdded) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: '', 
      rate: '0.00',
      rateBy: '',
      startDate: '',
      endDate: '',
      approver: false,
      reviewer: false,
    },
  });
  
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('form submit clicked', data, 'start and end date', startDate, endDate, id)
    try {
      const response = await fetch('/api/project/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: id.id.id,
          userEmail: data.userEmail,
          rate: data.rate,
          rateBy: data.rateBy,
          startDate: startDate,
          endDate: endDate,
          approver: data.approver,
          reviewer: data.reviewer,
          
        })
      })
        if (response.ok) {
          console.log(response)
          onUserAdded()
          toast({
            description: "The project users saved successfully.",
          })
          const res = await response.json();
          const data = res.ProjectUsers
          console.log(res);
          // router.push(`/project/${id}`)
        } else {
          toast({
            variant: "destructive",
            title: "The project users save failed.",
            description: "Please try again.",
          })
          console.error("Save failed");
        }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Project user save failed.",
        description: "Please try again.",
      });
    }
  };

  return (
    <DrawerContent>
      <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
        <CardHeader><CardTitle>Add project users</CardTitle></CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row mb-4 justify-between">
              <FormField
                control={form.control}
                name='userEmail'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 md:mr-2 w-full md:w-1/2">
                    <Label className="my-2 mx-4" htmlFor="email">User email</Label>
                    <FormControl className="">
                      <Input type="text" id="email" placeholder='Enter user email' 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='approver'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 w-1/4 md:w-1/4 md:mr-2">
                    <Label className="mx-4 my-2 " htmlFor="approver">Approver</Label>
                    <FormControl className="">
                      <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='mx-4'
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='reviewer'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 w-1/4 md:w-1/4">
                    <Label className="mx-4 my-2 " htmlFor="reviewer">Reviewer</Label>
                    <FormControl className="">
                      <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='mx-4'
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="flex flex-col md:flex-row mb-4 justify-between">
              <FormField
                control={form.control}
                name='rate'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 md:mr-2 w-full md:w-1/2">
                    <Label className="my-2 mx-4" htmlFor="rate">User rate</Label>
                    <FormControl className="">
                      <Input type="number" id="rate" placeholder='Enter user rate' 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rateBy'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 w-full md:w-1/2">
                    <Label className="my-2 mx-4" htmlFor="rate">Rate by</Label>
                    <FormControl className="">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full border-border mr-2">
                            <SelectValue placeholder="Select rate by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                              <SelectItem value="HOUR">Hourly</SelectItem>
                              <SelectItem value="DAY">Daily</SelectItem>
                              <SelectItem value="WEEK">Weekly</SelectItem>
                              <SelectItem value="MONTH">Monthly</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row mb-4 justify-between">
            <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className="flex flex-col items-left mt-4 w-full md:w-1/2 md:mr-2">
                <Label className="mx-4">Select start date</Label>
                <FormControl>
                <DateSelect
                  label="Pick a start date"
                  selectedDate={startDate}
                  onSelectDate={(date) => setStartDate(date)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 w-full md:w-1/2">
                    <Label className="mx-4">Select end date</Label>
                    <FormControl>
                    <DateSelect
                      label="Pick an end date"
                      selectedDate={endDate}
                      onSelectDate={(date) => setEndDate(date)} 
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />   
            </div>
            <DrawerFooter className='flex flex-col md:flex-row justify-between px-2'>
              <DrawerClose asChild>
                <Button variant="flairnowOutline">Cancel</Button>
              </DrawerClose>
              <Button variant='flairnow' type='submit'>Save</Button>
            </DrawerFooter>
          </form>
        </Form>
      </Card>
    </DrawerContent>
  );
};

export default ProjectUsersForm

{/* <div className='flex justify-between'>
<Button variant='flairnowOutline' className='mr-2' type="button" onClick={() => append({ name: '', chargeable: false })}>Add</Button> 
<Button variant='flairnow' type='submit'>Save project users</Button>
</div> */}