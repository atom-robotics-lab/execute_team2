const hre = require("hardhat");

async function main() {
  console.log("Starting deployment process...");

  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("Insufficient balance. Please fund your account with Sepolia ETH first.");
  }

  console.log("Deploying ContentVerification contract...");

  const ContentVerification = await hre.ethers.getContractFactory("ContentVerification");
  console.log("Contract factory created, deploying...");
  
  const contentVerification = await ContentVerification.deploy();
  console.log("Deployment transaction sent, waiting for confirmation...");

  await contentVerification.waitForDeployment();
  const address = await contentVerification.getAddress();

  console.log("ContentVerification deployed to:", address);
  console.log("Deployment complete!");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
}); 