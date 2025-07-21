

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

  soilMoistureEl.textContent = soilMoisture + '%';
  temperatureEl.textContent = temperature + '°C';
  humidityEl.textContent = humidity + '%';
  rainfallEl.textContent = rainfall + 'mm';

  return { soilMoisture: parseFloat(soilMoisture), temperature: parseFloat(temperature), humidity: parseFloat(humidity), rainfall: parseFloat(rainfall) };
}

function simulateProgress(callback) {
  const progress = document.getElementById('progress');
  const progressBar = progress.querySelector('.progress-bar');
  let width = 0;
  progress.classList.remove('hidden');
  progress.setAttribute('aria-valuenow', '0');
  progressBar.style.width = '0%';

  const interval = setInterval(() => {
    width += 4;
    progressBar.style.width = width + '%';
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

  const sensorValues = updateSensorData(crop, area);


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

function updateSuggestions(crop, area) {
  const suggestionEl = document.getElementById('suggestion-content');
  if (!suggestionEl) return;

  suggestionEl.innerHTML = '<p class="text-gray-600"><i class="fas fa-spinner fa-spin mr-2"></i>Loading suggestions...</p>';

  if (!crop || !area) {
    suggestionEl.innerHTML = `
      <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="fas fa-info-circle text-yellow-500 text-xl"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              Please select both a crop and area to get personalized farming suggestions.
            </p>
          </div>
        </div>
      </div>`;
    return;
  }

  const ideal = cropSensorRanges[crop];
  if (!ideal) {
    suggestionEl.innerHTML = `
      <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="fas fa-exclamation-circle text-red-500 text-xl"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              Invalid crop selected. Please choose a valid crop from the list.
            </p>
          </div>
        </div>
      </div>`;
    return;
  }

  const areaTips = {
    'North Field': [
      'Consider using cold-resistant crop varieties.',
      'Install windbreaks to protect from northern winds.',
      'Monitor soil temperature closely in early spring.'
    ],
    'South Field': [
      'Implement shade systems during peak summer months.',
      'Increase irrigation frequency in hot weather.',
      'Consider drought-resistant crop varieties.'
    ],
    'Coastal Region': [
      'Protect crops from salt spray with wind barriers.',
      'Monitor soil salinity levels regularly.',
      'Use raised beds to improve drainage.'
    ]
  };

  const soilTips = {
    Loamy: 'Loamy soil is ideal for most crops. Maintain organic matter with regular compost additions.',
    Sandy: 'Sandy soil drains quickly. Add organic matter to improve water retention.',
    Clay: 'Clay soil holds water well but may need aeration. Consider adding sand and organic matter.',
    Silt: 'Silt soil is fertile but can compact easily. Avoid working soil when wet.'
  };

  const soilType = document.getElementById('soilType').value;
  const soilTip = soilTips[soilType] || 'Select a valid soil type for specific soil management tips.';

  const irrigationTips = [
    'Water early in the morning to reduce evaporation.',
    'Use drip irrigation system for water efficiency.',
    'Monitor soil moisture levels before irrigating.',
    'Adjust irrigation schedule based on rainfall forecasts.'
  ];
  const randomIrrigationTip = irrigationTips[Math.floor(Math.random() * irrigationTips.length)];

  const pestTips = [
    'Rotate crops annually to prevent pest buildup.',
    'Use companion planting techniques to deter pests naturally.',
    'Monitor crops for pests weekly during the growing season.',
    'Consider using biological pest control methods.'
  ];
  const randomPestTip = pestTips[Math.floor(Math.random() * pestTips.length)];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let seasonalAdvice = '';
  if (currentMonth >= 2 && currentMonth <= 4) {
    seasonalAdvice = 'Spring planting season: Prepare beds and start early crops.';
  } else if (currentMonth >= 5 && currentMonth <= 7) {
    seasonalAdvice = 'Summer growing season: Monitor water needs and weed regularly.';
  } else if (currentMonth >= 8 && currentMonth <= 10) {
    seasonalAdvice = 'Fall harvest season: Plan for succession planting and soil amendment.';
  } else {
    seasonalAdvice = 'Winter season: Plan next year\'s crops and maintain equipment.';
  }

  suggestionEl.innerHTML = `
    <div class="space-y-4">
      <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h3 class="font-bold text-lg text-green-800 mb-2">🌱 ${crop} Cultivation in ${area}</h3>
        <ul class="list-disc list-inside space-y-1 text-green-700">
          <li>Maintain soil moisture between <strong>${ideal.soilMoisture[0]}–${ideal.soilMoisture[1]}%</strong></li>
          <li>Keep temperature within <strong>${ideal.temperature[0]}–${ideal.temperature[1]}°C</strong></li>
          <li>Optimal humidity range: <strong>${ideal.humidity[0]}–${ideal.humidity[1]}%</strong></li>
          <li>Expected rainfall: <strong>${ideal.rainfall[0]}–${ideal.rainfall[1]}mm</strong></li>
        </ul>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h3 class="font-bold text-lg text-blue-800 mb-2">📍 ${area}-Specific Advice</h3>
        <ul class="list-disc list-inside space-y-1 text-blue-700">
          ${areaTips[area].map(tip => `<li>${tip}</li>`).join('')}
        </ul>
      </div>

      <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <h3 class="font-bold text-lg text-yellow-800 mb-2">💧 Irrigation Tip</h3>
        <p class="text-yellow-700">${randomIrrigationTip}</p>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h3 class="font-bold text-lg text-purple-800 mb-2">🛡 Pest Management</h3>
        <p class="text-purple-700">${randomPestTip}</p>
      </div>

      <div class="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
        <h3 class="font-bold text-lg text-amber-800 mb-2">📅 Seasonal Advice</h3>
        <p class="text-amber-700">${seasonalAdvice}</p>
      </div>

      ${soilType ? `
        <div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <h3 class="font-bold text-lg text-indigo-800 mb-2">🌍 Soil Management (${soilType})</h3>
          <p class="text-indigo-700">${soilTip}</p>
        </div>
      ` : ''}
    </div>`;

  announce(`Suggestions updated for ${crop} in ${area}.`);
}

document.addEventListener('DOMContentLoaded', () => {
  let currentCrop = null;
  let currentArea = '';

  
  const cropSelect = document.getElementById('crop');
  Object.keys(cropSensorRanges).forEach(crop => {
    const option = document.createElement('option');
    option.value = crop;
    option.textContent = crop;
    cropSelect.appendChild(option);
  });

  
  updateSensorData();

 
  const sensorInterval = setInterval(() => {
    const sensorValues = updateSensorData(currentCrop, currentArea);
    announce('Sensor data updated automatically.');
  }, 10000);

  
  for (let i = 0; i < 3; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    document.body.appendChild(cloud);
  }

  
  const tractor = document.createElement('div');
  tractor.className = 'tractor';
  document.body.appendChild(tractor);

  
  const toggleButton = document.getElementById('night-mode-toggle');
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    toggleButton.setAttribute('aria-pressed', document.body.classList.contains('night-mode'));
    announce(document.body.classList.contains('night-mode') ? 'Night mode enabled.' : 'Day mode enabled.');
  });

  
  const cropForm = document.getElementById('cropForm');
  const resetButton = document.getElementById('resetForm');
  const output = document.getElementById('output');
  const progress = document.getElementById('progress');
  const errors = document.querySelectorAll('.error');

  cropForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const crop = document.getElementById('crop').value;
    const soil = document.getElementById('soilType').value;
    const area = document.getElementById('area').value;

    errors.forEach(error => {
      error.classList.add('hidden');
      error.textContent = error.dataset.originalText;
    });

    let isValid = true;
    if (!crop) {
      document.getElementById('crop-error').classList.remove('hidden');
      isValid = false;
    }
    if (!soil) {
      document.getElementById('soilType-error').classList.remove('hidden');
      isValid = false;
    }
    if (!area) {
      document.getElementById('area-error').classList.remove('hidden');
      isValid = false;
    }

    if (!isValid) {
      console.warn('Form validation failed:', { crop, soil, area });
      announce('Please select all fields.');
      return;
    }

    if (!cropSensorRanges[crop]) {
      console.error('Invalid crop selected:', crop);
      document.getElementById('crop-error').textContent = 'Invalid crop selected. Please choose from the list.';
      document.getElementById('crop-error').classList.remove('hidden');
      announce('Invalid crop selected. Please choose from the list.');
      return;
    }

    currentCrop = crop;
    currentArea = area;
    const suitabilityScore = Math.floor(75 + Math.random() * 20);
    simulateProgress(() => {
      displayResult(crop, soil, area, suitabilityScore);
      updateSuggestions(crop, area);
    });
  });

  resetButton.addEventListener('click', () => {
    cropForm.reset();
    output.innerHTML = '';
    progress.classList.add('hidden');
    errors.forEach(error => {
      error.classList.add('hidden');
      error.textContent = error.dataset.originalText;
    });
    currentCrop = null;
    currentArea = '';
    const sensorValues = updateSensorData();
   
    announce('Form reset. Sensors restored to default.');
  });

  
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
  refreshBtn.addEventListener('click', () => {
    const moisture = Math.floor(Math.random() * 21) + 60; 
    const temp = Math.floor(Math.random() * 11) + 20; 
    const humidity = Math.floor(Math.random() * 21) + 60; 
    const rainfall = Math.floor(Math.random() * 4) + 2; 

    document.getElementById('soilMoisture').textContent = moisture + '%';
    document.getElementById('temperature').textContent = temp + '°C';
    document.getElementById('humidity').textContent = humidity + '%';
    document.getElementById('rainfall').textContent = rainfall + ' mm';

    if (barChart && radarChart) {
      barChart.data.datasets[0].data = [moisture, temp, humidity, rainfall];
      barChart.update();
      radarChart.data.datasets[1].data = [moisture, temp, humidity, rainfall];
      radarChart.update();
    }

    announce('Sensor data refreshed manually.');
  });

  
  updateSuggestions();
});


document.getElementById('cropForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const crop = document.getElementById('crop').value;
  const area = document.getElementById('area').value;
  updateSuggestions(crop, area);
});