import type { Outreach } from '@/lib/types';

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);
futureDate.setHours(10, 0, 0, 0);

export const outreachData: Outreach[] = [
  {
    id: '1',
    contactPerson: 'Dr. Alan Grant',
    institution: 'University of Montana',
    topic: 'Guest Lecture on Velociraptors',
    notes: '',
    scheduledAt: futureDate.toISOString(),
    status: 'Scheduled',
    summary: '',
    contact: 'alan.grant@dino.com',
  },
];
