import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export const useUserSync = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && user) {
        try {
          // Call our sync API to ensure user exists in database
          await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              name: user.fullName,
              firstName: user.firstName,
              lastName: user.lastName,
              imageUrl: user.imageUrl,
              phoneNumber: user.phoneNumbers[0]?.phoneNumber
            })
          });
        } catch (error) {
          console.error('Failed to sync user:', error);
        }
      }
    };

    syncUser();
  }, [isLoaded, user]);

  return { user, isLoaded };
}; 