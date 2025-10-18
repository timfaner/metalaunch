# MetaLaunch 投资工具

本项目用于在 MetaDAO 平台上进行代币发射（Launch）投资。

## 前置要求

### 1. 安装 Node.js

建议安装 Node.js 22 或更高版本。

**macOS/Linux (使用 nvm):**
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # 或 source ~/.zshrc

# 安装 Node.js
nvm install 22
nvm use 22

# 验证安装
node --version
npm --version
```

**Windows:**
从 [Node.js 官网](https://nodejs.org/) 下载安装器并运行。

### 2. 安装 Anchor CLI

Anchor 是 Solana 的智能合约开发框架。

**macOS/Linux:**
```bash
# 使用 avm (Anchor Version Manager) 安装
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# 验证安装
anchor --version
```

**使用预编译二进制 (推荐):**
```bash
# 下载最新版本
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# 验证安装
anchor --version
```

**注意:** 如果没有安装 Rust，需要先安装：
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

## 安装依赖

### 1. 构建 SDK

```bash
cd sdk/
yarn install
yarn build
```

### 2. 安装项目依赖

```bash
cd ../
yarn install
```

## 配置钱包

### 导入或创建钱包

运行以下命令创建或导入钱包：

```bash
npx ts-node createWalletJson.ts
```

按照提示输入您的私钥或创建新钱包。钱包信息会保存在 `wallet.json` 文件中。

## 使用说明

### 投资 Launch

使用以下命令进行投资，参数为投资金额（单位：美元）：

```bash
# 投资 1 美元
npx ts-node fundLaunch.ts 1

# 投资 100 美元
npx ts-node fundLaunch.ts 100

# 投资其他金额
npx ts-node fundLaunch.ts <金额>
```

## 注意事项

- 请确保钱包中有足够的 SOL 用于交易手续费
- 投资前请仔细确认 Launch 项目信息
- 请妥善保管 `wallet.json` 文件，不要泄露给他人
- 建议将 `wallet.json` 和 `.env` 添加到 `.gitignore` 避免上传到代码仓库

## 故障排查

### 找不到 anchor 命令
确保已正确安装 Anchor CLI 并将其添加到 PATH 环境变量中。

### TypeScript 编译错误
确保已在 sdk 目录下运行 `yarn build` 构建 SDK。

### 连接错误
检查网络连接，确保可以访问 Solana RPC 节点。