"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Flame } from "lucide-react";
import { Card } from "../ui/card";

interface CalendarProps {
  streak: number; // số ngày học liên tục
}

export function CalendarStreak({ streak }: CalendarProps) {
  const today = new Date();

  // Ngày bắt đầu dựa trên streak
  const fromDate = new Date();
  fromDate.setDate(today.getDate() - (streak - 1));

  const dateRange: DateRange = {
    from: fromDate,
    to: today,
  };

  return (
    <Card className="w-full p-5 bg-secondary/5 border border-secondary hidden md:flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h4 className="font-bold">Learning Streak</h4>
        <h4 className="text-orange-500 flex gap-2 bg-orange-100 p-2 rounded-md font-bold ">
          <Flame />
          {streak} day
        </h4>
      </div>
      <Calendar
        mode="range"
        defaultMonth={fromDate}
        selected={dateRange}
        onSelect={() => {}}
        numberOfMonths={1}
        className="pointer-events-auto w-full"
      />
      <p className="border-t border-gray-400 mt-5 text-xs text-gray-500 pt-2">
        Keep your streak going! Complete simulations to stay active and build
        your skills consistently.
      </p>
    </Card>
  );
}
