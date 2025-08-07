import React, { useState, useEffect } from 'react';
import { DeviceType, DeviceSpecs } from '../../types';
import { useAppContext } from '../../context/AppContext.tsx';
import { ChevronRight,  } from 'lucide-react';

interface DeviceSpecsFormProps {
  deviceType: DeviceType;
  onSubmit: (specs: DeviceSpecs) => void;
}

const DeviceSpecsForm: React.FC<DeviceSpecsFormProps> = ({ deviceType, onSubmit }) => {
  const {location} = useAppContext();
  const [specs, setSpecs] = useState<DeviceSpecs>({
    brand: '',
    model: '',
    releaseYear: new Date().getFullYear(),
    condition: 'new',
    additionalFeatures: [],
  });

  // Reset form when device type changes
  useEffect(() => {
    setSpecs({
      brand: '',
      model: '',
      releaseYear: new Date().getFullYear(),
      condition: 'new',
      additionalFeatures: [],
    });
  }, [deviceType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpecs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecs((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(specs);
  };

  // Get brand options based on device type
  const getBrandOptions = () => {
    switch (deviceType) {
      case 'smartphone':
        return ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Huawei', 'Motorola', 'Sony', 'LG', 'Other'];
      case 'laptop':
        return ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Microsoft', 'Acer', 'MSI', 'Razer', 'Other'];
      case 'tablet':
        return ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Amazon', 'Huawei', 'Google', 'Other'];
      case 'smartwatch':
        return ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Fossil', 'Huawei', 'Amazfit', 'Other'];
      case 'headphones':
        return ['Apple', 'Sony', 'Bose', 'Sennheiser', 'JBL', 'Samsung', 'Beats', 'Jabra', 'Other'];
      default:
        return ['Apple', 'Samsung', 'Sony', 'LG', 'Other'];
    }
  };

  // Render device-specific fields
  const renderDeviceSpecificFields = () => {
    switch (deviceType) {
      case 'smartphone':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Processor</label>
              <input
                type="text"
                name="processor"
                value={specs.processor || ''}
                onChange={handleChange}
                placeholder="e.g., Apple A16, Snapdragon 8 Gen 2"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">RAM (GB)</label>
                <input
                  type="number"
                  name="ram"
                  value={specs.ram || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 8"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Storage (GB)</label>
                <input
                  type="number"
                  name="storage"
                  value={specs.storage || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 128"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Screen Size (inches)</label>
                <input
                  type="number"
                  name="screenSize"
                  step="0.1"
                  value={specs.screenSize || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 6.1"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Camera</label>
                <input
                  type="text"
                  name="camera"
                  value={specs.camera || ''}
                  onChange={handleChange}
                  placeholder="e.g., 48MP main, 12MP ultra-wide"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Operating System</label>
              <select
                name="operatingSystem"
                value={specs.operatingSystem || ''}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select OS</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        );
      case 'laptop':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Processor</label>
              <input
                type="text"
                name="processor"
                value={specs.processor || ''}
                onChange={handleChange}
                placeholder="e.g., Intel Core i7-12700H, Apple M2"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">RAM (GB)</label>
                <input
                  type="number"
                  name="ram"
                  value={specs.ram || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 16"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Storage (GB)</label>
                <input
                  type="number"
                  name="storage"
                  value={specs.storage || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 512"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Screen Size (inches)</label>
                <input
                  type="number"
                  name="screenSize"
                  step="0.1"
                  value={specs.screenSize || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 13.3"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Graphics</label>
                <input
                  type="text"
                  name="graphics"
                  value={specs.graphics || ''}
                  onChange={handleChange}
                  placeholder="e.g., NVIDIA RTX 3060, Integrated"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Operating System</label>
              <select
                name="operatingSystem"
                value={specs.operatingSystem || ''}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select OS</option>
                <option value="macOS">macOS</option>
                <option value="Windows">Windows</option>
                <option value="Linux">Linux</option>
                <option value="Chrome OS">Chrome OS</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        );
      // Add cases for other device types as needed
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 transition-all duration-300">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Enter Device Specifications</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Brand *</label>
            <select
              name="brand"
              value={specs.brand}
              onChange={handleChange}
              required
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Brand</option>
              {getBrandOptions().map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Model *</label>
            <input
              type="text"
              name="model"
              value={specs.model}
              onChange={handleChange}
              required
              placeholder={`e.g., ${deviceType === 'smartphone' ? 'iPhone 14 Pro' : deviceType === 'laptop' ? 'MacBook Pro' : 'Model Name'}`}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Release Year *</label>
            <input
              type="number"
              name="releaseYear"
              value={specs.releaseYear}
              onChange={handleNumberChange}
              required
              min="2000"
              max={new Date().getFullYear() + 1}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Condition *</label>
            <select
              name="condition"
              value={specs.condition}
              onChange={handleChange}
              required
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Device-specific fields */}
        {renderDeviceSpecificFields()}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>Get Estimate</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceSpecsForm;