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
        <main className="flex flex-col items-left w-full lg:p-10 md:p-6 p-2">
        <h1 className="text-3xl text-left pl-6 lg:px-10 md:px-10 font-semibold my-4 pt-4">Time Off</h1>
        <h3 className="text-lg text-left pl-6 lg:px-10 md:px-10 my-4">Request and Track your leave request.</h3>
        {/* <TimeTracker /> */}
        <Tabs defaultValue="calendar" className="w-full">
                <TabsList>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="leave">Leave and Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar">
                    <CustomCalendar />
                </TabsContent>
                <TabsContent value="leave">Leave Request List</TabsContent>
            </Tabs>
      </main>
    )
}

export default TimeoffPage