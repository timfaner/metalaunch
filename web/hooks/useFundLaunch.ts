import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useState, useCallback, useEffect } from 'react';
import { createProvider, createLaunchpadClient, parseUSDC } from '@/lib/launchpad';
import BN from 'bn.js';
import { Launch, FundingRecord } from '@metadaoproject/futarchy/v0.6';

export interface LaunchInfo {
  address: PublicKey;
  state: any;
  totalCommittedAmount: number;
  minimumRaiseAmount: number;
  baseMint: PublicKey;
  quoteMint: PublicKey;
}

export interface UserFundingInfo {
  committedAmount: number;
  hasFunded: boolean;
}

export function useFundLaunch(launchAddress: string | null) {
  const { connection } = useConnection();
  const wallet = useWallet();
  
  const [launchInfo, setLaunchInfo] = useState<LaunchInfo | null>(null);
  const [userFunding, setUserFunding] = useState<UserFundingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  // 获取 Launch 信息
  const fetchLaunchInfo = useCallback(async () => {
    if (!launchAddress) return;

    try {
      setLoading(true);
      setError(null);

      const launch = new PublicKey(launchAddress);
      const provider = createProvider(connection, wallet as any);
      const launchpadClient = createLaunchpadClient(provider);

      const launchAccount = await launchpadClient.fetchLaunch(launch);

      if (!launchAccount) {
        throw new Error('Launch 账户不存在');
      }

      setLaunchInfo({
        address: launch,
        state: launchAccount.state,
        totalCommittedAmount: launchAccount.totalCommittedAmount.toNumber(),
        minimumRaiseAmount: launchAccount.minimumRaiseAmount.toNumber(),
        baseMint: launchAccount.baseMint,
        quoteMint: launchAccount.quoteMint,
      });

      // 如果钱包已连接，获取用户投资信息
      if (wallet.publicKey) {
        const fundingRecordAddr = launchpadClient.getFundingRecordAddress({
          launch,
          funder: wallet.publicKey,
        });
        
        const fundingRecord = await launchpadClient.fetchFundingRecord(fundingRecordAddr);
        
        if (fundingRecord) {
          setUserFunding({
            committedAmount: fundingRecord.committedAmount.toNumber(),
            hasFunded: true,
          });
        } else {
          setUserFunding({
            committedAmount: 0,
            hasFunded: false,
          });
        }
      }
    } catch (err: any) {
      console.error('获取 Launch 信息失败:', err);
      setError(err.message || '获取信息失败');
    } finally {
      setLoading(false);
    }
  }, [launchAddress, connection, wallet]);

  // 执行投资
  const fund = useCallback(async (amountUSDC: number) => {
    if (!launchAddress || !wallet.publicKey || !wallet.signTransaction) {
      throw new Error('请先连接钱包');
    }

    if (!launchInfo) {
      throw new Error('Launch 信息未加载');
    }

    try {
      setLoading(true);
      setError(null);
      setTxSignature(null);

      const launch = new PublicKey(launchAddress);
      const provider = createProvider(connection, wallet as any);
      const launchpadClient = createLaunchpadClient(provider);

      const fundAmount = new BN(parseUSDC(amountUSDC));

      console.log('正在提交投资交易...');
      console.log('投资金额:', amountUSDC, 'USDC');

      const fundTx = await launchpadClient
        .fundIx({
          launch,
          amount: fundAmount,
          quoteMint: launchInfo.quoteMint,
        })
        .rpc();

      setTxSignature(fundTx);
      console.log('交易签名:', fundTx);

      // 等待交易确认
      await connection.confirmTransaction(fundTx, 'confirmed');
      console.log('交易已确认');

      // 刷新信息
      await fetchLaunchInfo();

      return fundTx;
    } catch (err: any) {
      console.error('投资失败:', err);
      const errorMessage = err.message || '投资失败，请重试';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [launchAddress, launchInfo, wallet, connection, fetchLaunchInfo]);

  // 当 launch 地址或钱包改变时，自动获取信息
  useEffect(() => {
    if (launchAddress) {
      fetchLaunchInfo();
    }
  }, [launchAddress, wallet.publicKey]);

  return {
    launchInfo,
    userFunding,
    loading,
    error,
    txSignature,
    fund,
    refresh: fetchLaunchInfo,
  };
}

