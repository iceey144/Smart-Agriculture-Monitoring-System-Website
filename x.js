let barChart = null;
let radarChart = null;

const cropSensorRanges = {
  Tomato: { soilMoisture: [65, 75], temperature: [22, 26], humidity: [60, 80], rainfall: [3, 6] },
  Carrot: { soilMoisture: [60, 70], temperature: [15, 20], humidity: [60, 70], rainfall: [3, 5] },
  Spinach: { soilMoisture: [65, 75], temperature: [10, 18], humidity: [70, 80], rainfall: [4, 6] },
  Broccoli: { soilMoisture: [60, 70], temperature: [15, 20], humidity: [65, 75], rainfall: [4, 7] },
  Cauliflower: { soilMoisture: [65, 75], temperature: [15, 20], humidity: [70, 80], rainfall: [4, 6] },
  Cucumber: { soilMoisture: [70, 80], temperature: [25, 30], humidity: [80, 90], rainfall: [5, 8] },
  Eggplant: { soilMoisture: [65, 75], temperature: [24, 30], humidity: [70, 80], rainfall: [4, 7] },
  'Bell Pepper': { soilMoisture: [65, 75], temperature: [22, 28], humidity: [65, 75], rainfall: [4, 6] },
  Zucchini: { soilMoisture: [70, 80], temperature: [20, 25], humidity: [70, 80], rainfall: [4, 7] },
  Lettuce: { soilMoisture: [65, 75], temperature: [15, 20], humidity: [70, 80], rainfall: [3, 5] },
  Cabbage: { soilMoisture: [65, 75], temperature: [15, 20], humidity: [70, 80], rainfall: [4, 6] },
  Onion: { soilMoisture: [60, 70], temperature: [18, 24], humidity: [60, 70], rainfall: [3, 5] },
  Garlic: { soilMoisture: [60, 70], temperature: [18, 24], humidity: [60, 70], rainfall: [3, 5] },
  Potato: { soilMoisture: [65, 75], temperature: [15, 20], humidity: [70, 80], rainfall: [4, 6] },
  'Sweet Potato': { soilMoisture: [65, 75], temperature: [24, 30], humidity: [70, 80], rainfall: [4, 7] },
  Radish: { soilMoisture: [60, 70], temperature: [15, 20], humidity: [60, 70], rainfall: [3, 5] },
  'Green Bean': { soilMoisture: [65, 75], temperature: [20, 25], humidity: [65, 75], rainfall: [4, 6] },
  Peas: { soilMoisture: [65, 75], temperature: [15, 20], humidity: [70, 80], rainfall: [3, 5] },
  Okra: { soilMoisture: [65, 75], temperature: [25, 30], humidity: [70, 80], rainfall: [4, 7] },
  Kale: { soilMoisture: [65, 75], temperature: [15, 20], humidity: [70, 80], rainfall: [4, 6] }
};

const validSoilTypes = ['Loamy', 'Sandy', 'Clay', 'Silt'];
const validAreas = ['North Field', 'South Field', 'Coastal Region'];

