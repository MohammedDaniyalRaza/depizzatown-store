"use client"

import { useUserSync } from '@/lib/hooks/useUserSync';

export default function UserSyncWrapper({ children }: { children: React.ReactNode }) {
  // This will automatically sync user data when they visit any page
  useUserSync();
  
  return <>{children}</>;
} 