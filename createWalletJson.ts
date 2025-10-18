import bs58 from "bs58";
import fs from "fs";
import { Keypair } from "@solana/web3.js";
import * as readline from "readline";
import path from "path";

/**
 * 从 Phantom 导出的私钥创建 wallet.json 文件
 * 
 * 使用方法：
 * 
 * 方式 1 - 从文件读取（推荐）:
 *   1. 将私钥保存到 key.txt 文件
 *   2. 运行: npx ts-node scripts/utils/createWalletJson.ts key.txt
 *   3. 自动生成 wallet.json
 * 
 * 方式 2 - 交互式输入:
 *   1. 运行: npx ts-node scripts/utils/createWalletJson.ts
 *   2. 粘贴私钥
 *   3. 指定输出文件路径
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

function createWalletFromPrivateKey(
  privateKeyInput: string,
  outputPath: string,
): void {
  // 解码 Base58 私钥
  const privateKeyBytes = bs58.decode(privateKeyInput.trim());

  // 从私钥创建 Keypair
  const keypair = Keypair.fromSecretKey(privateKeyBytes);

  // 将 Keypair 转换为 JSON 数组格式
  const secretKeyArray = Array.from(keypair.secretKey);

  // 写入文件
  fs.writeFileSync(outputPath, JSON.stringify(secretKeyArray));

  console.log();
  console.log("✅ wallet.json 文件创建成功！");
  console.log("📁 文件路径:", path.resolve(outputPath));
  console.log("🔑 公钥地址:", keypair.publicKey.toString());
  console.log();
  console.log("💡 使用方法：");
  console.log(`   在 .env 文件中设置：`);
  console.log(`   ANCHOR_WALLET=${outputPath}`);
  console.log();
  console.log("⚠️  重要提醒：");
  console.log("   - 请将此文件添加到 .gitignore");
  console.log("   - 不要将此文件提交到 Git 仓库");
  console.log("   - 不要分享此文件给任何人");
}

async function main() {
  console.log("=".repeat(60));
  console.log("📝 从 Phantom 私钥创建 wallet.json 文件");
  console.log("=".repeat(60));
  console.log();
  console.log("⚠️  安全提醒：");
  console.log("   - 私钥是敏感信息，请妥善保管");
  console.log("   - 不要在公共场所或不安全的网络上操作");
  console.log("   - 创建的 wallet.json 文件包含完整的私钥信息");
  console.log();

  // 检查是否提供了命令行参数（私钥文件路径）
  const args = process.argv.slice(2);
  const inputFilePath = args[0];
  const outputFilePath = args[1] || "./wallet.json";

  try {
    if (inputFilePath) {
      // 方式 1: 从文件读取私钥
      console.log("📂 从文件读取模式");
      console.log("📄 输入文件:", inputFilePath);
      console.log();

      if (!fs.existsSync(inputFilePath)) {
        console.error(`❌ 错误：文件 ${inputFilePath} 不存在`);
        process.exit(1);
      }

      // 读取私钥文件
      const privateKeyInput = fs.readFileSync(inputFilePath, "utf-8");

      if (!privateKeyInput.trim()) {
        console.error("❌ 错误：私钥文件为空");
        process.exit(1);
      }

      // 检查输出文件是否已存在
      if (fs.existsSync(outputFilePath)) {
        console.log(`⚠️  文件 ${outputFilePath} 已存在，将被覆盖`);
      }

      // 创建钱包
      createWalletFromPrivateKey(privateKeyInput, outputFilePath);

      console.log();
      console.log("🗑️  安全建议：删除私钥文件");
      console.log(`   rm ${inputFilePath}`);
    } else {
      // 方式 2: 交互式输入
      console.log("⌨️  交互式输入模式");
      console.log();

      // 获取私钥
      const privateKeyInput = await question(
        "请输入从 Phantom 导出的私钥 (Base58 格式): ",
      );

      if (!privateKeyInput) {
        console.error("❌ 错误：私钥不能为空");
        rl.close();
        process.exit(1);
      }

      // 获取输出文件路径
      const defaultPath = "./wallet.json";
      const outputPath = await question(
        `请输入输出文件路径 (默认: ${defaultPath}): `,
      );
      const filePath = outputPath || defaultPath;

      // 检查文件是否已存在
      if (fs.existsSync(filePath)) {
        const overwrite = await question(
          `⚠️  文件 ${filePath} 已存在，是否覆盖? (y/N): `,
        );
        if (overwrite.toLowerCase() !== "y") {
          console.log("❌ 操作已取消");
          rl.close();
          process.exit(0);
        }
      }

      // 创建钱包
      createWalletFromPrivateKey(privateKeyInput, filePath);
      rl.close();
    }
  } catch (error) {
    console.error("❌ 错误：私钥格式无效");
    console.error("   请确保你输入的是从 Phantom 导出的完整 Base58 私钥");
    console.error("   错误详情:", error.message);
    rl.close();
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ 发生错误:", error);
  rl.close();
  process.exit(1);
});

