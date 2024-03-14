// WeekNavigator.tsx
import React from 'react';
import { Button } from '@/app/components/ui/button';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { WeekNavigatorProps } from '@/lib/interfaces';

export const WeekNavigator: React.FC<WeekNavigatorProps> = ({
    handlePreviousWeek,
    handleNextWeek,
    handleCurrentWeek,
    startDate,
    endDate,
}) => {
    return (
        <div className="sticky top-0 flex justify-center items-center mb-4 p-2 space-x-2 border-b border-gray-500 bg-white/90 dark:bg-black/80">
            <Button onClick={handlePreviousWeek} variant="ghost">
                <IoChevronBack />
            </Button>
            <h2 className="text-lg font-semibold">{startDate + " - " + endDate}</h2>
            <Button onClick={handleNextWeek} variant="ghost">
                <IoChevronForward />
            </Button>
            <Button onClick={handleCurrentWeek} variant="outline">
                Today
            </Button>
        </div>
    );
};

export default WeekNavigator;
