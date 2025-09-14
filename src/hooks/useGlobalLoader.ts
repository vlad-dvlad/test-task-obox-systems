import { useState, useEffect, useCallback } from 'react';

interface UseGlobalLoaderReturn {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useGlobalLoader = (
  initialLoading: boolean = true
): UseGlobalLoaderReturn => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [initialLoading]);

  return {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
  };
};
