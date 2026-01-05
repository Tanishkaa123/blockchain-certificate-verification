const CONTRACT_ADDRESS = "0x3c6b8668cE33c7CD58D1C9903fEc6da4405A692e";

const ABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "_certHash", "type": "bytes32" }
    ],
    "name": "verifyCertificate",
    "outputs": [
      { "type": "string" },
      { "type": "string" },
      { "type": "string" },
      { "type": "uint256" },
      { "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function verifyCertificate() {
  const hash = document.getElementById("certHash").value.trim();
  const result = document.getElementById("result");

  if (!hash) {
    result.className = "result error";
    result.innerHTML = "❌ Please enter a certificate hash.";
    return;
  }

  if (!window.ethereum) {
    result.className = "result error";
    result.innerHTML = "❌ MetaMask not detected.";
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    // 🔑 SAFEST conversion
    const bytes32Hash = ethers.zeroPadValue(hash, 32);

    const data = await contract.verifyCertificate(bytes32Hash);

    if (!data[4]) throw new Error("Invalid certificate");

    result.className = "result success";
    result.innerHTML = `
      ✅ <b>Certificate Verified</b><br><br>
      <b>Name:</b> ${data[0]}<br>
      <b>Course:</b> ${data[1]}<br>
      <b>Institution:</b> ${data[2]}<br>
      <b>Issue Date:</b> ${new Date(Number(data[3]) * 1000).toDateString()}<br>
      <b>Status:</b> Valid
    `;
  } catch (err) {
    result.className = "result error";
    result.innerHTML = "❌ Certificate not found or invalid.";
  }
}
