'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UserProfile from './ProfileTable';
import { useEffect, useState } from "react";
import { UserProps, FormData } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';
import { ChevronLeft } from 'lucide-react';


const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  image: z.string().optional(),
  id: z.string().optional(),
});


const ProfileForm: React.FC<UserProps> = ({ user }) => {
  console.log('user in ProfileForm', user)
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

  const {data: session, update } = useSession();
  const [isEditMode, setIsEditMode] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    image: user?.image || '',
    id: user?.id || '',
  });

  useEffect(() => {
    const mappedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      image: formData.image,
    };
    form.reset(mappedData);
  }, [formData, form]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch data from your API endpoint
  //       const response = await fetch('/api/user');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       const data = await response.json();
  //       setFormData(data)
  //       console.log(data.user, 'data user')
  //       // Set form data with fetched values
  //       console.log(data, 'data fetch');
  
  //       const mappedData = {
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //       };
  //       form.reset(mappedData)
  //       console.log('form reset data', data)
  //     } catch (error) {
  //       console.error('Error fetching form data:', error);
  //     }
  //   };
  
  //   // Call fetchData when the component mounts
  //   fetchData();
  // }, [form]);

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

      if (response.ok) {
        toast.success("The user infomation saved successfully.");
        const res = await response.json();
        const responseData = res.updatedInfo;
        setFormData(responseData)
        await update({
          ...session,
          ...session?.user,
          id: responseData.id,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          email: responseData.email,
          image: responseData.image,
        });
        setIsEditMode(true)
      } else {
        console.error("Save failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <section className="flex flex-col w-full">
      {isEditMode ? (
        <div className='w-full'>
          <div className="flex flex-row mx-auto w-full">
            {user && <UserProfile user={user} formData={formData} />}
          </div>
          <div className="flex items-center">
              <div className="w-1/2 ml-8">
              </div>            
              <div className="w-full ml-24">
                <Button
                  className='w-full mt-1 text-md'
                  onClick={() => setIsEditMode(false)}
                >
                  Edit
                </Button>
              </div>
            </div>
        </div>
      ) : (
      <div 
      className='flex flex-col mx-auto w-full'
      >  
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className="flex flex-col">
              <div className="">
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">First name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter your first name' 
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
                    <FormItem className="flex items-center">
                      <FormLabel className="w-1/2 ml-10">Last name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter your last name' 
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
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 ml-10">Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <div className="flex items-center">
              <div className="w-1/2 ml-4 mr-4">
                <ChevronLeft className='cursor-pointer mt-6 ml-6'  onClick={() => setIsEditMode(true)} />
              </div>
            
              <div className="w-full mt-1">
                <Button className='w-full mt-6 text-md' type='submit'>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>    
      </div>
        )}
    </section>
  );
};

export default ProfileForm;
