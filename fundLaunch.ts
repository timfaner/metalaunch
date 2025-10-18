import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { LaunchpadClient } from "@metadaoproject/futarchy/v0.6";
import { MAINNET_USDC } from "@metadaoproject/futarchy/v0.6";
import BN from "bn.js";
import dotenv from "dotenv";

dotenv.config();

// ============ 配置参数 ============
// 在这里修改你的 launch 地址
const LAUNCH_ADDRESS = "2rYvdtK8ovuSziJuy5gTTPtviY5CfTnW6Pps4pk7ehEq"; // 替换为实际的 launch 地址
// =================================

const provider = anchor.AnchorProvider.env();
const payer = provider.wallet["payer"];

async function main() {
  // 从命令行参数获取投资金额
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error("❌ 错误: 请提供投资金额");
    console.log("\n使用方法:");
    console.log("  npx ts-node fundLaunch.ts <金额>");
    console.log("\n例如:");
    console.log("  npx ts-node fundLaunch.ts 10    # 投资 10 USDC");
    console.log("  npx ts-node fundLaunch.ts 100   # 投资 100 USDC");
    process.exit(1);
  }

  const FUND_AMOUNT_USDC = parseFloat(args[0]);
  
  if (isNaN(FUND_AMOUNT_USDC) || FUND_AMOUNT_USDC <= 0) {
    console.error("❌ 错误: 投资金额必须是一个正数");
    console.log("你输入的金额:", args[0]);
    process.exit(1);
  }

  console.log("开始执行 Fund Launch 脚本...");
  console.log("使用钱包地址:", payer.publicKey.toString());

  // 创建 LaunchpadClient
  const launchpadClient = LaunchpadClient.createClient({ provider });
  console.log(
    "LaunchpadClient 创建成功, Program ID:",
    launchpadClient.getProgramId().toString(),
  );

  // Launch 地址
  const launch = new PublicKey(LAUNCH_ADDRESS);
  console.log("Launch 地址:", launch.toString());

  // 转换金额 (USDC 使用 6 位小数)
  const fundAmount = new BN(FUND_AMOUNT_USDC * 1_000000);
  console.log("投资金额:", FUND_AMOUNT_USDC, "USDC");
  console.log("原始金额 (lamports):", fundAmount.toString());

  // 获取 launch 信息
  console.log("\n正在获取 Launch 信息...");
  const launchAccount = await launchpadClient.fetchLaunch(launch);

  if (!launchAccount) {
    throw new Error("Launch 账户不存在！");
  }

  console.log("Launch 状态:", JSON.stringify(launchAccount.state));
  console.log(
    "当前总投资金额:",
    launchAccount.totalCommittedAmount.toNumber() / 1_000000,
    "USDC",
  );
  console.log(
    "最小筹款目标:",
    launchAccount.minimumRaiseAmount.toNumber() / 1_000000,
    "USDC",
  );
  console.log("Base Mint:", launchAccount.baseMint.toString());
  console.log("Quote Mint:", launchAccount.quoteMint.toString());

  // 检查用户当前的投资记录
  const fundingRecordAddr = launchpadClient.getFundingRecordAddress({
    launch,
    funder: payer.publicKey,
  });
  const existingFundingRecord =
    await launchpadClient.fetchFundingRecord(fundingRecordAddr);

  if (existingFundingRecord) {
    console.log(
      "\n你已经投资过此 Launch，当前投资金额:",
      existingFundingRecord.committedAmount.toNumber() / 1_000000,
      "USDC",
    );
  } else {
    console.log("\n这是你第一次投资此 Launch");
  }

  // 执行 fund 操作
  console.log("\n正在提交投资交易...");
  const fundTx = await launchpadClient
    .fundIx({
      launch,
      amount: fundAmount,
      quoteMint: launchAccount.quoteMint,
    })
    .rpc();

  console.log("✅ 投资交易成功!");
  console.log("交易签名:", fundTx);
  console.log("交易链接:", `https://solscan.io/tx/${fundTx}`);

  // 确认交易
  console.log("\n等待交易确认...");
  await provider.connection.confirmTransaction(fundTx, "confirmed");
  console.log("✅ 交易已确认");

  // 获取更新后的信息
  console.log("\n获取更新后的信息...");
  const updatedLaunchAccount = await launchpadClient.fetchLaunch(launch);
  console.log(
    "Launch 新的总投资金额:",
    updatedLaunchAccount.totalCommittedAmount.toNumber() / 1_000000,
    "USDC",
  );

  const updatedFundingRecord =
    await launchpadClient.getFundingRecord(fundingRecordAddr);
  console.log(
    "你的总投资金额:",
    updatedFundingRecord.committedAmount.toNumber() / 1_000000,
    "USDC",
  );

  console.log("\n✅ 脚本执行完成!");
}

// 执行主函数
main().catch((error) => {
  console.error("\n❌ 错误:", error);
  if (error.logs) {
    console.error("\n交易日志:");
    error.logs.forEach((log: string) => console.error(log));
  }
  process.exit(1);
});

