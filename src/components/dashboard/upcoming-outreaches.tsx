"use client";

import * as React from "react";
import { format, isFuture } from "date-fns";
import { CalendarClock, Info, Clock } from "lucide-react";

import type { Outreach } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type UpcomingOutreachesProps = {
  records: Outreach[];
};

export default function UpcomingOutreaches({
  records,
}: UpcomingOutreachesProps) {
  const upcomingRecords = React.useMemo(() => {
    return records
      .filter(
        (record) =>
          record.status === "Scheduled" && isFuture(new Date(record.scheduledAt))
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );
  }, [records]);

  if (upcomingRecords.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
           <CalendarClock className="h-6 w-6" />
           <CardTitle>Upcoming Outreaches</CardTitle>
        </div>
        <CardDescription>
          Your next scheduled outreach events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {upcomingRecords.map((record) => (
              <CarouselItem key={record.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{record.institution}</CardTitle>
                      <CardDescription>{record.topic}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 mt-1 text-muted-foreground" />
                        <p>
                          <span className="font-semibold">Contact:</span>{" "}
                          {record.contactPerson}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CalendarClock className="h-4 w-4 mt-1 text-muted-foreground" />
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {format(new Date(record.scheduledAt), "PPP")}
                        </p>
                      </div>
                       <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                        <p>
                          <span className="font-semibold">Time:</span>{" "}
                          {format(new Date(record.scheduledAt), "p")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
