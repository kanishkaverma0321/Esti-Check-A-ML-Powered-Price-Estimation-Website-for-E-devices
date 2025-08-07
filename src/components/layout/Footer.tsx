import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, BarChart2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-1.5 rounded-lg">
                <BarChart2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Esti-Check</span>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Get accurate price estimates and reasonability verdicts for all your electronic devices.
              Compare prices across platforms and make informed purchasing decisions.
            </p>
            <div className="flex space-x-4 text-slate-300">
              <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors duration-200">
                <Mail size={18} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/estimate" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Price Estimation
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Device Comparison
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  User Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Device Types */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Device Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/estimate?type=smartphone" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/estimate?type=laptop" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/estimate?type=tablet" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Tablets
                </Link>
              </li>
              <li>
                <Link to="/estimate?type=smartwatch" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link to="/estimate?type=headphones" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Headphones
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-teal-400 text-sm transition-colors duration-200">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Esti-Check. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;