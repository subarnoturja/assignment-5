'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api-client';
import { ServiceItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery<ServiceItem[]>({
    queryKey: ['public-services'],
    queryFn: () => fetcher('/service'),
  });

  if (isLoading) return <div className="p-8 text-center text-sm">Loading available services...</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Our Professional Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services?.map((service) => (
          <div key={service.id} className="bg-white border rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-800">{service.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
            <div className="pt-2 flex justify-between items-center border-t">
              <span className="text-base font-extrabold text-blue-600">
                {formatCurrency(service.price)}
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-bold">
                Available
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}