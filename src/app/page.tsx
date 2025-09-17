import Header from '@/components/dashboard/header';
import OutreachTable from '@/components/dashboard/outreach-table';
import UpcomingOutreaches from '@/components/dashboard/upcoming-outreaches';
import { getOutreaches } from '@/lib/firebase/firestore';

export default async function DashboardPage() {
  const outreachData = await getOutreaches();
  
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
