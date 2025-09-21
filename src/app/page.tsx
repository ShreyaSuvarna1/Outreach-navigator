"use client";

import Header from '@/components/dashboard/header';
import OutreachTable from '@/components/dashboard/outreach-table';
import UpcomingOutreaches from '@/components/dashboard/upcoming-outreaches';
import { getOutreaches } from '@/lib/firebase/firestore';
import * as React from 'react';
import type { Outreach } from '@/lib/types';

export default function DashboardPage() {
  const [outreachData, setOutreachData] = React.useState<Outreach[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getOutreaches();
      setOutreachData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10">
        <UpcomingOutreaches records={outreachData} />
        <OutreachTable records={outreachData} />
      </main>
    </div>
  );
}
