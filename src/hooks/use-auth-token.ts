import { useAuth } from '@clerk/clerk-react';

export const useAuthToken = () => {
  const { getToken } = useAuth();
  
  const getAuthHeaders = async () => {
    const token = await getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  return { getAuthHeaders };
}; 