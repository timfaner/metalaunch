'use client';

import { LaunchInfo, UserFundingInfo } from '@/hooks/useFundLaunch';
import { formatUSDC, shortenAddress } from '@/lib/launchpad';

interface LaunchCardProps {
  launchInfo: LaunchInfo | null;
  userFunding: UserFundingInfo | null;
  loading: boolean;
}

export function LaunchCard({ launchInfo, userFunding, loading }: LaunchCardProps) {
  if (loading && !launchInfo) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!launchInfo) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
        Enter a Launch address to view information
      </div>
    );
  }

  const totalCommitted = formatUSDC(launchInfo.totalCommittedAmount);
  const minRaise = formatUSDC(launchInfo.minimumRaiseAmount);
  const progress = (launchInfo.totalCommittedAmount / launchInfo.minimumRaiseAmount) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Launch Information</h2>
        <p className="text-sm text-gray-500 font-mono">
          {shortenAddress(launchInfo.address.toString(), 6)}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Funding Progress</span>
            <span className="text-sm font-semibold text-gray-900">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Raised: <span className="font-bold text-gray-900">{totalCommitted} USDC</span>
            </span>
            <span className="text-gray-600">
              Goal: <span className="font-bold text-gray-900">{minRaise} USDC</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <p className="text-lg font-semibold text-gray-900">
              {JSON.stringify(launchInfo.state)}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Base Token</p>
            <p className="text-xs font-mono text-gray-900">
              {shortenAddress(launchInfo.baseMint.toString())}
            </p>
          </div>
        </div>

        {userFunding && userFunding.hasFunded && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-600 mb-1">Your Investment</p>
            <p className="text-2xl font-bold text-green-700">
              {formatUSDC(userFunding.committedAmount)} USDC
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

