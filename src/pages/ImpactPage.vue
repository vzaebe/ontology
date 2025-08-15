<template>
  <div class="impact-page">
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>Impact</h1>
        <p class="page-subtitle">Статистика, области применения и эффекты</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid">
          <v-chart class="chart" :option="areasOption" autoresize />
          <v-chart class="chart" :option="kpiOption" autoresize />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CurveDivider from '../components/CurveDivider.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

export default {
  name: 'ImpactPage',
  components: { CurveDivider, VChart },
  setup() {
    const areasOption = {
      title: { text: 'Области применения' },
      tooltip: { trigger: 'item' },
      legend: {},
      series: [{ type: 'pie', radius: '60%', data: [
        { name: 'Каталоги данных', value: 35 },
        { name: 'Поиск/Рекомендации', value: 30 },
        { name: 'Автоматизация', value: 25 },
        { name: 'Соответствие требованиям', value: 10 }
      ] }]
    }
    const kpiOption = {
      title: { text: 'KPI' },
      tooltip: {},
      xAxis: { type: 'category', data: ['Сроки', 'Качество', 'Повторное использование', 'Интеграция'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [25, 40, 30, 35] }]
    }
    return { areasOption, kpiOption }
  }
}
</script>

<style scoped>
.page-header { background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%), linear-gradient(135deg, #2a0b3b, #0a0d1f 70%); color: #fff; padding: 4rem 0; text-align: center; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
.chart { height: 320px; background: var(--bg-primary); border-radius: var(--radius-lg); padding: .5rem; }
</style>


