export type Outreach = {
  id: string;
  contactPerson: string;
  institution: string;
  topic: string;
  notes?: string;
  scheduledAt: string; // ISO string format
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  summary?: string;
  contact?: string;
};
