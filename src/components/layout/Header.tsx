import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Smartphone, Laptop, BarChart2, HelpCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { setLocation } = useAppContext();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-teal-600 bg-teal-50'
        : 'text-slate-700 hover:text-teal-600 hover:bg-slate-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 text-transparent bg-clip-text">
                Esti-Check
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/estimate" className={navLinkClass}>
              <div className="flex items-center gap-1">
                <Smartphone className="w-4 h-4" />
                <span>Estimate</span>
              </div>
            </NavLink>
            <NavLink to="/compare" className={navLinkClass}>
              <div className="flex items-center gap-1">
                <Laptop className="w-4 h-4" />
                <span>Compare</span>
              </div>
            </NavLink>
            <NavLink to="/guide" className={navLinkClass}>
              <div className="flex items-center gap-1">
                <HelpCircle className="w-4 h-4" />
                <span>Guide</span>
              </div>
            </NavLink>
            
            {/* Location Selector */}
            <div className="ml-4 relative">
              <select
                className="appearance-none bg-slate-100 border border-slate-200 text-slate-700 py-1 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                onChange={(e) => setLocation(e.target.value)}
                defaultValue="United States"
              >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-slate-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-100 hover:text-teal-600'
              }`
            }
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/estimate"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-100 hover:text-teal-600'
              }`
            }
            onClick={closeMenu}
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span>Estimate</span>
            </div>
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-100 hover:text-teal-600'
              }`
            }
            onClick={closeMenu}
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-5 h-5" />
              <span>Compare</span>
            </div>
          </NavLink>
          <NavLink
            to="/guide"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-100 hover:text-teal-600'
              }`
            }
            onClick={closeMenu}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              <span>Guide</span>
            </div>
          </NavLink>
          
          {/* Mobile Location Selector */}
          <div className="px-3 py-2">
            <label htmlFor="mobile-location" className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <select
              id="mobile-location"
              className="w-full appearance-none bg-slate-100 border border-slate-200 text-slate-700 py-2 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onChange={(e) => setLocation(e.target.value)}
              defaultValue="Bengaluru"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;