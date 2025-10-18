# MetaLaunch Web Application

A Next.js-based web application for funding token launches on the MetaDAO platform.

## Features

- 🔗 Support for Phantom, Solflare, and other Solana wallets
- 💰 Real-time Launch information and funding progress
- 📊 Display personal investment records
- ⚡ Fast transaction confirmation
- 🎨 Modern UI design
- 💝 Donation banner with project support

## Quick Start

### 1. Install Dependencies

**One command to install everything (including SDK):**

```bash
npm install --legacy-peer-deps
```

> 🎉 **New!** The SDK will be automatically built during installation. No need to manually build it first!

### 2. Configure Environment Variables

Copy and modify the environment variables file if needed:

```bash
cp .env.local .env.local.example  # Optional: modify default configuration
```

Environment variables:
- `NEXT_PUBLIC_SOLANA_RPC_URL`: Solana RPC endpoint (default: mainnet-beta)
- `NEXT_PUBLIC_DEFAULT_LAUNCH_ADDRESS`: Default Launch address

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

> The SDK will be automatically built before starting the dev server.

### 4. Build for Production

```bash
npm run build
npm start
```

> The SDK will be automatically built before the production build.

## Usage Guide

### Connect Wallet

1. Click the "Select Wallet" button in the top right corner
2. Choose your wallet (Phantom, Solflare, etc.)
3. Confirm the connection in your wallet

### Fund a Launch

1. Enter or use the default Launch address, click "Query"
2. View Launch information, including funding progress and status
3. Enter the amount (USDC) in the investment form
4. Click "Confirm Investment" and approve the transaction in your wallet
5. Wait for transaction confirmation and view the result

### View Investment Records

After connecting your wallet, if you've already invested in the Launch, your investment amount will be displayed in the Launch information card.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Wallet Integration**: Solana Wallet Adapter
- **Blockchain**: Solana (@solana/web3.js, @coral-xyz/anchor)
- **SDK**: @metadaoproject/futarchy v0.6

## Project Structure

```
web/
├── app/
│   ├── layout.tsx          # 根布局，包含钱包 provider
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── components/
│   ├── LaunchCard.tsx      # Launch 信息卡片
│   ├── FundForm.tsx        # 投资表单
│   └── TransactionStatus.tsx # 交易状态提示
├── hooks/
│   └── useFundLaunch.ts    # 投资逻辑 Hook
└── lib/
    ├── wallet-context-provider.tsx # Wallet context
    └── launchpad.ts        # LaunchpadClient utilities
```

## Simplified Build Process ⚡

### Before:
```bash
cd sdk
yarn install
yarn build
cd ../web
npm install
npm run build
```

### Now:
```bash
cd web
npm install  # SDK builds automatically! 🎉
npm run dev  # Or npm run build
```

**Automatic SDK building:**
- `npm install` → runs `postinstall` → builds SDK
- `npm run dev` → runs `predev` → ensures SDK is built
- `npm run build` → runs `prebuild` → ensures SDK is built

## Common Issues

### 钱包连接失败

- 确保已安装对应的钱包扩展
- 刷新页面重试
- 检查钱包是否在正确的网络（Mainnet）

### 交易失败

- 确保钱包有足够的 SOL 支付手续费
- 确保钱包有足够的 USDC 进行投资
- 检查 Launch 状态是否允许投资
- 查看浏览器控制台获取详细错误信息

### RPC 连接慢

- 可以在 `.env.local` 中配置更快的 RPC 端点
- 推荐使用 Helius、QuickNode 等服务商的 RPC

## 开发说明

### 类型定义

项目使用 TypeScript，所有类型定义来自：
- `@solana/web3.js`
- `@coral-xyz/anchor`
- `@metadaoproject/futarchy/v0.6`

### 调试

开发模式下，在浏览器控制台可以看到详细的日志信息，包括：
- Launch 信息加载
- 交易提交
- 交易确认
- 错误信息

## 许可证

BSL-1.0
