import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeviceTypeSelector from '../components/estimation/DeviceTypeSelector.tsx';
import DeviceSpecsForm from '../components/estimation/DeviceSpecsForm.tsx';
import PriceEstimateResult from '../components/estimation/PriceEstimateResult.tsx';
import SimilarDevicesComparison from '../components/comparison/SimilarDevicesComparison.tsx';
import { DeviceType, DeviceSpecs, ComparisonResult } from '../types';
import { useAppContext } from '../context/AppContext.tsx';
import { generateMockPriceEstimate, generateMockComparisonResults } from '../utils/mockData';

const EstimationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    deviceType, 
    setDeviceType,
    deviceSpecs,
    setDeviceSpecs,
    priceEstimate,
    setPriceEstimate,
    comparisonResults,
    setComparisonResults
  } = useAppContext();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'type' | 'specs' | 'result'>('type');

  // Check for device type in URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type') as DeviceType | null;
    
    if (typeParam && ['smartphone', 'laptop', 'tablet', 'smartwatch', 'headphones', 'desktop', 'camera', 'tv'].includes(typeParam)) {
      setDeviceType(typeParam);
      setCurrentStep('specs');
    }
  }, [location.search, setDeviceType]);

  const handleDeviceTypeSelect = (type: DeviceType) => {
    setDeviceType(type);
    setCurrentStep('specs');
  };

  const handleSpecsSubmit = (specs: DeviceSpecs) => {
    setIsLoading(true);
    setDeviceSpecs(specs);
    
    // Simulate API call
    setTimeout(() => {
      const mockEstimate = generateMockPriceEstimate(specs);
      const mockComparisons = generateMockComparisonResults(specs);
      
      setPriceEstimate(mockEstimate);
      setComparisonResults(mockComparisons);
      setIsLoading(false);
      setCurrentStep('result');
    }, 1500);
  };

  const handleReset = () => {
    setDeviceType(null);
    setDeviceSpecs(null);
    setPriceEstimate(null);
    setComparisonResults(null);
    setCurrentStep('type');
    navigate('/estimate');
  };

  const handleViewDetails = (device: ComparisonResult) => {
    // In a real app, this would navigate to a detailed comparison page
    console.log('View details for:', device);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Price Estimation Tool</h1>
          <p className="text-slate-600">
            Get accurate price estimates for your electronic devices based on specifications, 
            condition, and current market trends.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'type' 
                  ? 'bg-teal-500 text-white' 
                  : currentStep === 'specs' || currentStep === 'result'
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </div>
              <span className={`text-sm mt-2 ${
                currentStep === 'type' ? 'text-teal-600 font-medium' : 'text-slate-600'
              }`}>
                Device Type
              </span>
            </div>
            
            <div className="flex-1 h-0.5 mx-4 bg-slate-200">
              <div className={`h-full bg-teal-500 transition-all duration-300 ${
                currentStep === 'specs' || currentStep === 'result' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'specs' 
                  ? 'bg-teal-500 text-white' 
                  : currentStep === 'result'
                  ? 'bg-teal-100 text-teal-700'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </div>
              <span className={`text-sm mt-2 ${
                currentStep === 'specs' ? 'text-teal-600 font-medium' : 'text-slate-600'
              }`}>
                Specifications
              </span>
            </div>
            
            <div className="flex-1 h-0.5 mx-4 bg-slate-200">
              <div className={`h-full bg-teal-500 transition-all duration-300 ${
                currentStep === 'result' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'result' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </div>
              <span className={`text-sm mt-2 ${
                currentStep === 'result' ? 'text-teal-600 font-medium' : 'text-slate-600'
              }`}>
                Results
              </span>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="mt-8">
          {currentStep === 'type' && (
            <DeviceTypeSelector onSelect={handleDeviceTypeSelect} />
          )}

          {currentStep === 'specs' && deviceType && (
            <DeviceSpecsForm deviceType={deviceType} onSubmit={handleSpecsSubmit} />
          )}

          {currentStep === 'result' && deviceSpecs && priceEstimate && (
            <div className="space-y-8">
              <PriceEstimateResult estimate={priceEstimate} deviceSpecs={deviceSpecs} />
              
              {comparisonResults && comparisonResults.length > 0 && (
                <SimilarDevicesComparison 
                  currentDevice={{ specs: deviceSpecs, price: priceEstimate.estimatedPrice }}
                  comparisonResults={comparisonResults}
                  onViewDetails={handleViewDetails}
                />
              )}
              
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-all duration-200"
                >
                  Start New Estimate
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600">Analyzing device specifications and market data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimationPage;