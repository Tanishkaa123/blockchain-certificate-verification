const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    // 1. Deploy Contract
    const CertificateVerification = await hre.ethers.getContractFactory("CertificateVerification");
    const contract = await CertificateVerification.deploy();
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log(`CertificateVerification deployed to: ${contractAddress}`);

    // 2. Issue Certificate
    console.log("\nIssuing sample certificate...");
    const name = "John Doe";
    const course = "Blockchain 101";
    const institution = "Hardhat University";
    const date = Math.floor(Date.now() / 1000);

    // Send transaction
    const tx = await contract.issueCertificate(name, course, institution, date);
    const receipt = await tx.wait();

    // 3. Capture Hash (from events)
    // The event is: event CertificateIssued(bytes32 indexed certHash, string studentName);
    // We need to parse the logs to find this event.
    let certHash;
    for (const log of receipt.logs) {
        try {
            const parsedLog = contract.interface.parseLog(log);
            if (parsedLog.name === "CertificateIssued") {
                certHash = parsedLog.args.certHash;
                break;
            }
        } catch (e) {
            // Ignore logs that don't match the interface
        }
    }

    console.log(`Certificate issued! Hash: ${certHash}`);

    // 4. Verify Certificate
    console.log("\nVerifying certificate...");
    const result = await contract.verifyCertificate(certHash);

    console.log("Verification Result:");
    console.log(`- Name: ${result[0]}`);
    console.log(`- Course: ${result[1]}`);
    console.log(`- Institution: ${result[2]}`);
    console.log(`- Issue Date: ${new Date(Number(result[3]) * 1000).toLocaleString()}`);
    console.log(`- Valid: ${result[4]}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
