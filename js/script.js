let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let chart;

// FORMAT UANG
function formatMoney(amount) {
  return "$" + Number(amount).toFixed(2);
}

// RENDER
function render() {
  const list = document.getElementById("list");
  const balance = document.getElementById("balance");

  list.innerHTML = "";

  let total = 0;

  transactions.forEach((t, index) => {
    total += Number(t.amount);

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${t.name}</strong><br>
        ${formatMoney(t.amount)} <small>${t.category}</small>
      </div>
      <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
    `;

    list.appendChild(li);
  });

  balance.innerText = formatMoney(total);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateChart();
}

// TAMBAH DATA
function addTransaction() {
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!name || !amount || !category) {
    alert("All fields are required!");
    return;
  }

  transactions.push({
    name,
    amount: Number(amount),
    category
  });

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";

  render();
}

// DELETE
function deleteItem(index) {
  transactions.splice(index, 1);
  render();
}

// CHART
function updateChart() {
  const data = {
    Food: 0,
    Transport: 0,
    Fun: 0
  };

  transactions.forEach(t => {
    data[t.category] += t.amount;
  });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: ["Food", "Transport", "Fun"],
      datasets: [{
        data: [data.Food, data.Transport, data.Fun],
        backgroundColor: ["green", "blue", "orange"]
      }]
    }
  });
}

// LOAD AWAL
render();