import { AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { LaunchpadClient } from '@metadaoproject/futarchy/v0.6';

/**
 * 创建 AnchorProvider 实例
 */
export function createProvider(connection: Connection, wallet: Wallet): AnchorProvider {
  return new AnchorProvider(connection, wallet, {
    commitment: 'confirmed',
    preflightCommitment: 'confirmed',
  });
}

/**
 * 创建 LaunchpadClient 实例
 */
export function createLaunchpadClient(provider: AnchorProvider): LaunchpadClient {
  return LaunchpadClient.createClient({ provider });
}

/**
 * 格式化 USDC 金额（6位小数）
 */
export function formatUSDC(amount: number): string {
  return (amount / 1_000000).toFixed(2);
}

/**
 * 将 USDC 转换为链上金额
 */
export function parseUSDC(amount: number): number {
  return amount * 1_000000;
}

/**
 * 缩短地址显示
 */
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

