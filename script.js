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

// Mock wallet data with details about what was bought or sold
const walletDataMock = {
  transactions: [
    { time: "2024-11-01 14:23", action: "BUY", item: "Bitcoin", amount: "0.5 BTC" },
    { time: "2024-11-01 13:45", action: "SELL", item: "Ethereum", amount: "1.2 ETH" },
    { time: "2024-11-01 12:10", action: "BUY", item: "Cardano", amount: "300 ADA" }
  ]
};

// Fetch wallet data function
function fetchWalletData() {
  const walletAddress = document.getElementById("wallet-address").value;
  const outputBox = document.getElementById("wallet-data");

  if (walletAddress) {
    outputBox.innerHTML = `<p>Fetching data for wallet: ${walletAddress}...</p>`;
    
    // Simulate a delay for fetching data
    setTimeout(() => {
      displayWalletData(walletDataMock);
    }, 1000);
  } else {
    alert("Please enter a wallet address.");
  }
}

// Display wallet data with detailed transaction information
function displayWalletData(data) {
  const outputBox = document.getElementById("wallet-data");
  outputBox.innerHTML = "<h2>Transaction History</h2>";

  data.transactions.forEach(transaction => {
    const transactionElement = document.createElement("p");

    // Style "BUY" as green and "SELL" as red
    const actionColor = transaction.action === "BUY" ? "green" : "red";
    const actionText = transaction.action === "BUY" ? "BUY" : "SELL";

    transactionElement.innerHTML = `
      <span style="color: ${actionColor}; font-weight: bold;">${actionText}</span> - 
      ${transaction.time} - 
      ${transaction.item}: ${transaction.amount}
    `;
    outputBox.appendChild(transactionElement);
  });

  // Display buy/sell recommendation based on the latest transaction
  const recommendation = document.createElement("h3");
  recommendation.innerText = "Recommendation: ";
  const latestTransaction = data.transactions[0];

  if (latestTransaction.action === "BUY") {
    recommendation.innerText += "BUY";
    recommendation.style.color = "green";
  } else {
    recommendation.innerText += "SELL";
    recommendation.style.color = "red";
  }

  outputBox.appendChild(recommendation);
}
