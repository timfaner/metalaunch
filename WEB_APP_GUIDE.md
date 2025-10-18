# MetaLaunch 网页版使用指南

## 项目概述

已成功创建基于 Next.js 的 MetaLaunch 网页应用，用户可以通过 Phantom、Solflare 等 Solana 钱包在 MetaDAO 平台上投资代币发射项目（Launch）。

## 目录结构

```
web/
├── app/
│   ├── layout.tsx                      # 根布局，包含钱包 provider
│   ├── page.tsx                        # 主页面（投资界面）
│   └── globals.css                     # 全局样式
├── components/
│   ├── LaunchCard.tsx                  # Launch 信息展示卡片
│   ├── FundForm.tsx                    # 投资表单组件
│   ├── TransactionStatus.tsx           # 交易状态提示组件
│   └── WalletButton.tsx                # 钱包连接按钮
├── hooks/
│   └── useFundLaunch.ts                # 投资逻辑自定义 Hook
├── lib/
│   ├── wallet-context-provider.tsx     # 钱包上下文 Provider
│   └── launchpad.ts                    # LaunchpadClient 工具函数
├── next.config.ts                      # Next.js 配置
├── package.json                        # 项目依赖
├── .env.local                          # 环境变量配置
└── README.md                           # 详细文档

```

## 功能特性

✅ **钱包集成**
- 支持 Phantom 钱包
- 支持 Solflare 钱包
- 自动连接功能
- 美观的钱包选择界面

✅ **Launch 信息展示**
- 实时查询 Launch 状态
- 显示筹款进度条
- 显示当前总投资金额和目标金额
- 显示用户个人投资记录
- Base Token 和 Quote Token 信息

✅ **投资功能**
- USDC 金额输入
- 快速金额选择按钮（10/50/100/500）
- 实时交易状态显示
- 交易成功后自动刷新数据
- 交易链接（Solscan）

✅ **用户体验**
- 现代简约的 UI 设计
- 渐变色背景和按钮
- 响应式布局（移动端友好）
- 加载状态动画
- 友好的错误提示

## 快速开始

### 1. 进入 web 目录

```bash
cd web
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 3. 连接钱包

1. 点击页面右上角的"选择钱包"按钮
2. 选择 Phantom 或 Solflare 钱包
3. 在钱包弹窗中确认连接

### 4. 投资 Launch

1. 输入 Launch 地址（或使用默认地址）
2. 点击"查询"按钮获取 Launch 信息
3. 查看筹款进度和项目详情
4. 在投资表单中输入金额（USDC）
5. 点击"确认投资"
6. 在钱包中确认交易
7. 等待交易确认

## 环境配置

`.env.local` 文件配置：

```env
# Solana RPC 端点（可选配置更快的 RPC）
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# 默认 Launch 地址
NEXT_PUBLIC_DEFAULT_LAUNCH_ADDRESS=2rYvdtK8ovuSziJuy5gTTPtviY5CfTnW6Pps4pk7ehEq
```

推荐的 RPC 服务商：
- **Helius**: https://www.helius.dev/
- **QuickNode**: https://www.quicknode.com/
- **Alchemy**: https://www.alchemy.com/

## 技术栈

- **Next.js 14**: React 框架（App Router）
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **Solana Wallet Adapter**: 钱包集成
- **@solana/web3.js**: Solana 交互
- **@coral-xyz/anchor**: Solana 程序框架
- **@metadaoproject/futarchy**: MetaDAO SDK

## 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 常见问题

### Q: 钱包连接失败？
A: 
- 确保已安装 Phantom 或 Solflare 浏览器扩展
- 刷新页面重试
- 检查钱包是否在 Mainnet 网络

### Q: 投资交易失败？
A:
- 确保钱包有足够的 SOL 支付手续费（约 0.001-0.01 SOL）
- 确保钱包有足够的 USDC
- 检查 Launch 状态是否允许投资
- 查看浏览器控制台的详细错误信息

### Q: 如何查看我的投资记录？
A: 连接钱包后，系统会自动显示你在当前 Launch 的投资金额

### Q: 交易很慢？
A: 
- 可能是 RPC 端点较慢，建议在 `.env.local` 中配置付费 RPC
- Solana 网络拥堵时交易确认会变慢

## 安全建议

⚠️ **重要提示**：
- 投资前请仔细确认 Launch 地址
- 不要在不信任的网站上连接钱包
- 确认交易信息后再在钱包中签名
- 妥善保管钱包私钥

## 开发调试

在浏览器开发者工具的控制台中可以看到详细日志：
- Launch 信息加载
- 用户投资记录
- 交易提交过程
- 交易确认结果
- 错误详情

## 与命令行版本对比

| 功能 | 命令行版 (fundLaunch.ts) | 网页版 |
|------|-------------------------|--------|
| 钱包连接 | 需要配置 wallet.json | 浏览器扩展钱包 |
| Launch 信息 | 命令行输出 | 可视化卡片展示 |
| 投资操作 | 命令行参数 | 表单输入 |
| 交易查看 | 终端链接 | 点击跳转 Solscan |
| 用户体验 | 技术用户 | 所有用户 |

## 下一步改进

可能的功能扩展：
- [ ] 添加交易历史记录
- [ ] 支持多个 Launch 对比
- [ ] 添加价格预测图表
- [ ] 集成通知系统
- [ ] 添加暗黑模式
- [ ] 多语言支持

## 许可证

BSL-1.0

---

**项目已完成！** 🎉

现在你可以：
1. 启动开发服务器：`cd web && npm run dev`
2. 在浏览器中访问 http://localhost:3000
3. 连接 Phantom 或 Solflare 钱包
4. 开始投资 Launch！

