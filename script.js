       

function populateSelect(selectClassName, data, keyName) {
  const selects = document.querySelectorAll(`.${selectClassName}`);
  selects.forEach(select => {
    // Czyść stare opcje (opcjonalne)
    select.innerHTML = '';
    
    // Dodaj pustą opcję na początek
    const emptyOption = document.createElement("option");
    emptyOption.textContent = `-- Wybierz ${keyName} --`;
    emptyOption.value = "";
    select.appendChild(emptyOption);
    
    data.forEach(item => {
      const option = document.createElement("option");
      option.textContent = item[keyName];
      option.value = item[keyName];
      select.appendChild(option);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateSelect("selectBlade", bladeData, "Blade");
  populateSelect("selectRatchet", ratchetData, "Ratchet");
  populateSelect("selectBit", bitData, "Bit");

  populateSelect("selectBlade2", bladeData, "Blade");
  populateSelect("selectRatchet2", ratchetData, "Ratchet");
  populateSelect("selectBit2", bitData, "Bit");
});
