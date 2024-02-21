import { CldImage } from 'next-cloudinary';
import { BookText, Building, Paperclip } from "lucide-react";
import AddLogo from "./AddLogo";
import { ClientForm } from "@/lib/interfaces"
import { useState, useEffect } from "react";
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import Link from "next/link";

const CompanyInfo: React.FC<ClientForm & { formData?: ClientForm, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }> = ({ formData, setIsEditMode }) => {

  const client = formData
  console.log(client, 'client data in client info')

  function formatPhoneNumber(countryCode: string | undefined, phoneNumber: string | undefined): string | undefined {
    if (countryCode && phoneNumber) {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      if (!cleanedPhoneNumber) {
        return undefined; 
      }
      const formattedPhoneNumber = `+${countryCode} ${cleanedPhoneNumber.replace(/^0+/, '').replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4')}`;
  
      return formattedPhoneNumber;
    } else {
      return undefined; 
    }
  };

  const logo = client?.logo;
  const cloudinaryLogoDomain = client?.domain;
  const defaultLogo = 'https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/DefaultLogo.png';
  const logoCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${cloudinaryLogoDomain}.png`;
  const [logoUrl, setLogoUrl] = useState<string>(defaultLogo);


  useEffect(() => {
    if (logo && logo !== null) {
      setLogoUrl(logoCloudUrl);
    } else {
      setLogoUrl(defaultLogo);
    }
  }, [logo, logoCloudUrl]);

  useEffect(() => {
    console.log("Logo URL updated:", logoUrl);
  }, [logoUrl]);

  return (
    <section className="flex flex-col w-full"> 
      <Card className='m-2 p-2'>
        <CardContent>
          <div className="w-full flex flex-row items-center align-bottom">
            <div className=''>
              <CldImage alt={`${client?.domain} logo`} src={logoUrl} width={80} height={80} className='object-cover' />
            </div>
            <div className='mb-8 align-top'>
              <AddLogo setLogoUrl={setLogoUrl} />
            </div>
          </div>
        </CardContent>
        <div className='flex flex-col md:flex-row justify-between'>
          <CardHeader>
            <CardTitle>{`Welcome ${capitaliseFirstLetter(client?.domain ? client?.domain : "")}`}</CardTitle>
            <CardDescription>{client?.companyName ? client?.companyName : ""}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className='w-fit mt-2 text-md'
              onClick={() => setIsEditMode(true)}
            >
              Edit information
            </Button>
          </CardFooter>
        </div>
      </Card> 
      <div className="flex flex-col md:flex-row w-full">
        <Card className='m-2 p-2 w-full'>
          <CardHeader>
          {/* <BookText /> */}
            <CardTitle> General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Company name:</Label>
            <p>{client?.companyName}</p>
          </CardContent>
          <CardContent>
            <Label>Website:</Label>
            <Link href={client?.website ? client?.website : "#"}><p>{client?.website}</p></Link>
          </CardContent>
          <CardContent>
            <Label>Description:</Label>
            <p>{client?.description}</p>
          </CardContent>
          <CardContent>
            <Label>Phone number:</Label>
            <p>{formatPhoneNumber(client?.countryCode, client?.phoneNumber)}</p>
          </CardContent>
        </Card> 
        <Card className='m-2 p-2 w-full'>
          <CardHeader>
          {/* <Building /> */}
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Street number:</Label>
            <p>{client?.streetNo}</p>
          </CardContent>
          <CardContent>
            <Label>Street address:</Label>
            <p>{client?.streetAddress}</p>
          </CardContent>
          <CardContent>
            <Label>Province:</Label>
            <p>{client?.province}</p>
          </CardContent>
          <CardContent>
            <Label>Zip code:</Label>
            <p>{client?.zipCode}</p>
          </CardContent>
          <CardContent>
            <Label>Country:</Label>
            <p>{client?.country}</p>
          </CardContent>
        </Card> 
      </div>
    </section>
  )
}

export default CompanyInfo;
