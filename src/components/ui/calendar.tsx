"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarDay: React.FC<{
  day: number | string;
  isHeader?: boolean;
  highlighted?: boolean;
}> = ({ day, isHeader, highlighted }) => {
  const highlightClass = highlighted
    ? "bg-indigo-500 text-white"
    : "text-muted-foreground";

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "" : "rounded-xl"
      } ${isHeader ? "text-muted-foreground" : highlightClass}`}
    >
      <span className={`font-medium ${isHeader ? "text-xs" : "text-sm"}`}>
        {day}
      </span>
    </div>
  );
};

export function Calendar({ bookingLink = "#" }: { bookingLink?: string }) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // A handful of days get a highlighted "booked" look — picked client-side
  // after mount (not during render) since Math.random() would otherwise
  // produce a different result on the server than on the client and trip
  // a hydration mismatch.
  const [highlightedDays, setHighlightedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    const days = new Set<number>();
    for (let day = 1; day <= daysInMonth; day++) {
      if (Math.random() < 0.3) days.add(day);
    }
    setHighlightedDays(days);
  }, [daysInMonth]);

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day) => <CalendarDay key={`header-${day}`} day={day} isHeader />),
      ...Array.from({ length: firstDayOfWeek }, (_, i) => (
        <div key={`empty-start-${i}`} className="col-span-1 row-span-1 h-8 w-8" />
      )),
      ...Array.from({ length: daysInMonth }, (_, i) => (
        <CalendarDay
          key={`date-${i + 1}`}
          day={i + 1}
          highlighted={highlightedDays.has(i + 1)}
        />
      )),
    ];

    return days;
  };

  return (
    <BentoCard linkTo={bookingLink}>
      <div className="grid h-full gap-5">
        <div>
          <h2 className="mb-4 text-lg font-semibold md:text-3xl">
            Any questions about your project?
          </h2>
          <p className="mb-2 text-xs text-muted-foreground md:text-md">
            Feel free to reach out to us!
          </p>
          <Button className="mt-3 rounded-2xl">Book Now</Button>
        </div>
        <div className="transition-all duration-500 ease-out md:group-hover:-right-12 md:group-hover:top-5">
          <div>
            <div className="h-full w-full max-w-[550px] rounded-[24px] border border-border p-2 transition-colors duration-100 group-hover:border-indigo-400">
              <div
                className="h-full rounded-2xl border-2 border-[#A5AEB81F]/10 p-3"
                style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
              >
                <div className="flex items-center space-x-2">
                  <p className="text-sm">
                    <span className="font-medium">
                      {currentMonth}, {currentYear}
                    </span>
                  </p>
                  <span className="h-1 w-1 rounded-full">&nbsp;</span>
                  <p className="text-xs text-muted-foreground">30 min call</p>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-2 px-4">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  showHoverGradient?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  className = "",
  showHoverGradient = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 hover:bg-indigo-100/10 ${className}`}
    >
      {linkTo && (
        <div className="absolute bottom-4 right-6 z-[999] flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <svg
            className="h-6 w-6 text-indigo-600"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>
      )}
      {showHoverGradient && (
        <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-indigo-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
      )}
      {children}
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith("/") ? (
      <Link href={linkTo} className="block">
        {cardContent}
      </Link>
    ) : (
      <a href={linkTo} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
