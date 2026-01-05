const hre = require("hardhat");

async function main() {
  const CertificateVerification = await hre.ethers.getContractFactory("CertificateVerification");
  const contract = await CertificateVerification.deploy();

  await contract.waitForDeployment();

  console.log(
    `CertificateVerification deployed to: ${await contract.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
