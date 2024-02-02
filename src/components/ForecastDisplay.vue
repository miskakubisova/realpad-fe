<template>
  <div class="box">
    <select v-model="selectedCity" @change="fetchChartData" aria-label="Select a city" class="city-selector">
      <option disabled value="">Please select a city</option>
      <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
    </select>

    <div v-if="selectedCity">
      <h1>Temperature and Feels Like Temperature Chart</h1>
      <LineChart :chartData="temperatureChartData" :options="chartOptions"/>
      <h1>Humidity and Pressure Chart</h1>
      <LineChart :chartData="environmentChartData" :options="chartOptions"/>
    </div>
  </div>
</template>

<script setup>
import './ForecastDisplay.css';
import { ref, onMounted } from 'vue';
import { LineChart } from 'vue-chart-3';
import { fetchCities, fetchForecastData } from '@/api';
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

onMounted(async () => {
  cities.value = await fetchCities();
});

const fetchChartData = async () => {
  if (!selectedCity.value) return;
  const { temperatureData, environmentData } = await fetchForecastData(selectedCity.value);
  temperatureChartData.value = temperatureData;
  environmentChartData.value = environmentData;
};
</script>
