'use client';

import { useState, useEffect } from 'react';

export function DonationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has previously closed the banner
    const bannerClosed = localStorage.getItem('donationBannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('donationBannerClosed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold">
                Support this project! 
              </p>
              <p className="text-xs sm:text-sm opacity-90 mt-1">
                Donate SOL or USDC: <span className="font-mono font-bold">4BR3NWV3jiq17TEXT273iZLRkXQuyzBgbmZo1E7toHHZ</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 flex-shrink-0 text-white hover:text-gray-200 transition-colors"
            aria-label="Close banner"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

