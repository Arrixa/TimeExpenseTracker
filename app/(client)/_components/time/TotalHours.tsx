'use client'
import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { calculateTotalHoursForWeek } from '@/lib/time/calculateTotalHoursForWeek';
import { DaySchedule } from '@/lib/interfaces';

const TotalHours = (schedule: DaySchedule[]) => {
  return (
    <Card className="sticky top-0 mt-4 h-fit w-fit">
        <CardHeader>
            <CardTitle>
            <h2 className="text-3xl font-semibold text-center">{calculateTotalHoursForWeek(schedule)}&nbsp;h</h2>
            </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col justify-between space-y-4'>
            <p className="text-sm text-center">Worked this week</p>
            <Button
            // onClick={handleSubmitTimesheet}
            >
                Submit time
            </Button>
            <p className='text-xs'>Timesheets are sent for your manager approval.</p>
        </CardContent>
    </Card>
  )
}

export default TotalHours;
