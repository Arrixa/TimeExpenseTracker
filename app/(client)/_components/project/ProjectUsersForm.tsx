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
  projectUsers: z.array(z.object({
    userEmail: z.string().min(1, 'User email is required'),
    rate: z.string().optional(),
    rateBy: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    approver: z.boolean().optional(),
    reviewer: z.boolean().optional(),
  })),
});

const ProjectUsersForm = (projectId: string | string[]) => {
  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectUsers: [{ 
        userEmail: '', 
        rate: '0.00',
        rateBy: '',
        startDate: '',
        endDate: '',
        approver: false,
        reviewer: false,
      }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projectUsers',
  });
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('form submit clicked', data)
    try {
      const response = await fetch('/api/project/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: projectId as string,
          projectUsers: data.projectUsers
          
        })
      })
        if (response.ok) {
          console.log(response)
          toast({
            description: "The project saved successfully.",
          })
          const res = await response.json();
          const data = res.ProjectUsers
          console.log(res);
          // router.push(`/project/${id}`)
        } else {
          toast({
            variant: "destructive",
            title: "The activity save failed.",
            description: "Please try again.",
          })
          console.error("Save failed");
        }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Activity creation failed.",
        description: "Please try again.",
      });
    }
  };

  return (
    <DrawerContent>
      <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
        <CardHeader><CardTitle>Add project users</CardTitle></CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row mb-4 justify-between">
              <div className="flex flex-col items-left pr-2 flex-1">
                <Label className="my-2 mx-4" htmlFor="email">User name</Label>
                <Input {...register(`projectUsers.${index}.userEmail`)} placeholder="Enter user email" />
              </div>
              <div className="flex flex-col items-left pr-2 flex-1">
                <Label className="my-2 mx-4" htmlFor="rate">Rate</Label>
                <Input {...register(`projectUsers.${index}.rate`)} type="number" placeholder="Rate" />
              </div>
              <div className="flex flex-col items-left pr-2 flex-1">
                <Label className="my-2 mx-4" htmlFor="rateBy">Rate by</Label>
                <Select
                onChange={(value) => field.onChange({ target: { value } })}
                value={field.value}>
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
              </div>
              
              <div className="flex flex-col items-left pr-2">
                <Label className="my-2" htmlFor="startDate">Start date</Label>
                <Input type="date" className="w-full" placeholder="" {...register(`projectUsers.${index}.startDate`)} autoFocus />
              </div>
              <div className="flex flex-col items-left pr-2">
                <Label className="my-2" htmlFor="endDate">End date</Label>
                <Input type="date" className="w-full" placeholder="" {...register(`projectUsers.${index}.endDate`)} autoFocus />
              </div>
              <div className="flex flex-col items-left pr-2">
                <Label className="my-2" htmlFor="approver">Approver</Label>
                <Switch {...register(`projectUsers.${index}.approver`)} className='mr-2'/>
              </div>
              <div className="flex flex-col items-left pr-2">
                <Label className="my-2" htmlFor="reviewer">Reviewer</Label>
                <Switch {...register(`projectUsers.${index}.reviewer`)} className='mr-2'/>
              </div>
              <Button variant='flairnowOutline' className='mt-7' type="button" onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}

          <DrawerFooter className='flex flex-col md:flex-row justify-between px-2'>
            <DrawerClose asChild>
              <Button variant="flairnowOutline">Cancel</Button>
            </DrawerClose>
            <Button variant='flairnow' type='submit'>Save</Button>
          </DrawerFooter>
        </form>
      </Card>
    </DrawerContent>
  );
};

export default ProjectUsersForm

{/* <div className='flex justify-between'>
<Button variant='flairnowOutline' className='mr-2' type="button" onClick={() => append({ name: '', chargeable: false })}>Add</Button> 
<Button variant='flairnow' type='submit'>Save project users</Button>
</div> */}