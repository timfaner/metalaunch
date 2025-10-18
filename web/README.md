# MetaLaunch Web 应用

基于 Next.js 的 MetaDAO Launch 投资平台网页应用。

## 功能特性

- 🔗 支持 Phantom、Solflare、Backpack 等 Solana 钱包
- 💰 实时查看 Launch 信息和筹款进度
- 📊 显示个人投资记录
- ⚡ 快速确认交易
- 🎨 现代化 UI 设计

## 快速开始

### 1. 安装依赖

```bash
npm install --legacy-peer-deps
```

### 2. 配置环境变量

复制并修改环境变量文件：

```bash
cp .env.local .env.local.example  # 如需修改默认配置
```

环境变量说明：
- `NEXT_PUBLIC_SOLANA_RPC_URL`: Solana RPC 端点（默认：mainnet-beta）
- `NEXT_PUBLIC_DEFAULT_LAUNCH_ADDRESS`: 默认 Launch 地址

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

### 连接钱包

1. 点击页面右上角的"选择钱包"按钮
2. 选择你使用的钱包（Phantom、Solflare 等）
3. 在钱包中确认连接

### 投资 Launch

1. 输入或使用默认的 Launch 地址，点击"查询"
2. 查看 Launch 信息，包括筹款进度和状态
3. 在投资表单中输入金额（USDC）
4. 点击"确认投资"并在钱包中确认交易
5. 等待交易确认，查看交易结果

### 查看投资记录

连接钱包后，如果你已经投资过该 Launch，会在 Launch 信息卡片中显示你的投资金额。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **钱包集成**: Solana Wallet Adapter
- **区块链**: Solana (@solana/web3.js, @coral-xyz/anchor)
- **SDK**: @metadaoproject/futarchy v0.6

## 项目结构

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
    ├── wallet-context-provider.tsx # 钱包上下文
    └── launchpad.ts        # LaunchpadClient 工具函数
```

## 常见问题

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
