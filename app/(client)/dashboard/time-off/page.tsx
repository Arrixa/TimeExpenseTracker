import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs"
import CustomCalendar from '../../_components/time-off/customcalendar'
// import TimeoffCalendar from './timeoffCalendar'

const TimeoffPage = () => {
    return (
        <div>
            <h2>Time off</h2>
            <Tabs defaultValue="calendar" className="w-full">
                <TabsList>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="leave">Leave and Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar">
                    <CustomCalendar />
                </TabsContent>
                <TabsContent value="leave">Change your password here.</TabsContent>
            </Tabs>

        </div>
    )
}

export default TimeoffPage