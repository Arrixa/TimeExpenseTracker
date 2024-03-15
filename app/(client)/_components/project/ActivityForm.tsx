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
import { Label } from '@/app/components/ui/label';

// Define the schema for activities as part of the form
const FormSchema = z.object({
  activities: z.array(z.object({
    name: z.string().min(1, 'Activity name is required'),
    chargeable: z.boolean(),
  })),
});

const ActivityForm = ({ projectId }) => {
  const { control, handleSubmit, register } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      activities: [{ name: '', chargeable: false }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });
  const { toast } = useToast();

  // const saveActivity = async (activity) => {
  //   console.log('Saving activity:', activity, projectId);
  //   // Implement API call to save the activity here
  // };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log('Form submitted:', data);
    try {
      const response = await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: projectId,
          activity: data.activities
          
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
    <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
      <CardHeader><CardTitle>Add project activities</CardTitle></CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col md:flex-row mb-4 justify-between">
            <div className="flex flex-col items-left pr-2 flex-1">
              <Label className="my-2 mx-4" htmlFor="name">Activity name</Label>
              <Input {...register(`activities.${index}.name`)} placeholder="Enter the activity name" className='mr-2'/>
            </div>
            <div className="flex flex-col items-left pr-2">
              <Label className="my-2" htmlFor="name">Chargeable</Label>
              <Switch {...register(`activities.${index}.chargeable`)} className='mr-2'/>
            </div>
            <Button variant='flairnowOutline' className='mt-7' type="button" onClick={() => remove(index)}>Remove</Button>
          </div>
        ))}
        <div className='flex justify-between'>
          <Button variant='flairnowOutline' className='mr-2' type="button" onClick={() => append({ name: '', chargeable: false })}>Add</Button>
          <Button variant='flairnow' type='submit'>Save Activities</Button>
        </div>
      </form>
    </Card>
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