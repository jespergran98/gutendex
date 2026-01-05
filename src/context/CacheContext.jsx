import React, { createContext, useContext, useState, useCallback } from 'react';

const CacheContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within CacheProvider');
  }
  return context;
};

export const CacheProvider = ({ children }) => {
  const [cache, setCache] = useState(new Map());

  const getCachedData = useCallback((key) => {
    return cache.get(key);
  }, [cache]);

  const setCachedData = useCallback((key, data) => {
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.set(key, {
        data,
        timestamp: Date.now()
      });
      return newCache;
    });
  }, []);

  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  const removeCachedData = useCallback((key) => {
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.delete(key);
      return newCache;
    });
  }, []);

  return (
    <CacheContext.Provider value={{
      getCachedData,
      setCachedData,
      clearCache,
      removeCachedData
    }}>
      {children}
    </CacheContext.Provider>
  );
};