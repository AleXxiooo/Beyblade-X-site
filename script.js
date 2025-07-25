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
      <li>Weight: ${part.weight}</li>
      <li>Speed: ${part.speed}</li>
    </ul>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  populateSelect("selectBlade", bladeData, "Blade");
  populateSelect("selectRatchet", ratchetData, "Ratchet");
  populateSelect("selectBit", bitData, "Bit");

  populateSelect("selectBlade2", bladeData, "Blade");
  populateSelect("selectRatchet2", ratchetData, "Ratchet");
  populateSelect("selectBit2", bitData, "Bit");

  // Lewa strona
  document.querySelector(".selectBlade").addEventListener("change", (e) => {
    const selected = bladeData.find(b => b.name === e.target.value);
    displayStats("bladeStatsLeft", selected);
  });
  document.querySelector(".selectRatchet").addEventListener("change", (e) => {
    const selected = ratchetData.find(r => r.name === e.target.value);
    displayStats("ratchetStatsLeft", selected);
  });
  document.querySelector(".selectBit").addEventListener("change", (e) => {
    const selected = bitData.find(b => b.name === e.target.value);
    displayStats("bitStatsLeft", selected);
  });

  // Prawa strona
  document.querySelector(".selectBlade2").addEventListener("change", (e) => {
    const selected = bladeData.find(b => b.name === e.target.value);
    displayStats("bladeStatsRight", selected);
  });
  document.querySelector(".selectRatchet2").addEventListener("change", (e) => {
    const selected = ratchetData.find(r => r.name === e.target.value);
    displayStats("ratchetStatsRight", selected);
  });
  document.querySelector(".selectBit2").addEventListener("change", (e) => {
    const selected = bitData.find(b => b.name === e.target.value);
    displayStats("bitStatsRight", selected);
  });
});
