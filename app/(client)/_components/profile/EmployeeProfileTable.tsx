import React, { useEffect, useState } from 'react'
import RoleBadges from "../../../components/common/RoleBadges";
import { CldImage } from 'next-cloudinary';
import AddPhoto from '@/app/components/common/AddPhoto';
import { FormData } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/app/components/ui/card"
import { Label } from '@/app/components/ui/label';
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';

const EmployeeProfileTable: React.FC<{ formData: FormData, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }> = ({ formData, setIsEditMode }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const image = session?.user.image;
  const cloudinaryImageId = session?.user.id; 
  // console.log(formData, 'form data user data in employee profile table')
  const roles = session?.clientUser.role;
  const defaultImg = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/DefaultProfileImg.png';
  const imageCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${cloudinaryImageId}.png`;
  const [imageUrl, setImgUrl] = useState<string>(defaultImg);

  useEffect(() => {
    if (image && image !== null) {
      setImgUrl(imageCloudUrl);
    } else {
      setImgUrl(defaultImg);
    }
  }, [image, imageCloudUrl]);


  return (
    <article className='flex flex-col mx-auto w-full'>
       {/* FTN-2 / FTM-20 2. Profile image & name in banner card */}
      <Card className='md:mx-2 my-2 p-2 pt-4'>
        <CardContent>
          <div className='flex justify-start items-start'>
            <div className=''>
              <CldImage alt='profile image' src={imageUrl} width={50} height={50} className='rounded-full' />
            </div>
            <div className='mb-2'>
              <AddPhoto setImgUrl={setImgUrl} />
            </div>
          </div>
        </CardContent>
        <div className='flex flex-col md:flex-row justify-between'>
          <CardHeader>
            <CardTitle>{formData?.firstName}</CardTitle>
            <CardDescription>{formData?.email}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className='w-fit mt-2 text-md'
              onClick={() => setIsEditMode(true)}
            >
              Edit profile
            </Button>
          </CardFooter>
        </div>
      </Card>
       {/* FTN-2 / FTM-20 1. Profile card */}

      <Card className='md:mx-2 my-2 p-2 pt-4'>
        <CardHeader><CardTitle>Employee profile information</CardTitle></CardHeader>
        <CardContent className=''>
          <Label className="" htmlFor="firstName">First name</Label>
          <p>{formData?.firstName}</p>
        </CardContent>
        <CardContent>
          <Label htmlFor="lastName" className="">Last name</Label>
          <p>{formData?.lastName}</p>
        </CardContent>
        <CardContent>
          <Label htmlFor="email" className="">Email</Label>
          <p>{formData?.email}</p>
        </CardContent>
        <CardContent>
          <Label htmlFor="company" className="">Company</Label>
          <p>{`${user?.userDomain ? capitaliseFirstLetter(user?.userDomain) : ''}`}</p>
        </CardContent>
        <CardContent className= 'flex flex-col' >
          <Label htmlFor="role" className="">Role</Label>
          <div className='my-2 space-x-2'>
            <RoleBadges roles={roles} role={''} index={0} />
          </div>
        </CardContent>
        
      </Card>
    </article>
  )
}

export default EmployeeProfileTable;
