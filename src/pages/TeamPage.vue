<template>
  <div class="team-page">
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>Исследовательская группа</h1>
        <p class="page-subtitle">Команда из 5 человек: роли, навыки, публикации</p>
      </div>
    </section>

    <!-- Фильтры -->
    <section class="filters-section">
      <div class="container">
        <div class="filters">
          <div class="filter-group">
            <label for="search-team">Поиск</label>
            <input id="search-team" v-model="filters.search" type="text" placeholder="Имя, роль, навык..." class="filter-input" />
          </div>
          <div class="filter-group">
            <label for="skill-filter">Навык</label>
            <select id="skill-filter" v-model="filters.skill" class="filter-select">
              <option value="">Все навыки</option>
              <option v-for="s in skillsList" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <button class="btn btn-secondary" @click="clearFilters">Очистить</button>
        </div>
      </div>
    </section>

    <!-- Статистика команды -->
    <section class="stats-section">
      <div class="container">
        <h2>Общая статистика</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-users" /></svg></div>
            <div class="stat-number">{{ teamCount }}</div>
            <div class="stat-label">Участников</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-book" /></svg></div>
            <div class="stat-number">{{ totalPublications }}</div>
            <div class="stat-label">Публикаций</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-clipboard" /></svg></div>
            <div class="stat-number">{{ uniqueSkills }}</div>
            <div class="stat-label">Навыков</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true"><svg class="icon" width="24" height="24"><use href="#icon-trending-up" /></svg></div>
            <div class="stat-number">{{ yearsTogether }}</div>
            <div class="stat-label">Лет вместе</div>
          </div>
        </div>

        <!-- Диаграммы -->
        <div class="charts-grid">
          <v-chart class="chart" :option="skillsOption" autoresize />
          <v-chart class="chart" :option="pubsOption" autoresize />
        </div>
      </div>
    </section>

    <!-- Список участников -->
    <section class="members-section">
      <div class="container">
        <div class="members-grid">
          <div 
            v-for="member in teamFilteredSorted" 
            :key="member.id" 
            class="card member-card"
          >
            <div class="member-header">
              <img :src="member.avatar || '/default-avatar.svg'" :alt="member.name" class="member-avatar" />
              <div class="member-meta">
                <h3 class="member-name">
                  <router-link :to="`/team/${member.slug}`">{{ member.name }}</router-link>
                </h3>
                <div class="member-title">{{ member.title }}</div>
                <div class="member-role">{{ member.role }}</div>
              </div>
              <div class="qr-wrap">
                <qrcode-vue :value="profileUrl(member)" :size="72" level="M" />
              </div>
            </div>

            <div class="member-body">
              <div class="chips">
                <span v-for="s in member.skills" :key="s" class="chip">{{ s }}</span>
              </div>
              <div class="links" v-if="member.socials && Object.keys(member.socials).length">
                <a v-for="(url, key) in member.socials" :key="key" :href="url" target="_blank" rel="noopener" class="icon-link">
                  <svg class="icon" width="16" height="16" aria-hidden="true"><use :href="socialIcon(key)" /></svg>
                  {{ key }}
                </a>
              </div>
              <div class="member-stats">
                <span class="metric">Публикаций: {{ memberPublications(member).length }}</span>
                <span class="metric">Опыт: {{ experienceYears(member) }} лет</span>
              </div>
            </div>

            <div class="member-actions">
              <router-link :to="`/team/${member.slug}`" class="btn btn-primary">Визитка</router-link>
              <button class="btn btn-secondary" @click="printCard(member)">Печать</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Публикации группы -->
    <section class="section bg-secondary">
      <div class="container">
        <div class="section-header">
          <h2>Публикации группы</h2>
          <p class="section-subtitle">Совокупный список по авторам команды</p>
        </div>
        <ul class="group-pubs">
          <li v-for="p in groupPubs" :key="p.id" class="pub-row">
            <div class="pub-row-main">
              <router-link :to="`/pub/${p.id}`" class="title">{{ p.title }}</router-link>
              <span class="meta">
                <span class="venue">{{ p.venue }}</span>
                <span class="year">{{ p.year }}</span>
              </span>
            </div>
            <div v-if="p.authors?.length" class="authors">{{ p.authors.join(', ') }}</div>
          </li>
        </ul>
      </div>
    </section>
  </div>
  </template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { team } from '../data/team.js'
import { publications as cmsPublications } from '../data/publications.js'
import CurveDivider from '../components/CurveDivider.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import QrcodeVue from 'qrcode.vue'
import dayjs from 'dayjs'

use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

