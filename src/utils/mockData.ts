import { 
  DeviceSpecs, 
  PriceEstimate, 
  ComparisonResult,
  PlatformPrice,

} from '../types/index.tsx';

// Helper function to generate a random number within a range
const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate a random price within a range
const generateRandomPrice = (basePrice: number, variance: number): number => {
  const minPrice = basePrice - (basePrice * variance);
  const maxPrice = basePrice + (basePrice * variance);
  return Math.round(randomInRange(minPrice, maxPrice) / 100) * 100; // Round to nearest 100
};

// Generate a base price based on device specs
const calculateBasePrice = (specs: DeviceSpecs): number => {
  let basePrice = 0;
  
  // Base price by device type and brand (in INR)
  switch (specs.brand.toLowerCase()) {
    case 'apple':
      basePrice = 60000;
      break;
    case 'samsung':
      basePrice = 50000;
      break;
    case 'google':
      basePrice = 45000;
      break;
    default:
      basePrice = 35000;
  }

  // Adjust for storage
  if (specs.storage) {
    if (specs.storage >= 512) {
      basePrice += 15000;
    } else if (specs.storage >= 256) {
      basePrice += 8000;
    } else if (specs.storage >= 128) {
      basePrice += 4000;
    }
  }

  // Adjust for RAM
  if (specs.ram) {
    if (specs.ram >= 12) {
      basePrice += 12000;
    } else if (specs.ram >= 8) {
      basePrice += 8000;
    } else if (specs.ram >= 6) {
      basePrice += 4000;
    }
  }

  // Adjust for age (newer = more expensive)
  const currentYear = new Date().getFullYear();
  const ageAdjustment = (currentYear - specs.releaseYear) * -8000;
  basePrice += ageAdjustment;

  // Adjust for condition
  switch (specs.condition) {
    case 'new':
      // No adjustment for new
      break;
    case 'like-new':
      basePrice *= 0.9; // 10% reduction
      break;
    case 'good':
      basePrice *= 0.8; // 20% reduction
      break;
    case 'fair':
      basePrice *= 0.6; // 40% reduction
      break;
    case 'poor':
      basePrice *= 0.4; // 60% reduction
      break;
  }

  // Ensure minimum price
  return Math.max(basePrice, 5000);
};

// Generate mock platform prices
const generatePlatformPrices = (basePrice: number): PlatformPrice[] => {
  const platforms = ['Amazon', 'Flipkart', 'Croma', 'Reliance Digital', 'Vijay Sales', 'Samsung Store', 'Apple Store'];
  const selectedPlatforms = platforms.slice(0, randomInRange(3, 5));
  
  return selectedPlatforms.map(platform => ({
    platform,
    price: generateRandomPrice(basePrice, 0.15),
    url: '#',
    inStock: Math.random() > 0.2, // 80% chance of being in stock
  }));
};

// Generate mock price history
const generatePriceHistory = (basePrice: number): { date: string; price: number }[] => {
  const history = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const priceVariance = 1 + (Math.random() * 0.1 - 0.05) * i; // Random price fluctuation
    
    history.push({
      date: `${months[monthIndex]} ${new Date().getFullYear()}`,
      price: Math.round(basePrice * priceVariance),
    });
  }
  
  return history;
};

// Generate reasonability factors
const generateReasonabilityFactors = (specs: DeviceSpecs, ) => {
  const factors = [];
  const currentYear = new Date().getFullYear();
  
  // Age factor
  const deviceAge = currentYear - specs.releaseYear;
  if (deviceAge <= 1) {
    factors.push({
      factor: 'Recent Release',
      impact: 'positive' as const,
      description: 'This device was released recently, which maintains its value.',
    });
  } else if (deviceAge <= 3) {
    factors.push({
      factor: 'Moderately Recent',
      impact: 'neutral' as const,
      description: `This device is ${deviceAge} years old, which slightly impacts its value.`,
    });
  } else {
    factors.push({
      factor: 'Older Model',
      impact: 'negative' as const,
      description: `This device is ${deviceAge} years old, which significantly reduces its value.`,
    });
  }

  // Condition factor
  if (specs.condition === 'new' || specs.condition === 'like-new') {
    factors.push({
      factor: `${specs.condition === 'new' ? 'New' : 'Like New'} Condition`,
      impact: 'positive' as const,
      description: `The excellent condition increases the device's value.`,
    });
  } else if (specs.condition === 'good') {
    factors.push({
      factor: 'Good Condition',
      impact: 'neutral' as const,
      description: `The good condition has a moderate impact on the device's value.`,
    });
  } else {
    factors.push({
      factor: `${specs.condition === 'fair' ? 'Fair' : 'Poor'} Condition`,
      impact: 'negative' as const,
      description: `The ${specs.condition} condition significantly reduces the device's value.`,
    });
  }

  // Brand factor
  if (['apple', 'samsung'].includes(specs.brand.toLowerCase())) {
    factors.push({
      factor: 'Premium Brand',
      impact: 'positive' as const,
      description: `${specs.brand} devices typically retain their value better than other brands.`,
    });
  }

  // Storage/RAM factor
  if (specs.storage && specs.storage >= 256) {
    factors.push({
      factor: 'High Storage Capacity',
      impact: 'positive' as const,
      description: `${specs.storage}GB storage is above average and increases value.`,
    });
  }

  // Market trend factor (random)
  const marketTrends = [
    {
      factor: 'High Demand',
      impact: 'positive' as const,
      description: 'This model is currently in high demand, which increases its value.',
    },
    {
      factor: 'New Model Released',
      impact: 'negative' as const,
      description: 'A newer model was recently released, reducing this device\'s value.',
    },
    {
      factor: 'Market Saturation',
      impact: 'negative' as const,
      description: 'Many similar devices are available, creating downward price pressure.',
    },
    {
      factor: 'Limited Availability',
      impact: 'positive' as const,
      description: 'This model has limited availability, which increases its value.',
    },
  ];
  
  factors.push(marketTrends[randomInRange(0, marketTrends.length - 1)]);
  
  return factors;
};

