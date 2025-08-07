import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Tablet, Watch, Headphones, ChevronRight, IndianRupee, BarChart, Check, Shield } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="block">Know the Real Value</span>
                <span className="block text-teal-400">of Your Tech</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                Get accurate price estimates and reasonability analysis for any electronic device.
                Make informed decisions with our advanced comparison tools and market insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/estimate"
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <IndianRupee className="w-5 h-5" />
                  <span>Estimate Now</span>
                </Link>
                <Link
                  to="/guide"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 backdrop-blur-sm"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 transform rotate-3 transition-all duration-500 hover:rotate-0">
                <div className="absolute top-2 left-2 right-2 h-2 bg-gradient-to-r from-teal-400/40 to-teal-600/40 rounded-t-xl blur-sm"></div>
                <div className="p-4 bg-white/5 rounded-xl mb-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">iPhone 14 Pro</h3>
                    <span className="text-teal-400 font-bold">₹89,999</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Market Average:</span>
                      <span>₹94,999</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reasonability:</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Excellent Deal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Price:</span>
                      <span>Flipkart (₹89,999)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Price Trend</h4>
                      <p className="text-xs text-slate-300">Expected to drop 5% in 3 months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Recommendation</h4>
                      <p className="text-xs text-slate-300">Good time to buy if you need it now</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Estimate Prices by Device Type</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select the type of device you want to get a price estimate for. We support a wide range of electronic devices.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Smartphones', icon: <Smartphone className="w-8 h-8" />, type: 'smartphone' },
              { name: 'Laptops', icon: <Laptop className="w-8 h-8" />, type: 'laptop' },
              { name: 'Tablets', icon: <Tablet className="w-8 h-8" />, type: 'tablet' },
              { name: 'Smartwatches', icon: <Watch className="w-8 h-8" />, type: 'smartwatch' },
              { name: 'Headphones', icon: <Headphones className="w-8 h-8" />, type: 'headphones' },
              { name: 'View All', icon: <ChevronRight className="w-8 h-8" />, type: '' }
            ].map((device, index) => (
              <Link
                key={index}
                to={device.type ? `/estimate?type=${device.type}` : '/estimate'}
                className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border border-slate-200 hover:border-slate-300 hover:shadow-md group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-200 group-hover:bg-teal-100 mb-4 transition-all duration-200">
                  <div className="text-slate-700 group-hover:text-teal-600 transition-colors duration-200">
                    {device.icon}
                  </div>
                </div>
                <h3 className="font-medium text-slate-800">{device.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose Esti-Check</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform offers comprehensive tools for evaluating the true value of your electronic devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Accurate Price Estimates',
                description: 'Get precise price estimates based on device specifications, market trends, and regional factors.',
                icon: <IndianRupee className="w-6 h-6" />
              },
              {
                title: 'Reasonability Analysis',
                description: 'Understand if a price is fair with our detailed reasonability verdict and supporting factors.',
                icon: <BarChart className="w-6 h-6" />
              },
              {
                title: 'Smart Recommendations',
                description: 'Receive personalized recommendations on when to buy, where to find the best deals, and alternative options.',
                icon: <Shield className="w-6 h-6" />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-100 text-teal-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to discover the true value of your tech?</h2>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            Start using our estimation tools today and make informed decisions about your electronic devices.
          </p>
          <Link
            to="/estimate"
            className="px-8 py-4 bg-white text-teal-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Get Started</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;