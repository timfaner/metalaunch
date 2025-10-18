'use client';

import { useState } from 'react';
import { useFundLaunch } from '@/hooks/useFundLaunch';
import { LaunchCard } from '@/components/LaunchCard';
import { FundForm } from '@/components/FundForm';
import { TransactionStatus } from '@/components/TransactionStatus';
import { DonationBanner } from '@/components/DonationBanner';

export default function Home() {
  const [launchAddress, setLaunchAddress] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_LAUNCH_ADDRESS || ''
  );
  const [inputAddress, setInputAddress] = useState(launchAddress);

  const {
    launchInfo,
    userFunding,
    loading,
    error,
    txSignature,
    fund,
  } = useFundLaunch(launchAddress);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunchAddress(inputAddress);
  };

  const handleFund = async (amount: number) => {
    await fund(amount);
  };

  const clearNotification = () => {
    // 这里可以添加清除通知的逻辑
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Donation Banner */}
      <DonationBanner />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MetaLaunch
              </h1>
              <p className="text-sm text-gray-600 mt-1">Fund Token Launch Projects</p>
            </div>
            <div className="flex items-center gap-4">
              {/* GitHub Link */}
              <a
                href="https://github.com/timfaner/metalaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                title="View on GitHub"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">GitHub</span>
              </a>
              {/* Wallet button injected in layout */}
              <div className="wallet-adapter-button-wrapper"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Launch Address Input */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div>
              <label htmlFor="launch-address" className="block text-sm font-medium text-gray-700 mb-2">
                Launch Address
              </label>
              <div className="flex gap-3">
                <input
                  id="launch-address"
                  type="text"
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                  placeholder="Enter Launch address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Query
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Launch Information */}
          <div>
            <LaunchCard
              launchInfo={launchInfo}
              userFunding={userFunding}
              loading={loading}
            />
          </div>

          {/* Fund Form */}
          <div>
            <FundForm
              onSubmit={handleFund}
              loading={loading}
              disabled={!launchInfo}
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
            </div>
            <p className="text-sm text-gray-600">
              Built on Solana blockchain, all transactions are transparent and traceable
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Fast Confirmation</h3>
            </div>
            <p className="text-sm text-gray-600">
              Transactions confirmed in seconds, view your investment status instantly
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Low Fees</h3>
            </div>
            <p className="text-sm text-gray-600">
              Enjoy Solana's low transaction costs
            </p>
          </div>
        </div>
      </main>

      {/* Transaction Status Notification */}
      <TransactionStatus
        signature={txSignature}
        error={error}
        onClose={clearNotification}
      />
    </div>
  );
}
