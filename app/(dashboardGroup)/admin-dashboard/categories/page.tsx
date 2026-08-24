'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/api-client';
import { ServiceCategory } from '@/lib/types';
import { getStoredToken } from '@/utils/jwt';
import { createCategoryAction } from '../../_actions/dashboard';

export default function CategoryManagementPage() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data: categories, isLoading } = useQuery<ServiceCategory[]>({
    queryKey: ['admin-categories'],
    queryFn: () => fetcher('/admin/categories'),
  });

  const createCategory = useMutation({
    mutationFn: async () => {
      const token = getStoredToken();
      if (!token) throw new Error('Unauthenticated');
      return createCategoryAction(token, name, description);
    },
    onSuccess: () => {
      setName('');
      setDescription('');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory.mutate();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Service Categories</h1>

      <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-lg">
        <h2 className="text-base font-bold mb-4">Create New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Category Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">
            Create Category
          </button>
        </form>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4 text-center text-xs">Loading Categories...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b text-slate-600">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories?.map((cat) => (
                <tr key={cat.id}>
                  <td className="p-4 font-semibold">{cat.name}</td>
                  <td className="p-4 text-slate-500">{cat.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}