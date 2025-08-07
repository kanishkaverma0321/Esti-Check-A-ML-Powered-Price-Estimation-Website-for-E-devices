export type DeviceType = 'smartphone' | 'laptop' | 'tablet' | 'smartwatch' | 'headphones' | 'desktop' | 'camera' | 'tv';

export interface DeviceSpecs {
  brand: string;
  model: string;
  releaseYear: number;
  processor?: string;
  ram?: number;
  storage?: number;
  screenSize?: number;
  resolution?: string;
  camera?: string;
  battery?: number;
  operatingSystem?: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  additionalFeatures?: string[];
  [key: string]: any;
}

export interface PlatformPrice {
  platform: string;
  price: number;
  url?: string;
  inStock: boolean;
}

export interface PriceEstimate {
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  reasonabilityScore: number; // 0-100
  reasonabilityVerdict: 'excellent' | 'good' | 'fair' | 'poor' | 'overpriced';
  reasonabilityFactors: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
  platformPrices: PlatformPrice[];
  priceHistory: {
    date: string;
    price: number;
  }[];
  pricePrediction: {
    threeMonths: number;
    sixMonths: number;
  };
}

export interface ComparisonResult {
  deviceName: string;
  brand: string;
  specs: DeviceSpecs;
  price: number;
  image?: string;
  pros: string[];
  cons: string[];
  recommendationScore: number; // 0-100
}

export interface TechTrend {
  feature: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  impact: number; // 0-100
  description: string;
}

export interface LocationFactor {
  location: string;
  priceMultiplier: number;
  taxRate: number;
  availability: 'high' | 'medium' | 'low';
  notes: string;
}