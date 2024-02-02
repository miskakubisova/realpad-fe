<template>
  <div>
    <select v-model="selectedCity" @change="fetchChartData">
      <option disabled value="">Please select a city</option>
      <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
    </select>

    <div v-if="selectedCity">
      <h1>Temperature and Feels Like Temperature Chart</h1>
      <LineChart :chartData="temperatureChartData" :options="chartOptions" />
      <h1>Humidity and Pressure Chart</h1>
      <LineChart :chartData="environmentChartData" :options="chartOptions" />
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const cities = ref([]);
const selectedCity = ref('');
const temperatureChartData = ref(null);
const environmentChartData = ref(null);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

async function fetchCities() {
  try {
    const response = await fetch('cities');
    cities.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch cities:", error);
  }
}

async function fetchChartData() {
  if (!selectedCity.value) return; // Do nothing if no city is selected

  try {
    const response = await fetch(`forecast/${selectedCity.value}`);
    const data = await response.json();
    const items = data.responseItems;

    // Chart data for temperature and feels like temperature
    temperatureChartData.value = {
      labels: items.map(item => formatDateString(item.date)),
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: 'rgba(114,54,235,0.2)',
          borderColor: 'rgb(135,54,235)',
          data: items.map(item => item.temperature),
          fill: false,
        },
        {
          label: 'Feels Like Temperature',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: items.map(item => item.feelsLikeTemperature),
          fill: false,
        },
      ],
    };

    // Chart data for humidity and pressure
    environmentChartData.value = {
      labels: items.map(item => formatDateString(item.date)),
      datasets: [
        {
          label: 'Pressure',
          backgroundColor: 'rgba(255,99,159,0.2)',
          borderColor: 'rgb(255,99,177)',
          data: items.map(item => item.pressure),
          fill: false,
        },
        {
          label: 'Humidity',
          backgroundColor: 'rgba(235,54,54,0.2)',
          borderColor: 'rgb(235,54,54)',
          data: items.map(item => item.humidity),
          fill: false,
        },
      ],
    };
  } catch (error) {
    console.error(`Failed to fetch data for ${selectedCity.value}:`, error);
  }
}

onMounted(() => {
  fetchCities();
});
</script>
