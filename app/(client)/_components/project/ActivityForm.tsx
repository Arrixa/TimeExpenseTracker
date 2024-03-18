import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { useToast } from "@/app/components/ui/use-toast";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/app/components/ui/drawer';
import { Label } from '@/app/components/ui/label';

// Define the schema for activities as part of the form
const FormSchema = z.object({
  name: z.string().min(1, 'Activity name is required'),
  chargeable: z.boolean(),
});

const ActivityForm = ({ id }: { id: string }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      chargeable: false,
    },
  });
 
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log('Form submitted:', data);
    try {
      const response = await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: id,
          name: data.name,
          chargeable: data.chargeable       
        })
      })
        if (response.ok) {
          console.log(response)
          toast({
            description: "The project saved successfully.",
          })
          const res = await response.json();
          const data = res.ProjectActivity
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
        <CardHeader><CardTitle>Add project activity</CardTitle></CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row mb-4 justify-between">
              <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                    <Label className=" mx-4" htmlFor="name">Activity name</Label>
                    <FormControl className="">
                      <Input type="text" id="name" placeholder='Enter a activity name' 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='chargeable'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                    <Label className=" mx-4" htmlFor="chargeable">Chargeable</Label>
                    <FormControl className="">
                      <Switch id="chargeable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='mx-4' />
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

export default ActivityForm;


/*
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from '@/app/components/ui/label';

interface Activity {
  name: string;
  id: string;
  chargeable: boolean;
}

const activitySchema = z.object({
  name: z.string().min(1, 'Activity name is required'),
  chargeable: z.boolean(),
});

const ActivityForm = () => {
  const form = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activities: [{ name: '', chargeable: false }],
    },
  });

  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(), 
      name: '',
      chargeable: false,
    };
    setActivities([...activities, newActivity]);
  };

  const updateActivity = (id: string, field: keyof Activity, value: any) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, [field]: value } : activity
    );
    setActivities(updatedActivities);
  };

  const removeActivity = (id: string) => {
    const filteredActivities = activities.filter((activity) => activity.id !== id);
    setActivities(filteredActivities);
  };

  const saveActivity = async (activity: Activity) => {
    // Implement API call to save the activity
    console.log('Saving activity:', activity);
    // Replace with actual API call
    // const response = await saveActivityApi(activity);
    // Handle response
  };

  const saveAllActivities = async () => {
    // Implement API call to save all activities
    console.log('Saving all activities:', activities);
    // Loop through activities and save each
    // activities.forEach(activity => saveActivity(activity));
  };
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof activitySchema>) => {
    console.log('Form submitted:', data);

    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      toast({
        description: "Project and activities saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving project.",
        description: "Please try again.",
      });
      console.error("Project save failed: ", error);
    }
  };

  return (
    <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
      <CardHeader><CardTitle>Create a new project</CardTitle></CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => {

          <div className="flex flex-col" key={field.id}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4" htmlFor="name">Activity name</Label>
                  <FormControl className="">
                    <Input type="text" id="name" placeholder='Enter a activity name' 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='chargeable'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4" htmlFor="chargeable">Project code</Label>
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
            <Button type="button" onClick={() => remove(index)}>Remove Activity</Button>

          </div>
          })}


          <Button type='submit'>Save activities</Button>
        </form>
      </Form>

    </Card>
  );
};

export default ActivityForm


import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Switch, Card, CardHeader, CardTitle } from '@/app/components/ui'; // Ensure these are correctly imported
import { useToast } from "@/app/components/ui/use-toast";

// Define the schema for activities as part of the form
const formSchema = z.object({
  activities: z.array(z.object({
    name: z.string().min(1, 'Activity name is required'),
    chargeable: z.boolean(),
  })),
});

const ActivityForm = () => {
  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activities: [{ name: '', chargeable: false }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });
  const { toast } = useToast();

  const saveActivity = async (activity) => {
    console.log('Saving activity:', activity);
    // Implement API call to save the activity here
  };

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    data.activities.forEach(saveActivity);

    // Optionally, handle the response from saveActivity for each activity
    toast({
      description: "Activities saved successfully.",
    });
  };

  return (
    <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
      <CardHeader><CardTitle>Create Activities</CardTitle></CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col mb-4">
            <Input {...register(`activities.${index}.name`)} placeholder="Activity Name" />
            <Switch {...register(`activities.${index}.chargeable`)} />
            <Button type="button" onClick={() => remove(index)}>Remove Activity</Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ name: '', chargeable
*/