function updateSensorData(crop = null, area = '') {
  const soilMoistureEl = document.getElementById('soilMoisture');
  const temperatureEl = document.getElementById('temperature');
  const humidityEl = document.getElementById('humidity');
  const rainfallEl = document.getElementById('rainfall');

  if (!soilMoistureEl || !temperatureEl || !humidityEl || !rainfallEl) {
    console.error('Sensor data elements not found');
    announce('Error: Unable to update sensor data.');
    return;
  }

  let soilMoisture, temperature, humidity, rainfall;

  if (crop && cropSensorRanges[crop]) {
    const ranges = cropSensorRanges[crop];
    soilMoisture = (ranges.soilMoisture[0] + Math.random() * (ranges.soilMoisture[1] - ranges.soilMoisture[0])).toFixed(1);
    temperature = (ranges.temperature[0] + Math.random() * (ranges.temperature[1] - ranges.temperature[0])).toFixed(1);
    humidity = (ranges.humidity[0] + Math.random() * (ranges.humidity[1] - ranges.humidity[0])).toFixed(1);
    rainfall = (ranges.rainfall[0] + Math.random() * (ranges.rainfall[1] - ranges.rainfall[0])).toFixed(1);

    const adjustments = {
      'North Field': {
        Tomato: { temperature: -2, rainfall: 1.2 },
        Carrot: { temperature: -1.5, rainfall: 1.1 },
        Spinach: { temperature: -1, humidity: 0.95 },
        Broccoli: { temperature: -1.5, rainfall: 1.1 },
        Cauliflower: { temperature: -1, humidity: 0.95 },
        Cucumber: { temperature: -2, humidity: 0.9 },
        Eggplant: { temperature: -2, rainfall: 1.1 },
        'Bell Pepper': { temperature: -1.5, humidity: 0.95 },
        Zucchini: { temperature: -1, rainfall: 1.1 },
        Lettuce: { temperature: -1, humidity: 0.95 },
        Cabbage: { temperature: -1, rainfall: 1.1 },
        Onion: { temperature: -1.5, soilMoisture: 0.95 },
        Garlic: { temperature: -1.5, soilMoisture: 0.95 },
        Potato: { temperature: -1, rainfall: 1.1 },
        'Sweet Potato': { temperature: -2, rainfall: 1.1 },
        Radish: { temperature: -1, soilMoisture: 0.95 },
        'Green Bean': { temperature: -1, rainfall: 1.1 },
        Peas: { temperature: -1, humidity: 0.95 },
        Okra: { temperature: -2, rainfall: 1.1 },
        Kale: { temperature: -1, humidity: 0.95 }
      },
      'South Field': {
        Tomato: { temperature: 2, humidity: 0.9 },
        Carrot: { temperature: 1.5, humidity: 0.95 },
        Spinach: { temperature: 1, rainfall: 0.9 },
        Broccoli: { temperature: 1.5, humidity: 0.95 },
        Cauliflower: { temperature: 1, rainfall: 0.9 },
        Cucumber: { temperature: 2, humidity: 0.85 },
        Eggplant: { temperature: 2, humidity: 0.9 },
        'Bell Pepper': { temperature: 1.5, humidity: 0.95 },
        Zucchini: { temperature: 1, rainfall: 0.9 },
        Lettuce: { temperature: 1, humidity: 0.95 },
        Cabbage: { temperature: 1, rainfall: 0.9 },
        Onion: { temperature: 1.5, soilMoisture: 0.9 },
        Garlic: { temperature: 1.5, soilMoisture: 0.9 },
        Potato: { temperature: 1, rainfall: 0.9 },
        'Sweet Potato': { temperature: 2, humidity: 0.9 },
        Radish: { temperature: 1, soilMoisture: 0.9 },
        'Green Bean': { temperature: 1, rainfall: 0.9 },
        Peas: { temperature: 1, humidity: 0.95 },
        Okra: { temperature: 2, humidity: 0.9 },
        Kale: { temperature: 1, rainfall: 0.9 }
      },
      'Coastal Region': {
        Tomato: { humidity: 1.1, rainfall: 1.3 },
        Carrot: { humidity: 1.05, rainfall: 1.2 },
        Spinach: { humidity: 1.1, rainfall: 1.1 },
        Broccoli: { humidity: 1.05, rainfall: 1.2 },
        Cauliflower: { humidity: 1.1, rainfall: 1.1 },
        Cucumber: { humidity: 1.1, rainfall: 1.3 },
        Eggplant: { humidity: 1.1, rainfall: 1.2 },
        'Bell Pepper': { humidity: 1.05, rainfall: 1.2 },
        Zucchini: { humidity: 1.1, rainfall: 1.1 },
        Lettuce: { humidity: 1.1, rainfall: 1.1 },
        Cabbage: { humidity: 1.1, rainfall: 1.2 },
        Onion: { humidity: 1.05, soilMoisture: 1.05 },
        Garlic: { humidity: 1.05, soilMoisture: 1.05 },
        Potato: { humidity: 1.1, rainfall: 1.1 },
        'Sweet Potato': { humidity: 1.1, rainfall: 1.2 },
        Radish: { humidity: 1.05, soilMoisture: 1.05 },
        'Green Bean': { humidity: 1.1, rainfall: 1.1 },
        Peas: { humidity: 1.1, rainfall: 1.1 },
        Okra: { humidity: 1.1, rainfall: 1.2 },
        Kale: { humidity: 1.1, rainfall: 1.1 }
      }
    };

    if (area && adjustments[area] && adjustments[area][crop]) {
      const mods = adjustments[area][crop];
      if (mods.temperature) temperature = Math.max(ranges.temperature[0], Math.min(ranges.temperature[1], parseFloat(temperature) + mods.temperature)).toFixed(1);
      if (mods.humidity) humidity = Math.max(ranges.humidity[0], Math.min(ranges.humidity[1], parseFloat(humidity) * mods.humidity)).toFixed(1);
      if (mods.rainfall) rainfall = Math.max(ranges.rainfall[0], Math.min(ranges.rainfall[1], parseFloat(rainfall) * mods.rainfall)).toFixed(1);
      if (mods.soilMoisture) soilMoisture = Math.max(ranges.soilMoisture[0], Math.min(ranges.soilMoisture[1], parseFloat(soilMoisture) * mods.soilMoisture)).toFixed(1);
    }
  } else {
    soilMoisture = (60 + Math.random() * 10).toFixed(1);
    temperature = (25 + Math.random() * 5).toFixed(1);
    humidity = (70 + Math.random() * 10).toFixed(1);
    rainfall = (0 + Math.random() * 10).toFixed(1);
  }

  soilMoistureEl.textContent = `${soilMoisture}%`;
  temperatureEl.textContent = `${temperature}°C`;
  humidityEl.textContent = `${humidity}%`;
  rainfallEl.textContent = `${rainfall}mm`;
}

