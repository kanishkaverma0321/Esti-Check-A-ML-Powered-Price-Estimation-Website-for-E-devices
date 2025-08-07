import React, { useState } from 'react';
import { ArrowRight, Plus, Smartphone, Laptop, Trash2 } from 'lucide-react';
import { DeviceType, DeviceSpecs } from '../types';
import DeviceSpecsForm from '../components/estimation/DeviceSpecsForm.tsx';
import { useNavigate } from 'react-router-dom';

const ComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Array<{ type: DeviceType; specs: DeviceSpecs | null }>>([]);
  const [currentDeviceType, setCurrentDeviceType] = useState<DeviceType | null>(null);
  const [isAddingDevice, setIsAddingDevice] = useState<boolean>(false);

  const handleAddDevice = () => {
    setIsAddingDevice(true);
    setCurrentDeviceType('smartphone');
  };

  const handleDeviceTypeChange = (type: DeviceType) => {
    setCurrentDeviceType(type);
  };

  const handleSpecsSubmit = (specs: DeviceSpecs) => {
    if (currentDeviceType) {
      setDevices([...devices, { type: currentDeviceType, specs }]);
      setIsAddingDevice(false);
      setCurrentDeviceType(null);
    }
  };

  const handleRemoveDevice = (index: number) => {
    const newDevices = [...devices];
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

  const handleCompare = () => {
    // In a real app, this would navigate to a comparison results page
    // For now, we'll just redirect to the estimation page
    navigate('/estimate');
  };

  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Device Comparison Tool</h1>
          <p className="text-slate-600">
            Compare multiple electronic devices side-by-side to find the best option for your needs and budget.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Devices to Compare</h2>

          {devices.length > 0 ? (
            <div className="space-y-4 mb-6">
              {devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-700">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {device.specs?.brand} {device.specs?.model}
                      </div>
                      <div className="text-sm text-slate-500">
                        {device.type} • {device.specs?.releaseYear}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveDevice(index)}
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg mb-6">
              <p className="text-slate-500 mb-4">No devices added yet. Add devices to compare them.</p>
            </div>
          )}

          {devices.length > 0 && !isAddingDevice && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleCompare}
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                disabled={devices.length < 2}
              >
                <span>Compare Devices</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {!isAddingDevice ? (
            <div className="flex justify-center">
              <button
                onClick={handleAddDevice}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Device</span>
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Add a Device</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Device Type</label>
                <select
                  value={currentDeviceType || ''}
                  onChange={(e) => handleDeviceTypeChange(e.target.value as DeviceType)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="smartphone">Smartphone</option>
                  <option value="laptop">Laptop</option>
                  <option value="tablet">Tablet</option>
                  <option value="smartwatch">Smartwatch</option>
                  <option value="headphones">Headphones</option>
                </select>
              </div>
              
              {currentDeviceType && (
                <DeviceSpecsForm deviceType={currentDeviceType} onSubmit={handleSpecsSubmit} />
              )}
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsAddingDevice(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-all duration-200 mr-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">How Comparison Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-3">1</div>
              <h3 className="font-medium text-slate-800 mb-2">Add Devices</h3>
              <p className="text-slate-600 text-sm">
                Add the devices you want to compare by specifying their type, brand, model, and key specifications.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-3">2</div>
              <h3 className="font-medium text-slate-800 mb-2">Compare Features</h3>
              <p className="text-slate-600 text-sm">
                Our system will analyze and compare key features, performance metrics, and value for money across all devices.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-3">3</div>
              <h3 className="font-medium text-slate-800 mb-2">Get Recommendations</h3>
              <p className="text-slate-600 text-sm">
                Receive personalized recommendations based on your needs, budget constraints, and feature preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;