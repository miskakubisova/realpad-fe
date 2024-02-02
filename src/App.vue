<template>
  <div class="app-container">
    <img alt="Realpad logo" src="@/assets/logo.webp" class="app-logo">
    <ForecastDisplay/>
  </div>
</template>

<script>
import ForecastDisplay from '@/components/ForecastDisplay.vue'

export default {
  name: 'App',
  components: {
    ForecastDisplay
  }
}
</script>

<style>
.app-container {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding-top: 60px;
}

.app-logo {
  width: 250px;
  height: auto;
}
</style>
