'use client';

import React from 'react';

interface AuthFormProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthForm({ title, subtitle, children }: AuthFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}