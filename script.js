// Matrix Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize; 
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#00ff00"; 
  ctx.font = fontSize + "px monospace";
  
  drops.forEach((y, x) => {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    ctx.fillText(text, x * fontSize, y * fontSize);
    
    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }
    drops[x]++;
  });
}

setInterval(drawMatrix, 50);

// Store added wallet addresses
let addedWallets = [];

// Enhanced mock wallet data
const walletDataMock = {
  "wallet1": {
    transactions: [
      { time: "2024-11-01 14:23", action: "BUY", item: "Bitcoin", amount: "0.5 BTC", price: "$34,000", fee: "$10", balance: "1.5 BTC" },
      { time: "2024-11-01 13:45", action: "SELL", item: "Ethereum", amount: "1.2 ETH", price: "$2,000", fee: "$5", balance: "3 ETH" }
    ]
  },
  "wallet2": {
    transactions: [
      { time: "2024-11-01 12:10", action: "BUY", item: "Cardano", amount: "300 ADA", price: "$1.20", fee: "$0.50", balance: "500 ADA" },
      { time: "2024-11-01 11:00", action: "SELL", item: "Litecoin", amount: "2 LTC", price: "$180", fee: "$1", balance: "10 LTC" }
    ]
  }
};

// Add wallet function
function addWallet() {
  const walletAddress = document.getElementById("wallet-address").value;
  if (walletAddress && !addedWallets.includes(walletAddress)) {
    addedWallets.push(walletAddress);
    fetchWalletData(walletAddress); // Fetch data immediately when added
    updateWalletDisplay();
    document.getElementById("wallet-address").value = ""; // Clear input
    checkCompareButton();
  } else if (addedWallets.includes(walletAddress)) {
    alert("This wallet is already added.");
  } else {
    alert("Please enter a wallet address.");
  }
}

// Update wallet display
function updateWalletDisplay() {
  const walletDisplay = document.getElementById("added-wallets");
  walletDisplay.innerHTML = ''; // Clear previous display
  addedWallets.forEach(wallet => {
    const walletItem = document.createElement("div");
    walletItem.className = "wallet-item";
    walletItem.innerHTML = `
      ${wallet} 
      <button class="remove-button" onclick="removeWallet('${wallet}')">Remove</button>
    `;
    walletDisplay.appendChild(walletItem);
  });
}

// Remove wallet function
function removeWallet(walletAddress) {
  addedWallets = addedWallets.filter(wallet => wallet !== walletAddress);
  updateWalletDisplay();
  checkCompareButton();
}

// Check if the compare button should be enabled
function checkCompareButton() {
  const compareButton = document.getElementById("compare-button");
  compareButton.disabled = addedWallets.length < 2; // Enable if two or more wallets
}

// Fetch wallet data function
function fetchWalletData(walletAddress) {
  const outputBox = document.getElementById("wallet-data");
  outputBox.innerHTML += `<p>Fetching data for wallet: ${walletAddress}...</p>`;
  
  // Simulate a delay for fetching data
  setTimeout(() => {
    displayWalletData(walletDataMock[walletAddress]);
  }, 1000);
}

// Display wallet data with complex transaction information
function displayWalletData(data) {
  const outputBox = document.getElementById("wallet-data");
  if (!data) {
    outputBox.innerHTML += "<p>No data found for this wallet.</p>";
    return;
  }

  outputBox.innerHTML += "<h2>Transaction History</h2>";
  data.transactions.forEach(transaction => {
    const transactionElement = document.createElement("div");
    transactionElement.style.marginBottom = "10px";

    // Style "BUY" as green and "SELL" as red
    const actionColor = transaction.action === "BUY" ? "green" : "red";
    const actionText = transaction.action === "BUY" ? "BUY" : "SELL";

    transactionElement.innerHTML = `
      <span style="color: ${actionColor}; font-weight: bold;">${actionText}</span> - 
      ${transaction.time} <br>
      <strong>Item:</strong> ${transaction.item} <br>
      <strong>Amount:</strong> ${transaction.amount} <br>
      <strong>Price:</strong> ${transaction.price} <br>
      <strong>Fee:</strong> ${transaction.fee} <br>
      <strong>Balance:</strong> ${transaction.balance} <br>
    `;
    outputBox.appendChild(transactionElement);
  });
}

// Compare wallets function (stub)
function compareWallets() {
  const comparisonData = document.getElementById("comparison-data");
  comparisonData.innerHTML = `<h2>Comparing Wallets:</h2><p>This feature is not yet implemented.</p>`;
}
