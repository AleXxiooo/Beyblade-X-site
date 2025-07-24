function populateSelect(selectClassName, data, keyName) {
  const selects = document.querySelectorAll(`.${selectClassName}`);
  selects.forEach(select => {
    // Wyczyść stare opcje
    select.innerHTML = '';

    // Dodaj pustą opcję
    const emptyOption = document.createElement("option");
    emptyOption.textContent = `-- Wybierz ${keyName} --`;
    emptyOption.value = "";
    select.appendChild(emptyOption);

    // Dodaj dane
    data.forEach(item => {
      const option = document.createElement("option");
      option.textContent = item[keyName];
      option.value = item[keyName];
      select.appendChild(option);
    });
  });
}

// Po załadowaniu DOM (i danych z <script> w HTML)
document.addEventListener("DOMContentLoaded", () => {
  populateSelect("selectBlade", bladeData, "Blade");
  populateSelect("selectRatchet", ratchetData, "Ratchet");
  populateSelect("selectBit", bitData, "Bit");

  populateSelect("selectBlade2", bladeData, "Blade");
  populateSelect("selectRatchet2", ratchetData, "Ratchet");
  populateSelect("selectBit2", bitData, "Bit");
});
