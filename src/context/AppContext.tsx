import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DeviceType, DeviceSpecs, PriceEstimate, ComparisonResult } from '../types';

interface AppContextType {
  deviceType: DeviceType | null;
  setDeviceType: (type: DeviceType | null) => void;
  deviceSpecs: DeviceSpecs | null;
  setDeviceSpecs: (specs: DeviceSpecs | null) => void;
  priceEstimate: PriceEstimate | null;
  setPriceEstimate: (estimate: PriceEstimate | null) => void;
  comparisonResults: ComparisonResult[] | null;
  setComparisonResults: (results: ComparisonResult[] | null) => void;
  location: string;
  setLocation: (location: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [deviceSpecs, setDeviceSpecs] = useState<DeviceSpecs | null>(null);
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[] | null>(null);
  const [location, setLocation] = useState<string>('Bengaluru');

  return (
    <AppContext.Provider
      value={{
        deviceType,
        setDeviceType,
        deviceSpecs,
        setDeviceSpecs,
        priceEstimate,
        setPriceEstimate,
        comparisonResults,
        setComparisonResults,
        location,
        setLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};