function simulateProgress(callback) {
  const progress = document.getElementById('progress');
  const progressBar = progress?.querySelector('.progress-bar');
  if (!progress || !progressBar) {
    console.error('Progress elements not found');
    callback();
    return;
  }
  let width = 0;
  progress.classList.remove('hidden');
  progress.setAttribute('aria-valuenow', '0');
  progressBar.style.width = '0%';

  const interval = setInterval(() => {
    width += 4;
    progressBar.style.width = `${width}%`;
    progress.setAttribute('aria-valuenow', width);
    if (width >= 100) {
      clearInterval(interval);
      progress.classList.add('hidden');
      callback();
    }
  }, 80);
}

function displayResult(crop, soil, area, suitabilityScore) {
  const output = document.getElementById('output');
  if (!output) {
    console.error('Output element not found');
    announce('Error: Unable to display results.');
    return;
  }

  output.innerHTML = `
    <div class="bg-green-100 p-6 rounded-lg shadow-md">
      <p class="text-gray-700 mb-2">
        <i class="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
        <span class="sr-only">Analyzing</span>
        Analyzing <strong>${crop}</strong> in <strong>${area}</strong> with <strong>${soil}</strong> soil...
      </p>
      <div class="mt-4">
        <p class="text-gray-700 flex items-center">
          <i class="fas fa-check-circle text-green-500 mr-2" aria-hidden="true"></i>
          <span class="sr-only">Result</span>
          <strong>Result:</strong> ${crop} is ${suitabilityScore >= 85 ? 'highly' : 'moderately'} suitable for ${area}!
        </p>
        <p class="text-gray-700 mt-2"><strong>Suitability Score:</strong> ${suitabilityScore}%</p>
        <ul class="list-disc list-inside mt-3 text-gray-600">
          <li>Soil Moisture: ${cropSensorRanges[crop].soilMoisture[0]}–${cropSensorRanges[crop].soilMoisture[1]}%</li>
          <li>Temperature: ${cropSensorRanges[crop].temperature[0]}–${cropSensorRanges[crop].temperature[1]}°C</li>
          <li>Humidity: ${cropSensorRanges[crop].humidity[0]}–${cropSensorRanges[crop].humidity[1]}%</li>
          <li>Rainfall: ${cropSensorRanges[crop].rainfall[0]}–${cropSensorRanges[crop].rainfall[1]}mm</li>
          <li>Soil Type: ${soil} is ${suitabilityScore >= 85 ? 'ideal' : 'acceptable'}</li>
        </ul>
      </div>
    </div>`;

  updateSensorData(crop, area);

  const moisture = parseFloat(document.getElementById('soilMoisture').textContent);
  const temp = parseFloat(document.getElementById('temperature').textContent);
  const humidity = parseFloat(document.getElementById('humidity').textContent);
  const rainfall = parseFloat(document.getElementById('rainfall').textContent);

  if (barChart) {
    barChart.data.datasets[0].data = [moisture, temp, humidity, rainfall, suitabilityScore];
    barChart.data.labels = ['Soil Moisture (%)', 'Temp (°C)', 'Humidity (%)', 'Rainfall (mm)', 'Suitability (%)'];
    barChart.options.plugins.title.text = `Sensor Readings for ${crop}`;
    barChart.update();
  }

  if (radarChart) {
    radarChart.data.datasets[1].data = [moisture, temp, humidity, rainfall];
    radarChart.options.plugins.title.text =` Crop Suitability: ${crop}`;
    radarChart.update();
  }

  announce(`Crop analysis complete for ${crop} in ${area}.`);
}

