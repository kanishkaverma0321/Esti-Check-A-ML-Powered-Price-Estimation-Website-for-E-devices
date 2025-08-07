import React, { useState } from 'react';
import { PriceEstimate, DeviceSpecs } from '../../types';
import { ArrowDown, ArrowUp, Minus, ExternalLink, DollarSign, BarChart2, Check, X, Clock } from 'lucide-react';

interface PriceEstimateResultProps {
  estimate: PriceEstimate;
  deviceSpecs: DeviceSpecs;
}

const PriceEstimateResult: React.FC<PriceEstimateResultProps> = ({ estimate, deviceSpecs }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'platforms' | 'trends'>('overview');

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-teal-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-orange-500';
      case 'overpriced':
        return 'text-red-500';
      default:
        return 'text-slate-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {deviceSpecs.brand} {deviceSpecs.model}
            </h2>
            <p className="text-slate-300 text-sm">
              {deviceSpecs.releaseYear} • {deviceSpecs.condition.replace('-', ' ')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{formatCurrency(estimate.estimatedPrice)}</div>
            <div className="text-sm text-slate-300">
              Range: {formatCurrency(estimate.priceRange.min)} - {formatCurrency(estimate.priceRange.max)}
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Banner */}
      <div className={`py-3 px-6 flex items-center justify-between border-b border-slate-200 ${
        estimate.reasonabilityVerdict === 'excellent' || estimate.reasonabilityVerdict === 'good'
          ? 'bg-green-50'
          : estimate.reasonabilityVerdict === 'fair'
          ? 'bg-yellow-50'
          : 'bg-red-50'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            estimate.reasonabilityVerdict === 'excellent' || estimate.reasonabilityVerdict === 'good'
              ? 'bg-green-100'
              : estimate.reasonabilityVerdict === 'fair'
              ? 'bg-yellow-100'
              : 'bg-red-100'
          }`}>
            {estimate.reasonabilityVerdict === 'excellent' || estimate.reasonabilityVerdict === 'good' ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : estimate.reasonabilityVerdict === 'fair' ? (
              <Minus className="w-5 h-5 text-yellow-600" />
            ) : (
              <X className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div>
            <div className={`font-semibold capitalize ${getVerdictColor(estimate.reasonabilityVerdict)}`}>
              {estimate.reasonabilityVerdict} Deal
            </div>
            <div className="text-sm text-slate-600">
              {estimate.reasonabilityScore}/100 reasonability score
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium text-slate-700">Lowest Price:</div>
          <div className="text-teal-600 font-medium">{formatCurrency(Math.min(...estimate.platformPrices.map(p => p.price)))}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center gap-1 ${
              activeTab === 'overview'
                ? 'text-teal-600 border-b-2 border-teal-500'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center gap-1 ${
              activeTab === 'platforms'
                ? 'text-teal-600 border-b-2 border-teal-500'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('platforms')}
          >
            <DollarSign className="w-4 h-4" />
            <span>Where to Buy</span>
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center gap-1 ${
              activeTab === 'trends'
                ? 'text-teal-600 border-b-2 border-teal-500'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('trends')}
          >
            <Clock className="w-4 h-4" />
            <span>Price Trends</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Reasonability Factors</h3>
              <div className="space-y-3">
                {estimate.reasonabilityFactors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className={`mt-0.5 flex-shrink-0 ${
                      factor.impact === 'positive'
                        ? 'text-green-500'
                        : factor.impact === 'negative'
                        ? 'text-red-500'
                        : 'text-slate-500'
                    }`}>
                      {factor.impact === 'positive' ? (
                        <ArrowUp className="w-5 h-5" />
                      ) : factor.impact === 'negative' ? (
                        <ArrowDown className="w-5 h-5" />
                      ) : (
                        <Minus className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">{factor.factor}</div>
                      <p className="text-sm text-slate-600">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Specs Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(deviceSpecs)
                  .filter(([key]) => !['additionalFeatures', 'model', 'brand', 'condition'].includes(key))
                  .map(([key, value]) => {
                    if (value === undefined || value === null || value === '') return null;
                    return (
                      <div key={key} className="flex justify-between p-2 border-b border-slate-100">
                        <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium text-slate-700">
                          {typeof value === 'number' && key === 'ram'
                            ? `${value} GB`
                            : typeof value === 'number' && key === 'storage'
                            ? `${value} GB`
                            : typeof value === 'number' && key === 'screenSize'
                            ? `${value}"`
                            : value}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Price Prediction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">In 3 months</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium text-slate-800">
                      {formatCurrency(estimate.pricePrediction.threeMonths)}
                    </span>
                    {estimate.pricePrediction.threeMonths < estimate.estimatedPrice ? (
                      <span className="text-green-500 flex items-center text-sm">
                        <ArrowDown className="w-4 h-4" />
                        {Math.round(((estimate.estimatedPrice - estimate.pricePrediction.threeMonths) / estimate.estimatedPrice) * 100)}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center text-sm">
                        <ArrowUp className="w-4 h-4" />
                        {Math.round(((estimate.pricePrediction.threeMonths - estimate.estimatedPrice) / estimate.estimatedPrice) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">In 6 months</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium text-slate-800">
                      {formatCurrency(estimate.pricePrediction.sixMonths)}
                    </span>
                    {estimate.pricePrediction.sixMonths < estimate.estimatedPrice ? (
                      <span className="text-green-500 flex items-center text-sm">
                        <ArrowDown className="w-4 h-4" />
                        {Math.round(((estimate.estimatedPrice - estimate.pricePrediction.sixMonths) / estimate.estimatedPrice) * 100)}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center text-sm">
                        <ArrowUp className="w-4 h-4" />
                        {Math.round(((estimate.pricePrediction.sixMonths - estimate.estimatedPrice) / estimate.estimatedPrice) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'platforms' && (
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Where to Buy</h3>
            <div className="space-y-4">
              {estimate.platformPrices
                .sort((a, b) => a.price - b.price)
                .map((platform, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 rounded-lg border ${
                      index === 0 ? 'border-teal-200 bg-teal-50' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {index === 0 && (
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-teal-600" />
                        </div>
                      )}
                      <div>
                        <div className={`font-medium ${index === 0 ? 'text-teal-700' : 'text-slate-700'}`}>
                          {platform.platform}
                          {index === 0 && <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Best Price</span>}
                        </div>
                        <div className="text-sm text-slate-500">{platform.inStock ? 'In Stock' : 'Out of Stock'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-medium ${index === 0 ? 'text-teal-700' : 'text-slate-700'}`}>
                        {formatCurrency(platform.price)}
                      </div>
                      {platform.url && (
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg ${
                            index === 0
                              ? 'bg-teal-500 hover:bg-teal-600 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Price History & Trends</h3>
            
            <div className="mb-6">
              <div className="h-64 bg-slate-50 rounded-lg p-4 flex items-center justify-center">
                <p className="text-slate-500 text-center">Price history chart visualization would be displayed here</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Recent Price Changes</h4>
                <div className="space-y-2">
                  {estimate.priceHistory.map((history, index) => (
                    <div key={index} className="flex justify-between p-2 border-b border-slate-100">
                      <span className="text-slate-600">{history.date}</span>
                      <span className="font-medium">{formatCurrency(history.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Should You Buy Now?</h4>
                <div className="p-4 bg-slate-50 rounded-lg">
                  {estimate.pricePrediction.threeMonths < estimate.estimatedPrice ? (
                    <p className="text-slate-700">
                      Prices are expected to drop by approximately{' '}
                      <span className="font-medium text-red-600">
                        {Math.round(((estimate.estimatedPrice - estimate.pricePrediction.threeMonths) / estimate.estimatedPrice) * 100)}%
                      </span>{' '}
                      in the next 3 months. If you can wait, you might get a better deal.
                    </p>
                  ) : (
                    <p className="text-slate-700">
                      Prices are expected to increase by approximately{' '}
                      <span className="font-medium text-green-600">
                        {Math.round(((estimate.pricePrediction.threeMonths - estimate.estimatedPrice) / estimate.estimatedPrice) * 100)}%
                      </span>{' '}
                      in the next 3 months. Now might be a good time to buy.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceEstimateResult;