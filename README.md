# 🔐 Blockchain Certificate Verification System

A decentralized application (dApp) to **issue and verify academic certificates** securely using the **Ethereum blockchain**.  
This system ensures certificates are **tamper-proof, transparent, and verifiable**.

---

## 🚀 Features

- ✅ Issue certificates on Ethereum blockchain
- 🔍 Verify certificates using a unique certificate hash
- 🔐 Immutable & tamper-proof records
- 🌐 Deployed on Ethereum **Sepolia Testnet**
- 🎨 Simple and user-friendly frontend

---

## 🛠 Tech Stack

### Blockchain
- Solidity
- Hardhat
- Ethereum (Sepolia Testnet)
- Ethers.js

### Frontend
- HTML
- CSS
- JavaScript
- MetaMask

### Tools
- Git & GitHub
- Etherscan (Contract Verification)

---

## 📜 Smart Contract Details

- **Contract Name:** CertificateVerification  
- **Network:** Ethereum Sepolia  
- **Contract Address:**  
  0xb05A6ca2e75F6275c8162727BEa1D1F8d5e0b235
- **Etherscan Link:**  
https://sepolia.etherscan.io/address/0x3c6b8668cE33c7CD58D1C9903fEc6da4405A692e

---

## ⚙️ How It Works

### 1️⃣ Certificate Issuance
- Admin issues a certificate with:
- Student Name
- Course
- Institution
- Issue Date
- Certificate hash is stored on-chain.

### 2️⃣ Certificate Verification
- User enters certificate hash
- Blockchain is queried
- If valid, certificate details are displayed

---

## 🧪 Example Verified Certificate

- **Name:** Tanishkaa Mathur  
- **Course:** Blockchain Technology  
- **Institution:** VIT-AP University  
- **Status:** ✅ Valid  

---

## 📂 Project Structure
contracts/  
→ Contains Solidity smart contracts for certificate issuance and verification.

scripts/  
→ Hardhat deployment scripts used to deploy contracts to the Sepolia testnet.

frontend/  
→ Frontend UI built using HTML, CSS, and JavaScript to verify certificates.

test/  
→ Test files for smart contract testing.


---

## 🧠 Use Cases

- Universities
- Training Institutes
- Online Certification Platforms
- Employers for certificate verification

---
## 🖥️ Local Setup (Optional)

1. Clone the repository
2. Install dependencies:
   npm install
3. Configure `.env` with Sepolia RPC URL and private key
4. Deploy contract using Hardhat
5. Open `frontend/index.html` in browser

---
## 👩‍💻 Author

**Tanishkaa Mathur**  
B.Tech CSE – VIT-AP University  

---

## 📌 Note

This project is deployed on **testnet** for academic and learning purposes.