function announce(message) {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
  } else {
    console.warn('Live region not found');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let currentCrop = null;
  let currentArea = '';

  const cropSelect = document.getElementById('crop');
  if (cropSelect) {
    Object.keys(cropSensorRanges).forEach(crop => {
      const option = document.createElement('option');
      option.value = crop;
      option.textContent = crop;
      cropSelect.appendChild(option);
    });
  }

  updateSensorData();

  const sensorInterval = setInterval(() => {
    updateSensorData(currentCrop, currentArea);
    announce('Sensor data updated automatically.');
  }, 10000);

  const toggleButton = document.getElementById('night-mode-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('night-mode');
      toggleButton.setAttribute('aria-pressed', document.body.classList.contains('night-mode'));
      toggleButton.textContent = document.body.classList.contains('night-mode') ? 'Day Mode' : 'Night Mode';
      announce(document.body.classList.contains('night-mode') ? 'Night mode enabled.' : 'Day mode enabled.');
    });
  }

  const cropForm = document.getElementById('cropForm');
  const resetButton = document.getElementById('resetForm');
  const output = document.getElementById('output');
  const progress = document.getElementById('progress');
  const errors = document.querySelectorAll('.error');

  if (cropForm) {
    cropForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const crop = document.getElementById('crop').value;
      const soil = document.getElementById('soilType').value;
      const area = document.getElementById('area').value;

      errors.forEach(error => {
        error.classList.add('hidden');
        error.textContent = error.dataset.originalText || '';
      });

      let isValid = true;
      if (!crop || crop === '') {
        const cropError = document.getElementById('crop-error');
        if (cropError) cropError.classList.remove('hidden');
        isValid = false;
      }
      if (!soil || soil === '') {
        const soilError = document.getElementById('soilType-error');
        if (soilError) soilError.classList.remove('hidden');
        isValid = false;
      }
      if (!area || area === '') {
        const areaError = document.getElementById('area-error');
        if (areaError) areaError.classList.remove('hidden');
        isValid = false;
      }

      if (!isValid) {
        console.warn('Form validation failed:', { crop, soil, area });
        announce('Please select all fields.');
        return;
      }

      if (!cropSensorRanges[crop]) {
        console.error('Invalid crop selected:', crop);
        const cropError = document.getElementById('crop-error');
        if (cropError) {
          cropError.textContent = 'Invalid crop selected. Please choose from the list.';
          cropError.classList.remove('hidden');
        }
        announce('Invalid crop selected. Please choose from the list.');
        return;
      }

      currentCrop = crop;
      currentArea = area;
      const suitabilityScore = Math.floor(75 + Math.random() * 20);
      simulateProgress(() => displayResult(crop, soil, area, suitabilityScore));
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (cropForm) cropForm.reset();
      if (output) output.innerHTML = '';
      if (progress) progress.classList.add('hidden');
      errors.forEach(error => {
        error.classList.add('hidden');
        error.textContent = error.dataset.originalText || '';
      });
      currentCrop = null;
      currentArea = '';
      updateSensorData();
      if (barChart) {
        barChart.data.datasets[0].data = [68, 23, 72, 5];
        barChart.data.labels = ['Soil Moisture (%)', 'Temp (°C)', 'Humidity (%)', 'Rainfall (mm)'];
        barChart.options.plugins.title.text = 'Sensor Readings';
        barChart.update();
      }
      if (radarChart) {
        radarChart.data.datasets[1].data = [65, 22, 60, 3];
        radarChart.options.plugins.title.text = 'Crop Suitability: Tomato';
        radarChart.update();
      }
      announce('Form reset. Sensors restored to default.');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      if (href === 'login.html' && currentPage === 'login.html') {
        return;
      }

      const [targetPage, fragment] = href.split('#');
      const targetPageName = targetPage || 'index.html';

      if (currentPage !== targetPageName) {
        window.location.href = href;
        return;
      }

      if (fragment) {
        e.preventDefault();
        const targetElement = document.getElementById(fragment);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          console.warn(`Section #${fragment} not found`);
        }
        return;
      }

      window.location.href = href;
    });
  });

  const refreshBtn = document.getElementById('refresh-sensors');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      updateSensorData(currentCrop, currentArea);
      const moisture = parseFloat(document.getElementById('soilMoisture').textContent);
      const temp = parseFloat(document.getElementById('temperature').textContent);
      const humidity = parseFloat(document.getElementById('humidity').textContent);
      const rainfall = parseFloat(document.getElementById('rainfall').textContent);
      if (barChart) {
        barChart.data.datasets[0].data = [moisture, temp, humidity, rainfall, barChart.data.datasets[0].data[4] || 0];
        barChart.update();
      }
      if (radarChart) {
        radarChart.data.datasets[1].data = [moisture, temp, humidity, rainfall];
        radarChart.update();
      }
      announce('Sensor data refreshed manually.');
    });
  }

  const radarCtx = document.getElementById('radarChart')?.getContext('2d');
  if (radarCtx) {
    radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Moisture', 'Temperature', 'Humidity', 'Rainfall'],
        datasets: [
          {
            label: 'Ideal Conditions',
            data: [70, 25, 70, 4],
            borderColor: '#34d399',
            backgroundColor: 'rgba(52, 211, 153, 0.2)',
          },
          {
            label: 'Current Values',
            data: [65, 22, 60, 3],
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Crop Suitability: Tomato',
            font: { size: 16 }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 }
          }
        }
      }
    });
  }

  const barCtx = document.getElementById('barChart')?.getContext('2d');
  if (barCtx) {
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Soil Moisture (%)', 'Temp (°C)', 'Humidity (%)', 'Rainfall (mm)'],
        datasets: [{
          label: 'Sensor Readings',
          data: [68, 23, 72, 5],
          backgroundColor: ['#34d399', '#60a5fa', '#fbbf24', '#f87171'],
          borderColor: ['#059669', '#2563eb', '#d97706', '#b91c1c'],
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Sensor Readings',
            font: { size: 16 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 }
          }
        }
      }
    });
  }

  const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Tomato', 'Carrot', 'Spinach', 'Rice'],
        datasets: [{
          label: 'Suitability (%)',
          data: [90, 75, 60, 40],
          backgroundColor: ['#34d399', '#60a5fa', '#fbbf24', '#f87171']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Crop Suitability Comparison',
            font: { size: 16 }
          }
        }
      }
    });
  }
});