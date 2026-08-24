export enum Role {
  CUSTOMER = 'CUSTOMER',
  TECHNICIAN = 'TECHNICIAN',
  ADMIN = 'ADMIN',
}

export enum BookingStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PAID = 'PAID',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  status?: 'ACTIVE' | 'BANNED';
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  category?: ServiceCategory;
  technicianProfileId?: string;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  user?: User;
  bio?: string;
  skills: string[];
  hourlyRate: number;
  location: string;
  rating?: number;
  availability?: Record<string, string[]>;
  services?: ServiceItem[];
}

export interface Booking {
  id: string;
  customerId: string;
  customer?: User;
  technicianProfileId: string;
  technicianProfile?: TechnicianProfile;
  serviceId: string;
  service?: ServiceItem;
  scheduledAt: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
}