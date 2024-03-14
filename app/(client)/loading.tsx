import { Skeleton } from "../components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/app/components/ui/card'

const LoadingPage = () => {
  return (
    <Card className="p-6 my-20 flex items-center justify-center flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
      <CardTitle className="text-4xl py-6 text-center">Loading...</CardTitle>
      <CardDescription className="text-lg text-center">Please wait while the content is loading.</CardDescription>
      <CardContent>
        <Skeleton className="w-[200px] h-[40px] rounded-full my-10" />
        <Skeleton className="w-[150px] h-[30px] rounded-full my-10" />
      </CardContent>
    </Card>
  );
};

export default LoadingPage;