const connectBtn = document.getElementById("connectBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

// 👉 Replace with your NFT contract address
const contractAddress = "0xYourNFTContractAddress";

// 👉 Minimal ABI (only what we need)
const abi = [
  "function balanceOf(address owner) view returns (uint256)"
];

let provider;
let signer;

connectBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });

      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      const address = await signer.getAddress();
      statusText.innerText = "Connected: " + address;

      validateNFT(address);

    } catch (err) {
      console.log(err);
      statusText.innerText = "Connection failed";
    }
  } else {
    alert("Install MetaMask");
  }
};

async function validateNFT(address) {
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const balance = await contract.balanceOf(address);

    if (balance > 0) {
      statusText.innerText = "NFT Verified ✅";
      downloadBtn.disabled = false;
    } else {
      statusText.innerText = "No NFT Found ❌";
    }

  } catch (err) {
    console.log(err);
    statusText.innerText = "Validation error";
  }
}

downloadBtn.onclick = () => {
  // 👉 Replace with your Excel file path
  window.location.href = "files/secured-file.xlsx";
};