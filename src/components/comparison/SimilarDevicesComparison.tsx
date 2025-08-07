import React from 'react';
import { ComparisonResult, DeviceSpecs } from '../../types';
import { ChevronRight, Check, X, } from 'lucide-react';

interface SimilarDevicesComparisonProps {
  currentDevice: {
    specs: DeviceSpecs;
    price: number;
  };
  comparisonResults: ComparisonResult[];
  onViewDetails: (device: ComparisonResult) => void;
}

const SimilarDevicesComparison: React.FC<SimilarDevicesComparisonProps> = ({
  currentDevice,
  comparisonResults,
  onViewDetails,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Sort by recommendation score descending
  const sortedResults = [...comparisonResults].sort((a, b) => b.recommendationScore - a.recommendationScore);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
      <div className="bg-slate-800 text-white p-6">
        <h2 className="text-xl font-bold">Similar Devices Comparison</h2>
        <p className="text-slate-300 text-sm">
          Compare {currentDevice.specs.brand} {currentDevice.specs.model} with similar alternatives
        </p>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-sm font-semibold text-slate-700">Device</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700">Price</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700">Key Specs</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700">Pros & Cons</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700">Score</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700"></th>
              </tr>
            </thead>
            <tbody>
              {/* Current Device */}
              <tr className="border-b border-slate-100 bg-teal-50">
                <td className="p-3">
                  <div className="font-medium text-teal-700">
                    {currentDevice.specs.brand} {currentDevice.specs.model}
                    <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Current</span>
                  </div>
                  <div className="text-sm text-slate-500">{currentDevice.specs.releaseYear}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium text-teal-700">{formatCurrency(currentDevice.price)}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-slate-600 space-y-1">
                    {currentDevice.specs.processor && <div>Processor: {currentDevice.specs.processor}</div>}
                    {currentDevice.specs.ram && <div>RAM: {currentDevice.specs.ram} GB</div>}
                    {currentDevice.specs.storage && <div>Storage: {currentDevice.specs.storage} GB</div>}
                    {currentDevice.specs.screenSize && <div>Screen: {currentDevice.specs.screenSize}"</div>}
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-slate-600">
                    <span className="italic">Your selected device</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm font-medium text-teal-700">-</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-teal-700">-</div>
                </td>
              </tr>

              {/* Comparison Results */}
              {sortedResults.map((device, index) => (
                <tr key={index} className={`border-b border-slate-100 ${index === 0 ? 'bg-slate-50' : ''}`}>
                  <td className="p-3">
                    <div className="font-medium text-slate-700">
                      {device.brand} {device.deviceName}
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-500">{device.specs.releaseYear}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-slate-700">{formatCurrency(device.price)}</div>
                    <div className="text-xs text-slate-500">
                      {device.price < currentDevice.price ? (
                        <span className="text-green-600">
                          Save {formatCurrency(currentDevice.price - device.price)}
                        </span>
                      ) : device.price > currentDevice.price ? (
                        <span className="text-orange-600">
                          +{formatCurrency(device.price - currentDevice.price)}
                        </span>
                      ) : (
                        <span>Same price</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-slate-600 space-y-1">
                      {device.specs.processor && <div>Processor: {device.specs.processor}</div>}
                      {device.specs.ram && <div>RAM: {device.specs.ram} GB</div>}
                      {device.specs.storage && <div>Storage: {device.specs.storage} GB</div>}
                      {device.specs.screenSize && <div>Screen: {device.specs.screenSize}"</div>}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div className="mb-2">
                        {device.pros.slice(0, 2).map((pro, i) => (
                          <div key={i} className="flex items-center gap-2 text-green-600">
                            <Check className="w-3 h-3 flex-shrink-0" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        {device.cons.slice(0, 2).map((con, i) => (
                          <div key={i} className="flex items-center gap-2 text-red-600">
                            <X className="w-3 h-3 flex-shrink-0" />
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div
                      className={`text-sm font-medium ${
                        device.recommendationScore > 80
                          ? 'text-green-600'
                          : device.recommendationScore > 60
                          ? 'text-teal-600'
                          : 'text-orange-600'
                      }`}
                    >
                      {device.recommendationScore}/100
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => onViewDetails(device)}
                      className="text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SimilarDevicesComparison;