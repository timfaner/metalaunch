import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { LaunchpadClient } from "@metadaoproject/futarchy/v0.6";
import { MAINNET_USDC } from "@metadaoproject/futarchy/v0.6";
import dotenv from "dotenv";

dotenv.config();

// ============ 配置参数 ============
// 在这里修改你的 launch 地址
const LAUNCH_ADDRESS = "2rYvdtK8ovuSziJuy5gTTPtviY5CfTnW6Pps4pk7ehEq"; // 替换为实际的 launch 地址
// =================================

const provider = anchor.AnchorProvider.env();
const payer = provider.wallet["payer"];

async function main() {
  console.log("开始执行 Claim Launch 脚本...");
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

  // 获取 launch 信息
  console.log("\n正在获取 Launch 信息...");
  const launchAccount = await launchpadClient.fetchLaunch(launch);

  if (!launchAccount) {
    throw new Error("Launch 账户不存在！");
  }

  console.log("Launch 状态:", JSON.stringify(launchAccount.state));
  console.log(
    "总投资金额:",
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

  // 检查用户的投资记录
  const fundingRecordAddr = launchpadClient.getFundingRecordAddress({
    launch,
    funder: payer.publicKey,
  });
  const fundingRecord =
    await launchpadClient.fetchFundingRecord(fundingRecordAddr);

  if (!fundingRecord) {
    console.log("\n❌ 错误: 你没有投资过此 Launch，无法认领代币");
    process.exit(1);
  }

  console.log(
    "\n你的投资金额:",
    fundingRecord.committedAmount.toNumber() / 1_000000,
    "USDC",
  );
  
  if (fundingRecord.claimedAmount && fundingRecord.claimedAmount.gt(new anchor.BN(0))) {
    console.log(
      "你已经认领的代币数量:",
      fundingRecord.claimedAmount.toNumber() / 1_000000,
      "代币",
    );
  } else {
    console.log("你还没有认领过代币");
  }

  // 检查 Launch 状态是否可以认领
  const launchState = launchAccount.state;
  if (!('completed' in launchState)) {
    console.log("\n❌ 错误: Launch 还没有完成，无法认领代币");
    console.log("当前状态:", JSON.stringify(launchState));
    process.exit(1);
  }

  // 执行 claim 操作
  console.log("\n正在提交认领交易...");
  const claimTx = await launchpadClient
    .claimIx(launch, launchAccount.baseMint, payer.publicKey)
    .rpc();

  console.log("✅ 认领交易成功!");
  console.log("交易签名:", claimTx);
  console.log("交易链接:", `https://solscan.io/tx/${claimTx}`);

  // 确认交易
  console.log("\n等待交易确认...");
  await provider.connection.confirmTransaction(claimTx, "confirmed");
  console.log("✅ 交易已确认");

  // 获取更新后的信息
  console.log("\n获取更新后的信息...");
  const updatedFundingRecord =
    await launchpadClient.getFundingRecord(fundingRecordAddr);
  
  if (updatedFundingRecord.claimedAmount) {
    console.log(
      "你已认领的代币总数:",
      updatedFundingRecord.claimedAmount.toNumber() / 1_000000,
      "代币",
    );
  }

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

