import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Tv, Monitor, Camera } from 'lucide-react';
import { DeviceType } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface DeviceTypeSelectorProps {
  onSelect: (type: DeviceType) => void;
}

const DeviceTypeSelector: React.FC<DeviceTypeSelectorProps> = ({ onSelect }) => {
  const { setDeviceType } = useAppContext();
  const navigate = useNavigate();

  const deviceTypes = [
    { type: 'smartphone' as DeviceType, name: 'Smartphone', icon: <Smartphone className="w-6 h-6" /> },
    { type: 'laptop' as DeviceType, name: 'Laptop', icon: <Laptop className="w-6 h-6" /> },
    { type: 'tablet' as DeviceType, name: 'Tablet', icon: <Tablet className="w-6 h-6" /> },
    { type: 'smartwatch' as DeviceType, name: 'Smartwatch', icon: <Watch className="w-6 h-6" /> },
    { type: 'headphones' as DeviceType, name: 'Headphones', icon: <Headphones className="w-6 h-6" /> },
    { type: 'desktop' as DeviceType, name: 'Desktop', icon: <Monitor className="w-6 h-6" /> },
    { type: 'tv' as DeviceType, name: 'TV', icon: <Tv className="w-6 h-6" /> },
    { type: 'camera' as DeviceType, name: 'Camera', icon: <Camera className="w-6 h-6" /> },
  ];

  const handleSelect = (type: DeviceType) => {
    setDeviceType(type);
    onSelect(type);
    // Update URL with selected device type
    navigate(`/estimate?type=${type}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Device Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {deviceTypes.map((device) => (
          <button
            key={device.type}
            onClick={() => handleSelect(device.type)}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-slate-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-200 group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-teal-100 mb-2 transition-all duration-200">
              <div className="text-slate-600 group-hover:text-teal-600 transition-colors duration-200">
                {device.icon}
              </div>
            </div>
            <span className="text-sm font-medium text-slate-700">{device.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeviceTypeSelector;