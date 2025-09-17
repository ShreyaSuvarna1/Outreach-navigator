import type { Outreach } from '@/lib/types';

export const outreachData: Outreach[] = [
  {
    "id": "1",
    "institution": "Stanford University",
    "contactPerson": "Dr. Emily Carter",
    "topic": "AI in Healthcare Research",
    "scheduledAt": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    "status": "Scheduled",
    "notes": "",
    "contact": "emily.carter@stanford.edu"
  }
];