export default {
  name: 'TeamPage',
  components: { CurveDivider, VChart, QrcodeVue },
  setup() {
    const allPublications = cmsPublications

    const filters = ref({ search: '', skill: '' })

    const teamSorted = computed(() => {
      return [...team].sort((a, b) => a.name.localeCompare(b.name))
    })

    const teamFilteredSorted = computed(() => {
      const s = filters.value.search.trim().toLowerCase()
      const skill = filters.value.skill
      return teamSorted.value.filter(m => {
        const inSearch = !s ||
          m.name.toLowerCase().includes(s) ||
          (m.role || '').toLowerCase().includes(s) ||
          (m.title || '').toLowerCase().includes(s) ||
          m.skills.some(x => x.toLowerCase().includes(s))
        const inSkill = !skill || m.skills.includes(skill)
        return inSearch && inSkill
      })
    })

    const skillsList = computed(() => Array.from(new Set(team.flatMap(m => m.skills))).sort())

    const teamCount = computed(() => team.length)
    const totalPublications = computed(() => team.reduce((n, m) => n + m.publications.length, 0))
    const uniqueSkills = computed(() => new Set(team.flatMap(m => m.skills)).size)

    const yearsTogether = computed(() => {
      const minJoined = team.map(m => dayjs(m.joined)).sort((a, b) => a - b)[0]
      const diff = dayjs().diff(minJoined, 'year')
      return diff
    })

    const skillsOption = computed(() => {
      const entries = Object.entries(
        team.flatMap(m => m.skills).reduce((acc, s) => ((acc[s] = (acc[s] || 0) + 1), acc), {})
      )
      const labels = entries.map(([k]) => k)
      const values = entries.map(([, v]) => v)
      return {
        title: { text: 'Навыки команды' },
        tooltip: {},
        xAxis: { type: 'category', data: labels },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: values }]
      }
    })

    const pubsOption = computed(() => {
      const perMember = team.map(m => ({ name: m.name, value: m.publications.length }))
      return {
        title: { text: 'Публикации по участникам' },
        tooltip: { trigger: 'item' },
        legend: {},
        series: [{ type: 'pie', radius: '60%', data: perMember }]
      }
    })

    const memberPublications = (member) => {
      const byId = new Map(allPublications.map(p => [p.id, p]))
      return member.publications.map(id => byId.get(id)).filter(Boolean)
    }

    const experienceYears = (member) => dayjs().diff(dayjs(member.joined), 'year')

    const profileUrl = (member) => `${location.origin}${location.pathname}#/team/${member.slug}`

    const socialIcon = (key) => {
      const map = { linkedin: '#icon-link', github: '#icon-link', scholar: '#icon-link' }
      return map[key] || '#icon-link'
    }

    const groupPubs = computed(() => {
      const ids = new Set(team.flatMap(m => m.publications))
      const byId = new Map(allPublications.map(p => [p.id, p]))
      return Array.from(ids).map(id => byId.get(id)).filter(Boolean)
    })

    const printCard = () => window.print()

    const clearFilters = () => { filters.value = { search: '', skill: '' } }

    return {
      teamSorted,
      teamFilteredSorted,
      filters,
      skillsList,
      teamCount,
      totalPublications,
      uniqueSkills,
      yearsTogether,
      skillsOption,
      pubsOption,
      memberPublications,
      experienceYears,
      profileUrl,
      socialIcon,
      printCard,
      clearFilters,
      groupPubs
    }
  }
}
</script>

<style scoped>
.page-header {
  background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%),
              linear-gradient(135deg, #2a0b3b, #0a0d1f 70%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.stats-section { background: var(--bg-secondary); padding: 4rem 0; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
.stat-card { background: var(--bg-primary); padding: 2rem; border-radius: var(--radius-lg); text-align: center; box-shadow: var(--shadow-md); }
.stat-number { font-size: 2.25rem; font-weight: 800; color: var(--primary-color); }
.stat-label { color: var(--text-secondary); font-size: 0.875rem; text-transform: uppercase; letter-spacing: .5px; }

.charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
.chart { height: 280px; background: var(--bg-primary); border-radius: var(--radius-lg); padding: .5rem; }

.filters-section { background: var(--bg-secondary); padding: 2rem 0; border-bottom: 1px solid var(--bg-tertiary); }
.filters { display: flex; gap: 1rem; align-items: end; flex-wrap: wrap; }
.filter-group { display: flex; flex-direction: column; gap: .5rem; }
.filter-select, .filter-input { padding: .6rem .75rem; border: 1px solid var(--text-light); border-radius: var(--radius-md); background: var(--bg-primary); }

.members-section { padding: 4rem 0; }
.members-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; }
.member-card { display: flex; flex-direction: column; gap: 1rem; }
.member-header { display: grid; grid-template-columns: 72px 1fr auto; gap: 1rem; align-items: center; }
.member-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-color); }
.member-meta { min-width: 0; }
.member-name { margin: 0; color: var(--primary-color); }
.member-title { color: var(--text-primary); font-weight: 600; }
.member-role { color: var(--text-secondary); font-size: .875rem; }
.qr-wrap { display: flex; align-items: center; }
.chips { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .5rem; }
.chip { background: var(--accent-color); color: #fff; padding: .25rem .6rem; border-radius: var(--radius-sm); font-size: .75rem; }
.links { display: flex; gap: .75rem; flex-wrap: wrap; }
.member-stats { display: flex; gap: 1rem; color: var(--text-secondary); font-size: .875rem; }
.member-actions { display: flex; gap: .5rem; }

.group-pubs { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.pub-row { background: var(--bg-primary); border-radius: var(--radius-md); padding: 1rem; box-shadow: var(--shadow-sm); }
.pub-row-main { display: flex; justify-content: space-between; gap: .75rem; align-items: baseline; }
.pub-row .title { color: var(--primary-color); font-weight: 600; text-decoration: none; }
.pub-row .title:hover { color: var(--secondary-color); }
.pub-row .meta { display: flex; gap: .75rem; color: var(--text-secondary); font-size: .85rem; }
.pub-row .authors { color: var(--text-secondary); font-size: .9rem; margin-top: .25rem; }

@media (max-width: 768px) {
  .members-grid { grid-template-columns: 1fr; }
  .member-header { grid-template-columns: 56px 1fr; grid-auto-rows: auto; }
  .qr-wrap { display: none; }
}

/* Печать визиток */
@media print {
  .navbar, .footer, .filters-section, .stats-section { display: none !important; }
  .members-grid { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
  .member-card { box-shadow: none; border: 1px solid #ddd; padding: 1rem; }
}
</style>


