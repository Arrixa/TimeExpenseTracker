// WeekNavigator.tsx
import React from 'react';
import { Button } from '@/app/components/ui/button';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { WeekNavigatorProps } from '@/lib/interfaces';
import { calculateTotalHoursForWeek } from '@/lib/time/calculateTotalHoursForWeek';

export const WeekNavigator: React.FC<WeekNavigatorProps> = ({
    handlePreviousWeek,
    handleNextWeek,
    handleCurrentWeek,
    startDate,
    endDate,
    schedule
}) => {
    return (
        <section className="sticky top-11 flex justify-between items-center mb-4 p-2 space-x-2 border-b border-gray-500 bg-white/90 dark:bg-black/80">
            <div className='flex flex-row justify-center items-center'>
                <Button onClick={handlePreviousWeek} variant="ghost">
                    <IoChevronBack />
                </Button>
                <h2 className="text-lg font-semibold">{startDate + " - " + endDate}</h2>
                <Button onClick={handleNextWeek} variant="ghost">
                    <IoChevronForward />
                </Button>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <Button onClick={handleCurrentWeek} variant="flairnowOutline">
                    Today
                </Button>
                <h3 className="text-lg font-medium text-right px-6">Weekly hours: {calculateTotalHoursForWeek(schedule)}&nbsp;h</h3>

            </div>
        </section>
    );
};

export default WeekNavigator;
