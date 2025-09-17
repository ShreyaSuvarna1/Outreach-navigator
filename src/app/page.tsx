import Header from '@/components/dashboard/header';
import OutreachTable from '@/components/dashboard/outreach-table';
import { outreachData } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10">
        <OutreachTable records={outreachData} />
      </main>
    </div>
  );
}
