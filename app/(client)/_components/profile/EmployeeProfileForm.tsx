'use client'
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
import { ChevronLeft } from 'lucide-react';
import { Label } from '@/app/components/ui/label';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';

const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  image: z.string().optional(),
  id: z.string().optional(),
});

 // FTN-2 / FTM-20 5. Update employee profile

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, setIsEditMode, setFormData, session }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
      id: '',
    },
  });

  const { update } = useSession();
  const { toast } = useToast()

  console.log(formData, 'formData from employee profile in form')

  useEffect(() => {
    const mappedData = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      image: formData?.image,
    };
    form.reset(mappedData);
  }, [formData, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        })
      })

      console.log('Form submission response:', response);
      // FTN-2 / FTM-20 7. 
      if (response.ok) {
        toast({
          description: "The user information saved successfully.",
        })
        const res = await response.json();
        const responseData = res.updatedInfo;
        setFormData(responseData)
        await update({
          ...session,
          ...session?.user,
          id: responseData.user.id,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          email: responseData.email,
          image: responseData.image,
        });
        setIsEditMode(false)
      } else {
        toast({
          variant: "destructive",
          title: "The user information save failed.",
          description: "Please try again.",
        })
        console.error("Save failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "The user information save failed.",
        description: "Please try again.",
      })
      console.error("Save failed:", error);
    }
  };

  return (
    <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
      <CardHeader><CardTitle>Employee profile information</CardTitle></CardHeader>
      <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full px-2'>
          <div className="flex flex-col">
            <div className="">
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4">
                    <Label className="w-1/2 mx-4" htmlFor="firstName">First name</Label>
                    <FormControl className="">
                      <Input type="text" id="firstName" placeholder='Enter your first name' 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className="flex flex-col items-left mt-4">
                  <Label htmlFor="lastName" className="w-1/2 md:mx-4 ml-1">Last name</Label>
                    <FormControl className="">
                      <Input type="text" id="lastName" placeholder='Enter your last name' 
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
            
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between">
            <Button variant='flairnowOutline' className='my-4 text-md' onClick={() => setIsEditMode(false)}>Cancel</Button>
            <Button className='my-4 text-md' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </Form>   
    </Card> 
  );
};

export default ProfileForm;
