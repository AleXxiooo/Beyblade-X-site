const bladeSelect = document.getElementById('bladeSelect');
const ratchetSelect = document.getElementById('ratchetSelect');
const bitSelect = document.getElementById('bitSelect');

﻿const bladeSelect2 = document.getElementById('bladeSelect2');
const ratchetSelect2 = document.getElementById('ratchetSelect2');
const bitSelect2 = document.getElementById('bitSelect2');
let radarChart;
let radarChart2;

function populateSelect(select, items, key) {
    select.innerHTML = ''; // Czyścimy listę
    for (let i = 0; i < items.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = items[i][key];
        select.appendChild(option);
    }
}

function sumStats(blade, ratchet, bit) {
    return {
        attack: blade.attack + ratchet.attack + bit.attack,
        defense: blade.defense + ratchet.defense + bit.defense,
        stamina: blade.stamina + ratchet.stamina + bit.stamina,
        speed: blade.speed + ratchet.speed + bit.speed,
        burst: blade.burst + ratchet.burst + bit.burst
    };
}

function updateChart(stats) {
    const data = {
        labels: ['Attack', 'Defense', 'Stamina', 'Speed', 'Burst'],
        datasets: [{
            label: 'Statystyki Combo',
            data: [stats.attack, stats.defense, stats.stamina, stats.speed, stats.burst],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(54, 162, 235)'
        }]
    };

    const options = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 20,
                angleLines: { color: '#777' },
                grid: { color: '#555' },
                pointLabels: { color: '#fff', font: { size: 14 } },
                ticks: { color: '#aaa', backdropColor: 'transparent' }
            }
        },
        plugins: {
            legend: { labels: { color: '#fff' } }
        }
    };

    if (radarChart) {
        radarChart.data = data;
        radarChart.options = options;
        radarChart.update();
    } else {
        const ctx = document.getElementById('radarChart').getContext('2d');
        radarChart = new Chart(ctx, { type: 'radar', data, options });
    }
}

function updateChart2(stats) {
    const data = {
        labels: ['Attack', 'Defense', 'Stamina', 'Speed', 'Burst'],
        datasets: [{
            label: 'Statystyki Combo',
            data: [stats.attack, stats.defense, stats.stamina, stats.speed, stats.burst],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(54, 162, 235)'
        }]
    };

    const options = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 20,
                angleLines: { color: '#777' },
                grid: { color: '#555' },
                pointLabels: { color: '#fff', font: { size: 14 } },
                ticks: { color: '#aaa', backdropColor: 'transparent' }
            }
        },
        plugins: {
            legend: { labels: { color: '#fff' } }
        }
    };

    if (radarChart2) {
        radarChart2.data = data;
        radarChart2.options = options;
        radarChart2.update();
    } else {
        const ctx = document.getElementById('radarChart2').getContext('2d');
        radarChart2 = new Chart(ctx, { type: 'radar', data, options });
    }
}

function handleChange() {
    const blade = bladeData[bladeSelect.value];
    const ratchet = ratchetData[ratchetSelect.value];
    const bit = bitData[bitSelect.value];

    if (blade && ratchet && bit) {
        const combinedStats = sumStats(blade, ratchet, bit);
        updateChart(combinedStats);
    }
}

function handleChange2() {
    const blade = bladeData[bladeSelect2.value];
    const ratchet = ratchetData[ratchetSelect2.value];
    const bit = bitData[bitSelect2.value];

    if (blade && ratchet && bit) {
        const combinedStats = sumStats(blade, ratchet, bit);
        updateChart2(combinedStats);
    }
}

function init() {
    populateSelect(bladeSelect, bladeData, 'Blade');
    populateSelect(ratchetSelect, ratchetData, 'Ratchet');
    populateSelect(bitSelect, bitData, 'Bit');

    bladeSelect.addEventListener('change', handleChange);
    ratchetSelect.addEventListener('change', handleChange);
    bitSelect.addEventListener('change', handleChange);

    bladeSelect.selectedIndex = 0;
    ratchetSelect.selectedIndex = 0;
    bitSelect.selectedIndex = 0;
    handleChange();

    populateSelect(bladeSelect2, bladeData, 'Blade');
    populateSelect(ratchetSelect2, ratchetData, 'Ratchet');
    populateSelect(bitSelect2, bitData, 'Bit');

    bladeSelect2.addEventListener('change', handleChange2);
    ratchetSelect2.addEventListener('change', handleChange2);
    bitSelect2.addEventListener('change', handleChange2);

    bladeSelect2.selectedIndex = 0;
    ratchetSelect2.selectedIndex = 0;
    bitSelect2.selectedIndex = 0;
    handleChange2();
}

init();
