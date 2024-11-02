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
  if (walletAddress) {
    addedWallets.push(walletAddress);
    document.getElementById("added-wallets").innerHTML += `<p>${walletAddress}</p>`;
    document.getElementById("wallet-address").value = ""; // Clear input
  } else {
    alert("Please enter a wallet address.");
  }
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
      <strong>Wallet Balance:</strong> ${transaction.balance} <br>
    `;
    outputBox.appendChild(transactionElement);
  });
}

// Compare wallets function
function compareWallets() {
  const comparisonBox = document.getElementById("comparison-data");
  comparisonBox.innerHTML = "<h2>Wallet Comparison</h2>";

  addedWallets.forEach(walletAddress => {
    fetchWalletData(walletAddress);
  });

  // Simple comparison logic
  setTimeout(() => {
    const walletCounts = addedWallets.map(wallet => {
      const data = walletDataMock[wallet];
      return { wallet, count: data ? data.transactions.length : 0 };
    });

    walletCounts.sort((a, b) => b.count - a.count); // Sort by number of transactions

    const bestWallet = walletCounts[0];
    const recommendation = document.createElement("p");
    recommendation.innerHTML = `Follow transactions from: <strong>${bestWallet.wallet}</strong> with ${bestWallet.count} transactions.`;
    comparisonBox.appendChild(recommendation);
  }, 2000);
}
