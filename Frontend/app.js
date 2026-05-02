const connectBtn = document.getElementById("connectBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

// Polygon config
const polygonChainId = "0x89"; // 137 in hex

// 👉 Replace with your NFT contract address
const contractAddress = "0xYourNFTContractAddress";

// 👉 Minimal ABI (only what we need)
const abi = [
  "function balanceOf(address owner) view returns (uint256)"
];

let provider;
let signer;

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider,
    options: {
      rpc: {
        137: "https://polygon-rpc.com" // Polygon network
      }
    }
  }
};
const web3Modal = new Web3Modal.default({
  cacheProvider: false,
  providerOptions
});

connectBtn.onclick = async () => {
  try {
    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    statusText.innerText = "Connected: " + address;

    validateNFT(address);

  } catch (err) {
    console.error(err);
    statusText.innerText = "Connection failed";
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