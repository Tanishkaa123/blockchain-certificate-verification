/* ---------------- TAB SWITCHING ---------------- */

const verifyTab = document.getElementById("verifyTab");
const issueTab = document.getElementById("issueTab");
const verifySection = document.getElementById("verifySection");
const issueSection = document.getElementById("issueSection");

verifyTab.onclick = () => {
  verifyTab.classList.add("active");
  issueTab.classList.remove("active");
  verifySection.style.display = "block";
  issueSection.style.display = "none";
};

issueTab.onclick = () => {
  issueTab.classList.add("active");
  verifyTab.classList.remove("active");
  verifySection.style.display = "none";
  issueSection.style.display = "block";
};

/* ---------------- BLOCKCHAIN CONFIG ---------------- */

const CONTRACT_ADDRESS = "0xb05A6ca2e75F6275c8162727BEa1D1F8d5e0b235";

const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "course", "type": "string" },
      { "internalType": "string", "name": "institution", "type": "string" },
      { "internalType": "uint256", "name": "issueDate", "type": "uint256" }
    ],
    "name": "issueCertificate",
    "outputs": [
      { "internalType": "bytes32", "name": "", "type": "bytes32" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "certHash", "type": "bytes32" }
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

/* ---------------- ISSUE CERTIFICATE ---------------- */

async function issueCertificate() {
  const name = document.getElementById("studentName").value;
  const course = document.getElementById("course").value;
  const institution = document.getElementById("institution").value;
  const date = document.getElementById("issueDate").value;
  const result = document.getElementById("result");

  if (!name || !course || !institution || !date) {
    result.className = "result error";
    result.innerHTML = "❌ Please fill all fields.";
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const unixDate = Math.floor(new Date(date).getTime() / 1000);

    const tx = await contract.issueCertificate(
      name,
      course,
      institution,
      unixDate
    );

    await tx.wait();

    // ✅ EXACT SAME HASH AS SOLIDITY
    const certHash = ethers.keccak256(
      ethers.solidityPacked(
        ["string", "string", "string", "uint256"],
        [name, course, institution, unixDate]
      )
    );

    result.className = "result success";
    result.innerHTML = `
      ✅ Certificate Issued Successfully<br><br>
      <b>Certificate Hash:</b><br>
      <code>${certHash}</code>
    `;

    verifyTab.click();
    document.getElementById("certHash").value = certHash;

  } catch (err) {
    console.error(err);
    result.className = "result error";
    result.innerHTML = "❌ Transaction failed.";
  }
}

/* ---------------- VERIFY CERTIFICATE ---------------- */

async function verifyCertificate() {
  const hash = document.getElementById("certHash").value.trim();
  const result = document.getElementById("result");

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const data = await contract.verifyCertificate(hash);

    if (!data[4]) throw new Error();

    result.className = "result success";
    result.innerHTML = `
      ✅ <b>Certificate Verified</b><br><br>
      <b>Name:</b> ${data[0]}<br>
      <b>Course:</b> ${data[1]}<br>
      <b>Institution:</b> ${data[2]}<br>
      <b>Issue Date:</b> ${new Date(Number(data[3]) * 1000).toDateString()}
    `;
  } catch {
    result.className = "result error";
    result.innerHTML = "❌ Certificate not found or invalid.";
  }
}