// Generate a mock price estimate
export const generateMockPriceEstimate = (specs: DeviceSpecs): PriceEstimate => {
  const basePrice = calculateBasePrice(specs);
  const estimatedPrice = generateRandomPrice(basePrice, 0.05);
  const platformPrices = generatePlatformPrices(estimatedPrice);
  const minPlatformPrice = Math.min(...platformPrices.map(p => p.price));
  
  // Calculate reasonability score based on how close the price is to the estimated fair value
  const priceDifference = minPlatformPrice / estimatedPrice;
  let reasonabilityScore = 0;
  let reasonabilityVerdict: 'excellent' | 'good' | 'fair' | 'poor' | 'overpriced' = 'fair';
  
  if (priceDifference <= 0.85) {
    reasonabilityScore = randomInRange(90, 100);
    reasonabilityVerdict = 'excellent';
  } else if (priceDifference <= 0.95) {
    reasonabilityScore = randomInRange(75, 89);
    reasonabilityVerdict = 'good';
  } else if (priceDifference <= 1.05) {
    reasonabilityScore = randomInRange(60, 74);
    reasonabilityVerdict = 'fair';
  } else if (priceDifference <= 1.15) {
    reasonabilityScore = randomInRange(40, 59);
    reasonabilityVerdict = 'poor';
  } else {
    reasonabilityScore = randomInRange(20, 39);
    reasonabilityVerdict = 'overpriced';
  }
  
  const reasonabilityFactors = generateReasonabilityFactors(specs, );
  const priceHistory = generatePriceHistory(estimatedPrice);
  
  // Future price predictions (trending down for tech)
  const threeMonthsPrice = estimatedPrice * (Math.random() > 0.2 ? 0.9 : 1.05); // 80% chance of price decrease
  const sixMonthsPrice = threeMonthsPrice * (Math.random() > 0.3 ? 0.85 : 1.03); // 70% chance of further decrease
  
  return {
    estimatedPrice,
    priceRange: {
      min: Math.round(estimatedPrice * 0.9),
      max: Math.round(estimatedPrice * 1.1),
    },
    reasonabilityScore,
    reasonabilityVerdict,
    reasonabilityFactors,
    platformPrices,
    priceHistory,
    pricePrediction: {
      threeMonths: Math.round(threeMonthsPrice),
      sixMonths: Math.round(sixMonthsPrice),
    },
  };
};

// Generate mock comparison results
export const generateMockComparisonResults = (specs: DeviceSpecs): ComparisonResult[] => {
  const results: ComparisonResult[] = [];
  const basePrice = calculateBasePrice(specs);
  
  // Generate 3-5 comparison devices
  const numDevices = randomInRange(3, 5);
  
  for (let i = 0; i < numDevices; i++) {
    const isBetterDevice = Math.random() > 0.5;
    const price = isBetterDevice 
      ? generateRandomPrice(basePrice, 0.2) + randomInRange(5000, 15000) 
      : generateRandomPrice(basePrice, 0.2) - randomInRange(5000, 15000);
    
    // Generate specs based on the original device
    const comparisonSpecs: DeviceSpecs = {
      ...specs,
      model: `Model ${String.fromCharCode(65 + i)}`, // A, B, C, etc.
      releaseYear: specs.releaseYear + (Math.random() > 0.5 ? 1 : 0),
      condition: 'new',
    };
    
    if (specs.ram) {
      comparisonSpecs.ram = isBetterDevice 
        ? specs.ram + (Math.random() > 0.5 ? 2 : 4) 
        : Math.max(2, specs.ram - (Math.random() > 0.5 ? 2 : 0));
    }
    
    if (specs.storage) {
      comparisonSpecs.storage = isBetterDevice 
        ? specs.storage * 2 
        : specs.storage / (Math.random() > 0.5 ? 1 : 2);
    }
    
    if (specs.processor) {
      comparisonSpecs.processor = isBetterDevice 
        ? `${specs.processor} Plus` 
        : `${specs.processor} Lite`;
    }
    
    // Generate pros and cons
    const pros = [];
    const cons = [];
    
    if (isBetterDevice) {
      pros.push('Better performance', 'Longer battery life', 'Better camera', 'More storage', 'Newer model');
      cons.push('Higher price', 'Heavier', 'Less compact');
    } else {
      pros.push('More affordable', 'Lighter weight', 'More compact', 'Better value');
      cons.push('Lower performance', 'Shorter battery life', 'Less storage', 'Older model');
    }
    
    // Shuffle and take a subset
    const shuffledPros = pros.sort(() => 0.5 - Math.random()).slice(0, randomInRange(2, 4));
    const shuffledCons = cons.sort(() => 0.5 - Math.random()).slice(0, randomInRange(2, 3));
    
    // Calculate recommendation score
    const recommendationScore = isBetterDevice 
      ? randomInRange(75, 95) 
      : randomInRange(55, 75);
    
    results.push({
      deviceName: `${comparisonSpecs.model}`,
      brand: comparisonSpecs.brand,
      specs: comparisonSpecs,
      price,
      pros: shuffledPros,
      cons: shuffledCons,
      recommendationScore,
    });
  }
  
  return results;
};