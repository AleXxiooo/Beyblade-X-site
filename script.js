let leftChart = null;
let rightChart = null;

function populateSelect(selectClassName, data, keyName) {
  const selects = document.querySelectorAll(`.${selectClassName}`);
  selects.forEach(select => {
    select.innerHTML = '';
    const emptyOption = document.createElement("option");
    emptyOption.textContent = `-- Wybierz ${keyName} --`;
    emptyOption.value = "";
    select.appendChild(emptyOption);

    data.forEach(item => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.name;
      select.appendChild(option);
    });
  });
}

function displayStats(containerId, part) {
  const container = document.getElementById(containerId);
  if (!part) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <h3>${part.name}</h3>
    <img src="${part.image}" alt="${part.name}" style="max-width: 120px;" />
    <ul>
      <li>Attack: ${part.attack}</li>
      <li>Defense: ${part.defense}</li>
      <li>Stamina: ${part.stamina}</li>
      <li>Weight: ${part.weight} g</li>
      <li>Speed: ${part.speed}</li>
    </ul>
  `;
}

function getSelectedPart(data, value) {
  return data.find(item => item.name === value) || null;
}

function getTotalStats(blade, ratchet, bit) {
  const empty = { attack: 0, defense: 0, stamina: 0, weight: 0, speed: 0 };
  return [blade, ratchet, bit].reduce((acc, part) => {
    if (part) {
      acc.attack += part.attack;
      acc.defense += part.defense;
      acc.stamina += part.stamina;
      acc.weight += part.weight;
      acc.speed += part.speed;
    }
    return acc;
  }, empty);
}

function renderSingleChart(canvasId, stats, labelColor, title) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  const data = {
    labels: ["Attack", "Defense", "Stamina", "Weight", "Speed"],
    datasets: [{
      label: title,
      data: [
        stats.attack,
        stats.defense,
        stats.stamina,
        stats.weight,
        stats.speed
      ],
      backgroundColor: labelColor
    }]
  };

  const config = {
    type: "radar",
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };

  if (canvasId === "leftStatsChart" && leftChart) leftChart.destroy();
  if (canvasId === "rightStatsChart" && rightChart) rightChart.destroy();

  const chart = new Chart(ctx, config);
  if (canvasId === "leftStatsChart") leftChart = chart;
  if (canvasId === "rightStatsChart") rightChart = chart;
}

function updateLeftChart() {
  const blade = getSelectedPart(bladeData, document.querySelector(".selectBlade").value);
  const ratchet = getSelectedPart(ratchetData, document.querySelector(".selectRatchet").value);
  const bit = getSelectedPart(bitData, document.querySelector(".selectBit").value);
  const stats = getTotalStats(blade, ratchet, bit);
  renderSingleChart("leftStatsChart", stats, "rgba(33, 150, 243, 0.7)", "Statystyki lewej strony");
}

function updateRightChart() {
  const blade = getSelectedPart(bladeData, document.querySelector(".selectBlade2").value);
  const ratchet = getSelectedPart(ratchetData, document.querySelector(".selectRatchet2").value);
  const bit = getSelectedPart(bitData, document.querySelector(".selectBit2").value);
  const stats = getTotalStats(blade, ratchet, bit);
  renderSingleChart("rightStatsChart", stats, "rgba(244, 67, 54, 0.7)", "Statystyki prawej strony");
}

document.addEventListener("DOMContentLoaded", () => {
  populateSelect("selectBlade", bladeData, "name");
  populateSelect("selectRatchet", ratchetData, "name");
  populateSelect("selectBit", bitData, "name");

  populateSelect("selectBlade2", bladeData, "name");
  populateSelect("selectRatchet2", ratchetData, "name");
  populateSelect("selectBit2", bitData, "name");

  // Lewa strona
  document.querySelector(".selectBlade").addEventListener("change", (e) => {
    displayStats("bladeStatsLeft", getSelectedPart(bladeData, e.target.value));
    updateLeftChart();
  });
  document.querySelector(".selectRatchet").addEventListener("change", (e) => {
    displayStats("ratchetStatsLeft", getSelectedPart(ratchetData, e.target.value));
    updateLeftChart();
  });
  document.querySelector(".selectBit").addEventListener("change", (e) => {
    displayStats("bitStatsLeft", getSelectedPart(bitData, e.target.value));
    updateLeftChart();
  });

  // Prawa strona
  document.querySelector(".selectBlade2").addEventListener("change", (e) => {
    displayStats("bladeStatsRight", getSelectedPart(bladeData, e.target.value));
    updateRightChart();
  });
  document.querySelector(".selectRatchet2").addEventListener("change", (e) => {
    displayStats("ratchetStatsRight", getSelectedPart(ratchetData, e.target.value));
    updateRightChart();
  });
  document.querySelector(".selectBit2").addEventListener("change", (e) => {
    displayStats("bitStatsRight", getSelectedPart(bitData, e.target.value));
    updateRightChart();
  });
});
