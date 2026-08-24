import { Role } from '@/lib/types';

export const navConfig = {
  [Role.CUSTOMER]: [
    { label: 'My Bookings', href: '/dashboard' },
  ],
  [Role.TECHNICIAN]: [
    { label: 'Booking Queue', href: '/author-dashboard' },
    { label: 'Manage Availability', href: '/author-dashboard/availability' },
  ],
  [Role.ADMIN]: [
    { label: 'User Management', href: '/admin-dashboard' },
    { label: 'Category Settings', href: '/admin-dashboard/categories' },
  ],
};