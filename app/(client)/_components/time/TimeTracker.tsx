import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { useToast } from "@/app/components/ui/use-toast";
import { DrawerContent, DrawerFooter, DrawerClose } from '@/app/components/ui/drawer';
import { Label } from '@/app/components/ui/label';
import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue } from "@/app/components/ui/select";
import { ProjectActivityProps } from '@/lib/interfaces';

const FormSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  project: z.string().optional(),
  activity: z.string().optional(),
  notes: z.string().optional(),
});

const TimeTracker = ({ allProjects, schedule }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startTime: '',
      endTime: '',
      project: '',
      activity: '',
      notes: '',
    },
  });
 
  const { toast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedProjectActivityId, setSelectedProjectActivityId] = useState<string>('');
  const [filteredActivities, setFilteredActivities] = useState<ProjectActivityProps[]>([]);
  const [startTime, setStartTime] = useState<string>('08:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [calculatedHours, setCalculatedHours] = useState<number>(0);

  useEffect(() => {
    if (selectedProjectId) {
      const activitiesForProject = allProjects.activities.filter(activity => activity.projectId === selectedProjectId);
      setFilteredActivities(activitiesForProject);
    }
  }, [selectedProjectId, allProjects.activities]);

  useEffect(() => {
    const hours = calculateHoursWorked(startTime, endTime);
    setCalculatedHours(hours);
  }, [startTime, endTime]);

  function calculateHoursWorked(startTime: string, endTime: string) {
    const start = parseFloat(startTime.replace(':', '.')); 
    const end = parseFloat(endTime.replace(':', '.')); 
    let hours = end - start;

    // Ensure hours are within valid range
    if (hours < 0) {
        hours += 24; // Adjust for negative hours
    } else if (hours > 24) {
        hours = 24; // Cap hours to 24
    }

    return hours;
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const startDateISO = new Date(`${schedule.isoDate}T${startTime}`).toISOString();
      const endDateISO = new Date(`${schedule.isoDate}T${endTime}`).toISOString();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      console.log('Form submitted:', startDateISO, endDateISO, calculatedHours, timeZone);
      const response = await fetch('/api/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            startTime: startDateISO,
            endTime: endDateISO,
            hours: calculatedHours,
            timeZone: timeZone,
            date: schedule.isoDate,
            notes: data.notes,
            projectActivityId: selectedProjectActivityId,
        })
      });
      
      if (response.ok) {
        toast({
          description: "The hours saved successfully.",
        });
        // onHoursAdded();
        // form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Saving the hours failed.",
          description: "Please try again.",
        });
        console.error("Save failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Saving the hours failed in catch.",
        description: "Please try again.",
      });
    }
  };

  return (
    <DrawerContent>
      <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <CardTitle className='py-2'>{schedule.day}, {schedule.date}</CardTitle>
            <CardDescription>Add hours worked for specific projects and the corresponding activity</CardDescription>
          </div>
          <div>
            <p>{calculatedHours} h</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row mb-4 justify-between">
                <FormField 
                  control={form.control}
                  name='startTime'
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                      <Label className=" mx-4" htmlFor="start">Start time</Label>
                      <FormControl className="">
                        <Input
                          type='time'
                          className='mr-2'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                          value={startTime}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='endTime'
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                      <Label className=" mx-4" htmlFor="end">End time</Label>
                      <FormControl className="">
                        <Input
                          className='mr-2'
                          type='time'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
                          value={endTime}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='project'
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                      <Label className=" mx-4" htmlFor="project">Project</Label>
                      <FormControl className="">
                      <Select onValueChange={setSelectedProjectId}>
                          <SelectTrigger className="w-[150px] border-border mr-2">
                              <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                          <SelectContent>
                              {allProjects.projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='activity'
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                      <Label className=" mx-4" htmlFor="activity">Activity</Label>
                      <FormControl className="">
                        <Select disabled={!selectedProjectId} onValueChange={setSelectedProjectActivityId}>
                          <SelectTrigger className="w-[150px] border-border mr-2">
                            <SelectValue placeholder="Select activity" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredActivities.map((activity) => (
                            <SelectItem key={activity.id} value={activity.id}>{activity.activityName}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
                      <Label className=" mx-4" htmlFor="notes">Notes</Label>
                      <FormControl className="">
                        <Input type="text" id="notes" placeholder='Enter any additional notes' 
                          {...field} />
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
        </CardContent>
      </Card>
    </DrawerContent>
  )
}

export default TimeTracker;



// const TimeTracker = ({ allProjects, schedule }) => {

//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       startTime: '',
//       endTime: '',
//       project: '',
//       activity: '',
//       notes: '',
//     },
//   });
 
//   const { toast } = useToast();

//   const [selectedProjectId, setSelectedProjectId] = useState<string>('');
//   const [selectedProjectActivityId, setSelectedProjectActivityId] = useState<string>('');
//   const [filteredActivities, setFilteredActivities] = useState<ProjectActivityProps[]>([]);
//   // const [selectedActivityId, setSelectedActivityId] = useState<string>('');
//   const [startTime, setStartTime] = useState<string>('08:00')
//   const [endTime, setEndTime] = useState<string>('17:00')

//   useEffect(() => {
//     if (selectedProjectId) {
//       const activitiesForProject = allProjects.activities.filter(activity => activity.projectId === selectedProjectId);
//       setFilteredActivities(activitiesForProject);
//     }
//   }, [selectedProjectId, allProjects.activities]);

//   function calculateHoursWorked(startTime, endTime) {
//     const start = parseFloat(startTime.replace(':', '.')); 
//     const end = parseFloat(endTime.replace(':', '.')); 
//     let hours = end - start;

//     // Ensure hours are within valid range
//     if (hours < 0) {
//         hours += 24; // Adjust for negative hours
//     } else if (hours > 24) {
//         hours = 24; // Cap hours to 24
//     }

//     return hours;
//   }

//   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
//     console.log('Form submitted:', data, selectedProjectActivityId);
//     try {
//       const startDateISO = new Date(`${schedule.isoDate}T${startTime}`).toISOString();
//       const endDateISO = new Date(`${schedule.isoDate}T${endTime}`).toISOString();

//       const hoursWorked = calculateHoursWorked(startTime, endTime);
//       console.log('Form submitted:', startDateISO, endDateISO, hoursWorked);
//       const response = await fetch('/api/time', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             startTime: startDateISO,
//             endTime: endDateISO,
//             hours: hoursWorked,
//             notes: data.notes,
//             projectActivityId: selectedProjectActivityId,
//         })
//       })
//         if (response.ok) {
//           console.log(response)
//           // onActivityAdded();
//           toast({
//             description: "The activity saved successfully.",
//           })
//           const res = await response.json();
//           const data = res.ProjectActivity
//           console.log(res);
//           // router.push(`/project/${id}`)
//         } else {
//           toast({
//             variant: "destructive",
//             title: "Saving the hours failed.",
//             description: "Please try again.",
//           })
//           console.error("Save failed");
//         }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Saving the hours failed in catch.",
//         description: "Please try again.",
//       });
//     }
//   };

//   return (
//     <DrawerContent>
//       <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
//         <CardHeader className='flex flex-row justify-between'>
//           <div>
//             <CardTitle className='py-2'>{schedule.day}, {schedule.date}</CardTitle>
//             <CardDescription>Add hours worked for specific projects and the corresponding activity</CardDescription>
//           </div>
//           <div>
//             <p>{calculateHoursWorked(startTime, endTime)} h</p>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <div className="flex flex-col md:flex-row mb-4 justify-between">
//                 <FormField 
//                   control={form.control}
//                   name='startTime'
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
//                       <Label className=" mx-4" htmlFor="start">Start time</Label>
//                       <FormControl className="">
//                         <Input
//                           type='time'
//                           className='mr-2'
//                           onChange={(e: any) => setStartTime(e.target.value)}
//                           // value={schedule[dayIndex].hours[entryIndex].startTime}
//                           // placeholder='08:00'
//                           // onChange={(e: any) =>
//                           //   handleTimeChange(dayIndex, entryIndex, 'startTime', e.target.value, schedule, setSchedule, totalHoursDisplayRef,
//                           //   setStartTime(e.target.value)
//                           //   )}
//                           // {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField 
//                   control={form.control}
//                   name='endTime'
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
//                       <Label className=" mx-4" htmlFor="end">End time</Label>
//                       <FormControl className="">
//                       <Input
//                         className='mr-2'
//                         type='time'
//                         onChange={(e: any) => setStartTime(e.target.value)}
//                         // {...field} 
//                         // value={schedule[dayIndex].hours[entryIndex].endTime}
//                         // placeholder='17:00'
//                         // onChange={(e: any) => handleTimeChange(dayIndex, entryIndex, 'endTime', e.target.value, schedule, setSchedule, totalHoursDisplayRef,
//                         // // setEndTime(value)
//                         // )}
//                       />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField 
//                   control={form.control}
//                   name='project'
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
//                       <Label className=" mx-4" htmlFor="project">Project</Label>
//                       <FormControl className="">
//                       <Select onValueChange={setSelectedProjectId}>
//                           <SelectTrigger className="w-[150px] border-border mr-2">
//                               <SelectValue placeholder="Select project" />
//                           </SelectTrigger>
//                           <SelectContent>
//                               {allProjects.projects.map((project) => (
//                               <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
//                               ))}
//                           </SelectContent>
//                       </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField 
//                   control={form.control}
//                   name='activity'
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
//                       <Label className=" mx-4" htmlFor="activity">Activity</Label>
//                       <FormControl className="">
//                         <Select disabled={!selectedProjectId} onValueChange={setSelectedProjectActivityId}>
//                           <SelectTrigger className="w-[150px] border-border mr-2">
//                             <SelectValue placeholder="Select activity" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {filteredActivities.map((activity) => (
//                             <SelectItem key={activity.id} value={activity.id}>{activity.activityName}</SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField 
//                   control={form.control}
//                   name='notes'
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col items-left mt-4 pr-2 flex-1">
//                       <Label className=" mx-4" htmlFor="notes">Notes</Label>
//                       <FormControl className="">
//                         <Input type="text" id="notes" placeholder='Enter any additional notes' 
//                           {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <DrawerFooter className='flex flex-col md:flex-row justify-between px-2'>
//                 <DrawerClose asChild>
//                   <Button variant="flairnowOutline">Cancel</Button>
//                 </DrawerClose>
//                 <Button variant='flairnow' type='submit'>Save</Button>
//               </DrawerFooter>
//             </form>
//           </Form>             
//         </CardContent>
//       </Card>
//     </DrawerContent>
//   )
// }

// export default TimeTracker