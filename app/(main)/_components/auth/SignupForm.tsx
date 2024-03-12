'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';
import { Label } from '@/app/components/ui/label';
import { extractEmailDomain, isDomainInExcludedList } from '@/lib/extractDomain';
import { useEffect, useState } from 'react';
import { useToast } from "@/app/components/ui/use-toast"

const FormSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required with a minimum of 2 characters').max(100),
    lastName: z.string().min(2, 'Last name is required with a minimum of 2 characters').max(100),
    userDomain: z.string()
  })

// FTM-2 1. Create sign up form for recruiter & candidate users
const SignUpForm = () => {
  const [domain, setDomain] = useState<string>("" as string);
  const router = useRouter();
  const { toast } = useToast()
  const { data: session, update } = useSession();

  // FTM-2 / FTM-17 7. Extract domain from email
  useEffect(() => {
    if (session?.user.email) {
      const domainExtract = extractEmailDomain(session.user.email);
      const isPublicDomain = isDomainInExcludedList(domainExtract);
      console.log(domainExtract, isPublicDomain)

      if (isPublicDomain === true) {
        setDomain("public");
      } else {
        setDomain(domainExtract);
      }
    }
  }, [session]);
  console.log(domain, 'domain in sign up form')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userDomain: domain,
    },
  });

  useEffect(() => {
    form.setValue("userDomain", domain);
  }, [domain, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('onSubmit clicked', data)
    try {
      const response = await fetch('/api/user-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: session?.user.email,
          userDomain: domain
        })
      })
      if (response.ok) {
        toast({
          description: "The user registered successfully.",
        })
        const res = await response.json();
        const responseData = res.updatedInfo;
        console.log(responseData, 'responseData in sign up form');
        // FTM-2 / FTM-17 10. Update session with response data
        await update({
          ...session,
          ...session?.user,
          id: responseData.id,
          userDomain: responseData.userDomain,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          email: responseData.email,
          image: responseData.image,
          ...session?.clientUser,
          role: responseData.role, 
          userId: responseData.userId,
          clientId: responseData.clientId, 
        });
        const updatedSession = await getSession();
        console.log("Updated Session:", updatedSession);
        router.push('/auth/validate-auth')
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "The user registration failed.",
          description: "Please try again.",
        })
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "The user registration failed.",
        description: "Please try again.",
      })
      console.error("Registration failed:", error);
    }
  }

  // const sessionEnd = getSession(); 
  // console.log(sessionEnd, 'session in sign up form bottom')

  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full px-4 ">
      <div className="flex flex-col mx-auto w-full my-2">
        <Label className='text-left ml-2 p-2'>Email</Label>
        <Input className='text-foreground' disabled placeholder={session?.user.email} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='space-y-2 md:w-full'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-3'>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-3'>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
          <div>
          <Button className='min-w-full w-full mt-6 text-md' type='submit'>
            Save
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;