'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiBuildingOffice, HiNewspaper } from 'react-icons/hi2';
import { Textarea } from '@/app/components/ui/textarea';
// import CountrySelect from './CountrySelect';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';
import { useState } from 'react';
import CompanyInfo from './CompanyInfo';
import { Session } from "next-auth";

interface AdminProps {
  session?: Session | null, 
  onClick?: () => void;
}

const FormSchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  website: z.string().url('Invalid URL'),
  description: z.string(),
  // countryCode: z.string().length(2, 'Country Code must be 2 characters'),
  phoneNumber: z.string().min(1, 'Phone Number is required'),
  streetNo: z.string(),
  streetAddress: z.string(),
  province: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

const yourComponentStyles = {
  containerStyle: {
    display: 'flex',
    height: '2.5rem', // h-10 in Tailwind
    width: '100%', // w-full in Tailwind
    borderRadius: '.375rem', // rounded-md in Tailwind
    border: '2px solid #e2e8f0', // border-2 border-border in Tailwind
    backgroundColor: '#fff', // bg-input in Tailwind
    paddingLeft: '.75rem', // px-3 in Tailwind
    paddingRight: '.75rem', // px-3 in Tailwind
    paddingTop: '.5rem', // py-2 in Tailwind
    paddingBottom: '.5rem', // py-2 in Tailwind
    fontSize: '0.875rem', // text-sm in Tailwind
    outline: 'none', // focus-visible:outline-none in Tailwind
    ring: '2px solid #93c5fd', // focus-visible:ring-2 in Tailwind
    ringPrimary: '2px solid #3b82f6', // focus-visible:ring-primary in Tailwind
    focusVisible: {
      '--tw-ring-offset-width': '2px',
      '--tw-ring-color': '#8D00FE',
      'outline': '2px solid transparent',
      'outline-offset': '2px',
      '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'
    }, // focus-visible:ring-offset-2 in Tailwind
    cursor: 'not-allowed', // disabled:cursor-not-allowed in Tailwind
    opacity: '0.5', // disabled:opacity-50 in Tailwind
  },
  inputstyle: {
    flex: '1',
    background: '#fff', // background: "white" in Tailwind
    focusVisible: {
      '--tw-ring-offset-width': '2px',
      '--tw-ring-color': '#8D00FE',
      'outline': '2px solid transparent',
      'outline-offset': '2px',
      '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'
    },
  },
};

const AdminDashboardForm: React.FC<AdminProps> = ({ session }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: '',
      website: '',
      description: '',
      // countryCode: '',
      phoneNumber: '',
      streetNo: '',
      streetAddress: '',
      province: '',
      zipCode: '',
      country: '',
    },
  });

  const [isEditMode, setIsEditMode] = useState(true);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form submitted:', data);
    console.log("Save client function called");
    try {
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName: data.companyName,
          website: data.website,       
          description: data.description,
          phoneNumber: data.phoneNumber,
          streetNo: data.streetNo,
          streetAddress: data.streetAddress,
          province: data.province,
          zipCode: data.zipCode, 
          country: data.country,    
        })
      })
      if (response.ok) {
        toast.success("The client infomation saved successfully.");
        setIsEditMode(true)
      } else {
        // const errorData = await response.json();
        console.error("Save failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <section className="flex flex-col w-full p-4">
      {isEditMode ? (
        <div className='w-full'>
          <div className="flex flex-row mx-auto w-full">
            <CompanyInfo session={session}/>
          </div>
          <Button
            className='mt-4 text-md px-10'
            onClick={() => setIsEditMode(false)}
          >
            Edit
          </Button>
        </div>
      ) : (
      <div 
      className='flex flex-col mx-auto w-full'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full lg:w-3/4'>
            <div className="flex items-center my-4">
              <HiNewspaper />
              <h2 className="text-xl font-semibold ml-6">General Information</h2>
            </div>
            <div className="flex flex-col">
              <div className="">
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem className="flex items-center border-b">
                      <FormLabel className="w-1/2 ml-10">Name</FormLabel>
                      <FormControl className="">
                        <Input placeholder='Enter company name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem className="flex items-center border-b">
                    <FormLabel className="w-1/2 ml-10">Website</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter website URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className="flex items-center border-b">
                    <FormLabel className="w-1/2 ml-10">Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your description" {...field} />
                      {/* <Input placeholder='Enter description'  /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className="flex items-center border-b">
                    <FormLabel className="w-1/2 ml-10">Phone number</FormLabel>
                    <FormControl>
                      <PhoneInput 
                        className='flex h-10 w-full rounded-md bg-input px-3 py-2 text-sm ring-offset-accent file:border-0  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' 
                        containerStyle={yourComponentStyles.containerStyle}
                        inputstyle={yourComponentStyles.inputstyle}
                        placeholder="Enter phone number"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                
            </div>
            <div className="flex items-center my-4">
              <HiBuildingOffice />
              <h2 className="text-xl font-semibold ml-6">Location</h2>
            </div>
            <div className="flex flex-col">
              <FormField
                  control={form.control}
                  name='streetNo'
                  render={({ field }) => (
                    <FormItem className="flex items-center border-b">
                      <FormLabel className="w-1/2 ml-10">Street number</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter street number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='streetAddress'
                  render={({ field }) => (
                    <FormItem className="flex items-center border-b">
                      <FormLabel className="w-1/2 ml-10">Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter street address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='province'
                  render={({ field }) => (
                    <FormItem className="flex items-center border-b">
                      <FormLabel className="w-1/2 ml-10">Province</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter province' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='zipCode'
                  render={({ field }) => (
                    <FormItem className="flex items-center border-b">
                      <FormLabel className="w-1/2 ml-10">Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter zip code' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem className="flex items-center border-b">
                      <FormLabel className="w-1/2 ml-10">Country</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter country' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex items-center">
              <div className="w-1/2 ml-10">
                {/* Empty div to create space for label alignment */}
              </div>
              <div className="w-full">
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

export default AdminDashboardForm;

{/* <FormField
                control={form.control}
                name='countryCode'
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-1/2 pr-4">Country code</FormLabel>
                    <FormControl>
                      <CountrySelect {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}