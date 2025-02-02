'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useToast } from "@/app/components/ui/use-toast"
import { useState } from "react";
import { Label } from '@/app/components/ui/label';
import { CurrencySelect } from '@/app/components/common/CurrencySelect';
import { DateSelect } from '@/app/components/common/DateSelect';
import { Switch } from '@/app/components/ui/switch';
import ActivitySelect from './ActivitySelect';

// Define your form schema here
const FormSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  code: z.string().optional(),
  customer: z.string().optional(),
  billingMethod: z.string().optional(),
  currency: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  // users: z.string().optional(),
  activity: z.array(z.string()).optional(),
  billable: z.boolean()
});

const ProjectForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      code: '',
      customer: '',
      billingMethod: '',
      currency: '',
      startDate: '',
      endDate: '',
      // users: [''],
      activity: [''],
      billable: true,
    },
  });

  const { toast } = useToast();
  const [projectUsers, setProjectUsers] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(''); 
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
  // const addProjectUser = () => {
  //   // Logic to add a new user row
  // };

  // const removeProjectUser = (index) => {
  //   // Logic to remove user row by index
  // };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data);
    console.log(selectedActivities, selectedCurrency, startDate, endDate)
    console.log("Save job function called");
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          code: data.code,
          customer: data.customer,
          billingMethod: data.billingMethod,
          currency: selectedCurrency,
          startDate: startDate,
          endDate: endDate,
          // users: [''],
          activity: selectedActivities,
          billable: data.billable,
        })
      })
        if (response.ok) {
          toast({
            description: "The project saved successfully.",
          })
          const res = await response.json();
          // setFormData(res);
          console.log(res, 'response data from form save');
        } else {
          toast({
            variant: "destructive",
            title: "The project save failed.",
            description: "Please try again.",
          })
          console.error("Save failed");
        }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Project creation failed.",
        description: "Please try again.",
      });
    }
  };

  // Render your form fields and buttons
  return (
    <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
      <CardHeader><CardTitle>Create a new project</CardTitle></CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4" htmlFor="name">Project name</Label>
                  <FormControl className="">
                    <Input type="text" id="name" placeholder='Enter a project name' 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="w-1/2 mx-4" htmlFor="code">Project code</Label>
                  <FormControl className="">
                    <Input type="text" id="code" placeholder='Enter a project code' 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Should be a combobox instead if we want a search feature or skillSelector */}
             <FormField
              control={form.control}
              name='customer'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                <Label className="w-1/2 mx-4" htmlFor="customer">Customer name</Label>
                <FormControl className="">
                  <Input type="text" id="customer" placeholder='Enter a customer name' 
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
        <div className='flex flex-col md:flex-row w-full justify-between'>
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
          </div>
            <FormField
              control={form.control}
              name='billingMethod'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className="mx-4" htmlFor="billingMethod">Billing method</Label>
                  <FormControl className="">
                    <Select>
                      <SelectTrigger className="w-full border-border mr-2">
                          <SelectValue placeholder="Select billing method" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                              <SelectItem value="FIXED_COST">Fixed cost for project</SelectItem>
                              <SelectItem value="PROJECT_HOURS">Based on project hours</SelectItem>
                              <SelectItem value="TASK_HOURS">Based on task hours</SelectItem>
                              <SelectItem value="STAFF_HOURS">Based on staff hours</SelectItem>
                          </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div  className='flex flex-col md:flex-row w-full justify-between'>
             <FormField
              control={form.control}
              name='currency'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4 w-full md:w-1/2 md:mr-2">
                  <Label className="mx-4">Currency</Label>
                  <FormControl>
                  <CurrencySelect {...field} value={selectedCurrency} onChange={(value) => setSelectedCurrency(value)}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='billable'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4 w-full md:w-1/2 md:mr-2">
                  <Label className="mx-4" htmlFor="billable">Billable</Label>
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
          <div className='mb-2'>
            <FormField
              control={form.control}
              name='activity'
              render={({ field }) => (
                <FormItem className="flex flex-col items-left mt-4">
                  <Label className=" mx-4" htmlFor="code">Activity</Label>
                  <FormControl className="">
                    <ActivitySelect
                      selectedActivities={selectedActivities}
                      onChange={(activities) => {
                        setSelectedActivities(activities);
                        field.onChange(activities);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' >Create Project</Button>
        </form>
      </Form>
    </Card>
  );
};

export default ProjectForm;

          {/* User Assignment Section */}
          {/* Loop through projectUsers and render User Rows */}
          {/* {projectUsers.map((user, index) => (
            // ... render user row with information and remove button
          ))}
          <Button onClick={addProjectUser}>Add User</Button>
        {/* <div className="flex flex-col md:flex-row-reverse justify-between">
          <Button className='my-4 text-md' type='submit'>
            Save
          </Button>
          <Button className='my-4 text-md' variant='flairnowOutline'>Cancel</Button>  
        </div> */}