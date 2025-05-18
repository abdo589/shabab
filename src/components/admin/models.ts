
export interface User {
  id: string;
  full_name: string;
  national_id: string;
  phone: string;
  email?: string;
  address: string;
  gender: string;
  birth_date: string;
  education?: string;
  job_title?: string;
  member_type?: string;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
  status: 'قادم' | 'منتهي';
}
