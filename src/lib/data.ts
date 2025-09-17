import type { Outreach } from '@/lib/types';

export const outreachData: Outreach[] = [
  {
    id: '1',
    contactPerson: 'Dr. Evelyn Reed',
    institution: 'St. Jude Children\'s Research Hospital',
    topic: 'Research Collaboration',
    notes: 'Initial discussion about potential partnership on pediatric cancer research. Dr. Reed is very interested in our new genomic sequencing technology. Follow-up meeting scheduled for next month to discuss technical details and grant proposals.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    status: 'Scheduled',
    summary: 'Discussed a research collaboration with Dr. Evelyn Reed from St. Jude. She is interested in our genomic sequencing tech. A follow-up is scheduled next month.'
  },
  {
    id: '2',
    contactPerson: 'Mr. Johnathan Chen',
    institution: 'Red Cross',
    topic: 'Community Health Initiative',
    notes: 'Completed a workshop on local health resources. Great turnout, around 50 attendees. Mr. Chen was pleased with the engagement and suggested a series of workshops. We need to draft a proposal for the series.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    status: 'Completed',
    summary: 'Successfully held a health workshop with the Red Cross, attended by 50 people. Mr. Chen proposed a series of workshops; a proposal is the next step.'
  },
  {
    id: '3',
    contactPerson: 'Prof. Alistair Finch',
    institution: 'MIT Media Lab',
    topic: 'Guest Lecture on AI Ethics',
    notes: 'Alistair is unavailable for the proposed date. Need to reschedule for sometime in the next quarter. He suggested reaching out to his assistant, Maria, to coordinate.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString(),
    status: 'Scheduled',
  },
  {
    id: '4',
    contactPerson: 'Samantha Green',
    institution: 'UNICEF',
    topic: 'Fundraising Event Logistics',
    notes: 'Finalized logistics for the annual charity gala. All vendors confirmed. Samantha expressed gratitude for our support. The event is expected to raise over $200k for children\'s education programs.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    status: 'Completed',
    summary: 'Finalized gala logistics with UNICEF. All vendors are confirmed for the event, which is anticipated to raise over $200k.'
  },
  {
    id: '5',
    contactPerson: 'David Lee',
    institution: 'Local Community Center',
    topic: 'Youth Mentorship Program',
    notes: 'Cancelled due to scheduling conflicts. David will reach out in the new year to restart the conversation.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    status: 'Cancelled',
  },
   {
    id: '6',
    contactPerson: 'Dr. Maria Rodriguez',
    institution: 'World Health Organization',
    topic: 'Global Pandemic Preparedness',
    notes: 'Joined a WHO webinar on pandemic preparedness. Dr. Rodriguez presented compelling data on the need for international cooperation. Our organization could contribute by sharing our supply chain management software.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    status: 'Completed',
    summary: 'Attended a WHO webinar on pandemic preparedness. Identified an opportunity to contribute our supply chain software.'
  },
];
