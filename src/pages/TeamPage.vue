<template>
  <div class="team-page">
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>Команда и авторы</h1>
        <p class="page-subtitle">Эксперты, исследователи и участники сообщества онтологий</p>
      </div>
    </section>



    <!-- Статистика команды -->
    <section class="stats-section">
      <div class="container">
        <h2>Статистика команды</h2>
        
        <!-- KPI карточки -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon">👥</div>
            <div class="kpi-content">
              <div class="kpi-number">{{ totalParticipants }}</div>
              <div class="kpi-label">Участников</div>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon">🏛️</div>
            <div class="kpi-content">
              <div class="kpi-number">{{ uniqueOrganizations }}</div>
              <div class="kpi-label">Организаций</div>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon">📚</div>
            <div class="kpi-content">
              <div class="kpi-number">{{ totalPublications }}</div>
              <div class="kpi-label">Публикаций</div>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon">🎯</div>
            <div class="kpi-content">
              <div class="kpi-number">{{ totalProjects }}</div>
              <div class="kpi-label">Проектов</div>
            </div>
          </div>
        </div>

        <!-- График ролей -->
        <div class="roles-chart-container">
          <h3>Распределение ролей</h3>
          <v-chart class="roles-chart" :option="rolesOption" autoresize />
        </div>

        <!-- Подвал с методом подсчёта -->
        <div class="stats-footer">
          <p class="stats-method">
            Метод подсчёта: участники включают основную команду и внешних экспертов, 
            публикации подсчитываются по уникальным работам с участием членов команды
          </p>
        </div>
      </div>
    </section>

    <!-- Список участников -->
    <section class="members-section">
      <div class="container">
        <h2>Участники сообщества ({{ allParticipantsFilteredSorted.length }})</h2>
        <div class="members-grid">
          <div 
            v-for="member in allParticipantsFilteredSorted" 
            :key="member.id" 
            class="card member-card"
          >
            <div class="member-header">
              <img :src="member.avatar || '/default-avatar.svg'" :alt="member.name" class="member-avatar" />
              <div class="member-meta">
                <h3 class="member-name">
                  <router-link v-if="member.slug" :to="`/team/${member.slug}`">{{ member.name }}</router-link>
                  <span v-else>{{ member.name }}</span>
                </h3>
                <div class="member-title">{{ member.title }}</div>
                <div class="member-role">{{ member.role }}</div>
                <div class="member-bio">{{ getMemberBio(member) }}</div>
              </div>
              <div class="qr-wrap" v-if="member.slug">
                <qrcode-vue :value="profileUrl(member)" :size="72" level="M" />
              </div>
            </div>

            <div class="member-body">
              <div class="chips">
                <span v-for="s in (member.skills || member.specializations || [])" :key="s" class="chip">{{ s }}</span>
              </div>
              <div class="links" v-if="member.socials && Object.keys(member.socials).length">
                <a v-for="(url, key) in member.socials" :key="key" :href="url" target="_blank" rel="noopener" class="icon-link">
                  <svg class="icon" width="16" height="16" aria-hidden="true"><use :href="socialIcon(key)" /></svg>
                  {{ key }}
                </a>
              </div>
              <div class="member-contacts" v-if="member.contacts">
                <a v-if="member.contacts.email" :href="`mailto:${member.contacts.email}`" class="contact-link">
                  <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-mail" /></svg>
                  {{ member.contacts.email }}
                </a>
              </div>
              <div class="member-stats">
                <router-link 
                  v-if="member.slug" 
                  :to="`/team/${member.slug}?tab=publications`"
                  class="metric metric-clickable"
                >
                  Публикации: {{ (member.publications || []).length }}
                </router-link>
                <span v-else class="metric">
                  Публикации: {{ (member.publications || []).length }}
                </span>
                <span class="metric" v-if="member.joined">Опыт: {{ experienceYears(member) }} лет</span>
              </div>
            </div>

            <div class="member-actions">
              <router-link v-if="member.slug" :to="`/team/${member.slug}`" class="btn btn-primary">Визитка</router-link>
              <button v-if="member.slug" class="btn btn-secondary" @click="printCard(member)">Печать</button>
              <a v-if="member.email || member.contacts?.email" :href="`mailto:${member.email || member.contacts?.email}`" class="btn btn-secondary">Написать</a>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Организации -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Партнерские организации</h2>
          <p class="section-subtitle">Университеты, исследовательские центры и компании</p>
        </div>
        <div class="organizations-grid">
          <div v-for="org in organizations" :key="org.name" class="organization-card">
            <div class="org-header">
              <div class="org-icon">🏛️</div>
              <h3>{{ org.name }}</h3>
            </div>
            <p class="org-description">{{ org.description }}</p>
            <div class="org-stats">
              <div class="org-stat">
                <span class="stat-label">Участников</span>
                <span class="stat-value">{{ org.participantsCount }}</span>
              </div>
              <div class="org-stat">
                <span class="stat-label">Публикаций</span>
                <span class="stat-value">{{ org.publicationsCount }}</span>
              </div>
            </div>
            <a v-if="org.website" :href="org.website" target="_blank" class="btn btn-secondary btn-sm">Сайт</a>
          </div>
                </div>
        
        <div class="team-cta">
          <a href="/#contacts" class="btn btn-primary">
            Связаться с командой
          </a>
          <router-link to="/publications" class="btn btn-secondary">
            Все публикации
          </router-link>
        </div>
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

    // Расширенные данные авторов
    const externalExperts = [
      {
        id: 'ext-1',
        name: 'Иванов Владимир Петрович',
        title: 'Профессор',
        organization: 'МГУ им. М.В. Ломоносова',
        type: 'expert',
        specializations: ['Семантический веб', 'Логика', 'ИИ'],
        contacts: { email: 'ivanov@msu.ru' },
        publications: ['pub-logic-2024'],
        avatar: null
      },
      {
        id: 'ext-2', 
        name: 'Смирнова Елена Александровна',
        title: 'Ведущий научный сотрудник',
        organization: 'СПбГУ',
        type: 'expert',
        specializations: ['Онтологии', 'Графы знаний'],
        contacts: { email: 'smirnova@spbu.ru' },
        publications: [],
        avatar: null
      },
      {
        id: 'ext-3',
        name: 'Chen Wei',
        title: 'Associate Professor', 
        organization: 'Stanford University',
        type: 'author',
        specializations: ['Knowledge Graphs', 'Machine Learning'],
        contacts: { email: 'wei.chen@stanford.edu' },
        publications: [],
        avatar: null
      }
    ]

    // Добавляем тип к основной команде
    const teamWithType = team.map(member => ({ ...member, type: 'team', organization: member.organization || 'Ontology.ru' }))
    
    // Объединенный список участников
    const allParticipants = [...teamWithType, ...externalExperts]

    const allParticipantsSorted = computed(() => {
      return [...allParticipants].sort((a, b) => a.name.localeCompare(b.name))
    })

    const allParticipantsFilteredSorted = computed(() => {
      return allParticipantsSorted.value
    })

    const skillsList = computed(() => {
      const allSkills = allParticipants.flatMap(m => m.skills || m.specializations || [])
      return Array.from(new Set(allSkills)).sort()
    })

    const organizationsList = computed(() => {
      const orgs = allParticipants.map(m => m.organization || 'Ontology.ru')
      return Array.from(new Set(orgs)).sort()
    })

    const totalParticipants = computed(() => allParticipants.length)
    const uniqueOrganizations = computed(() => organizationsList.value.length)
    const totalPublications = computed(() => {
      const allPubIds = new Set(allParticipants.flatMap(m => m.publications || []))
      return allPubIds.size
    })
    const totalProjects = computed(() => {
      // Подсчитываем уникальные проекты (условная логика)
      return 8 // Условное значение для демонстрации
    })
    const uniqueSkills = computed(() => skillsList.value.length)

    const skillsOption = computed(() => {
      const allSkills = allParticipants.flatMap(m => m.skills || m.specializations || [])
      const entries = Object.entries(
        allSkills.reduce((acc, s) => ((acc[s] = (acc[s] || 0) + 1), acc), {})
      )
      const labels = entries.slice(0, 10).map(([k]) => k) // Топ 10 навыков
      const values = entries.slice(0, 10).map(([, v]) => v)
      return {
        title: { text: 'Топ навыков сообщества' },
        tooltip: {},
        xAxis: { type: 'category', data: labels },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: values }]
      }
    })

    const pubsOption = computed(() => {
      const withPubs = allParticipants.filter(m => (m.publications || []).length > 0)
      const perMember = withPubs.map(m => ({ 
        name: m.name.split(' ').slice(0, 2).join(' '), // Сокращаем имена
        value: (m.publications || []).length 
      }))
      return {
        title: { text: 'Публикации по участникам' },
        tooltip: { trigger: 'item' },
        legend: { show: false },
        series: [{ type: 'pie', radius: '60%', data: perMember }]
      }
    })

    const orgOption = computed(() => {
      const orgCounts = allParticipants.reduce((acc, m) => {
        const org = m.organization || 'Ontology.ru'
        acc[org] = (acc[org] || 0) + 1
        return acc
      }, {})
      const data = Object.entries(orgCounts).map(([name, value]) => ({ name, value }))
      return {
        title: { text: 'Участники по организациям' },
        tooltip: { trigger: 'item' },
        legend: { show: false },
        series: [{ type: 'pie', radius: '60%', data }]
      }
    })

    const rolesOption = computed(() => {
      const roleCounts = allParticipants.reduce((acc, m) => {
        const role = m.role || m.title || 'Другое'
        acc[role] = (acc[role] || 0) + 1
        return acc
      }, {})
      const data = Object.entries(roleCounts).map(([name, value]) => ({ name, value }))
      return {
        title: { 
          text: 'Распределение ролей',
          left: 'center',
          textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        tooltip: { 
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: { 
          orient: 'vertical',
          left: 'left',
          show: true
        },
        series: [{ 
          name: 'Роли',
          type: 'pie', 
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    })

    // Организации
    const organizations = computed(() => [
      {
        name: 'МГУ им. М.В. Ломоносова',
        description: 'Ведущий классический университет России с мощной школой математики и кибернетики',
        participantsCount: allParticipants.filter(p => p.organization?.includes('МГУ')).length || 1,
        publicationsCount: 5,
        website: 'https://www.msu.ru'
      },
      {
        name: 'СПбГУ',
        description: 'Старейший университет России с развитой школой информатики и математики',
        participantsCount: allParticipants.filter(p => p.organization?.includes('СПбГУ')).length || 1,
        publicationsCount: 3,
        website: 'https://spbu.ru'
      },
      {
        name: 'Stanford University',
        description: 'Мировой лидер в области ИИ и семантических технологий',
        participantsCount: allParticipants.filter(p => p.organization?.includes('Stanford')).length || 1,
        publicationsCount: 8,
        website: 'https://stanford.edu'
      },
      {
        name: 'Ontology.ru',
        description: 'Основная исследовательская группа по онтологиям и графам знаний',
        participantsCount: teamWithType.length,
        publicationsCount: totalPublications.value,
        website: null
      }
    ])

    const memberPublications = (member) => {
      const byId = new Map(allPublications.map(p => [p.id, p]))
      return (member.publications || []).map(id => byId.get(id)).filter(Boolean)
    }

    const experienceYears = (member) => {
      if (!member.joined) return 0
      return dayjs().diff(dayjs(member.joined), 'year')
    }

    const profileUrl = (member) => `${location.origin}${location.pathname}#/team/${member.slug}`

    const socialIcon = (key) => {
      const map = { linkedin: '#icon-link', github: '#icon-link', scholar: '#icon-link' }
      return map[key] || '#icon-link'
    }

    const getTypeLabel = (type) => {
      const labels = {
        'team': 'Основная команда',
        'expert': 'Внешний эксперт',
        'author': 'Автор публикаций'
      }
      return labels[type] || type
    }

    const getMemberBio = (member) => {
      if (member.bio_short && member.bio_short.trim()) {
        return member.bio_short
      }
      
      // Генерируем заглушку
      const role = member.role || member.title || 'специалист'
      const firstInterest = member.interests?.[0] || 'онтологии'
      const secondInterest = member.interests?.[1] || 'графы знаний'
      
      return `Я — ${role}. Окончил(а) МГУ им. М.В. Ломоносова, ВМК, 2018. Занимаюсь ${firstInterest.toLowerCase()} и ${secondInterest.toLowerCase()}. Интересы: ${firstInterest.toLowerCase()}, ${secondInterest.toLowerCase()}.`
    }

    const getMemberEducation = (member) => {
      if (member.education && member.education.trim()) {
        return member.education
      }
      return 'МГУ им. М.В. Ломоносова, ВМК, 2018'
    }

    const getMemberProjects = (member) => {
      if (member.projects_brief && member.projects_brief.length) {
        return member.projects_brief
      }
      return ['Онтология предметной области (пилот)', 'API графа знаний']
    }

    const printCard = () => window.print()

    return {
      allParticipantsFilteredSorted,
      skillsList,
      organizationsList,
      totalParticipants,
      uniqueOrganizations,
      totalPublications,
      totalProjects,
      uniqueSkills,
      skillsOption,
      pubsOption,
      orgOption,
      rolesOption,
      organizations,
      allPublications,
      memberPublications,
      experienceYears,
      profileUrl,
      socialIcon,
      getTypeLabel,
      getMemberBio,
      getMemberEducation,
      getMemberProjects,
      printCard
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

.stats-section { 
  background: var(--bg-secondary); 
  padding: 4rem 0; 
}

/* KPI карточки */
.kpi-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
  gap: 1.5rem; 
  margin-bottom: 3rem; 
}

.kpi-card { 
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem; 
  border-radius: var(--radius-lg); 
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(102, 126, 234, 0.3);
}

.kpi-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.1);
  border-radius: var(--radius-lg);
}

.kpi-content {
  flex: 1;
}

.kpi-number { 
  font-size: 2rem; 
  font-weight: 800; 
  color: var(--primary-color); 
  line-height: 1;
  margin-bottom: 0.25rem;
}

.kpi-label { 
  color: var(--text-secondary); 
  font-size: 0.875rem; 
  font-weight: 500;
}

/* График ролей */
.roles-chart-container {
  margin-bottom: 2rem;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.roles-chart-container h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.roles-chart { 
  height: 300px; 
}

/* Подвал статистики */
.stats-footer {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.stats-method {
  color: var(--text-light);
  font-size: 0.8125rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
}



.members-section { padding: 4rem 0; }
.members-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; }
.member-card { display: flex; flex-direction: column; gap: 1rem; }
.member-header { display: grid; grid-template-columns: 72px 1fr auto; gap: 1rem; align-items: center; }
.member-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-color); }
.member-meta { min-width: 0; }
.member-name { margin: 0; color: var(--primary-color); }
.member-title { color: var(--text-primary); font-weight: 600; }
.member-role { 
  color: var(--primary-color); 
  font-size: 0.875rem; 
  font-weight: 600; 
  margin-bottom: 0.5rem;
}
.member-bio { 
  color: var(--text-secondary); 
  font-size: 0.875rem; 
  line-height: 1.4;
  margin-top: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.member-organization { color: var(--text-secondary); font-size: .875rem; }
.member-type { color: var(--primary-color); font-size: .75rem; text-transform: uppercase; font-weight: 600; }
.qr-wrap { display: flex; align-items: center; }
.chips { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .5rem; }
.chip { background: var(--accent-color); color: #fff; padding: .25rem .6rem; border-radius: var(--radius-sm); font-size: .75rem; }
.links { display: flex; gap: .75rem; flex-wrap: wrap; }
.member-contacts { display: flex; gap: .75rem; flex-wrap: wrap; margin-bottom: .5rem; }
.contact-link { color: var(--primary-color); text-decoration: none; display: flex; align-items: center; gap: .25rem; font-size: .875rem; }
.contact-link:hover { color: var(--secondary-color); }
.member-stats { display: flex; gap: 1rem; color: var(--text-secondary); font-size: .875rem; }

.metric-clickable {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.metric-clickable:hover {
  color: var(--secondary-color);
  border-bottom-color: var(--secondary-color);
}

.metric-clickable:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
.member-actions { display: flex; gap: .5rem; }

.group-pubs { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.pub-row { background: var(--bg-primary); border-radius: var(--radius-md); padding: 1rem; box-shadow: var(--shadow-sm); }
.pub-row-main { display: flex; justify-content: space-between; gap: .75rem; align-items: baseline; }
.pub-row .title { color: var(--primary-color); font-weight: 600; text-decoration: none; }
.pub-row .title:hover { color: var(--secondary-color); }
.pub-row .meta { display: flex; gap: .75rem; color: var(--text-secondary); font-size: .85rem; }
.pub-row .authors { color: var(--text-secondary); font-size: .9rem; margin-top: .25rem; }

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .kpi-card {
    padding: 1.25rem;
  }
  
  .kpi-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }
  
  .kpi-number {
    font-size: 1.75rem;
  }
  
  .roles-chart-container {
    padding: 1.5rem;
  }
  
  .roles-chart {
    height: 250px;
  }
  
  .members-grid { 
    grid-template-columns: 1fr; 
  }
  
  .member-header { 
    grid-template-columns: 56px 1fr; 
    grid-auto-rows: auto; 
  }
  
  .qr-wrap { 
    display: none; 
  }
}

/* Организации */
.organizations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.organization-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease;
}

.organization-card:hover {
  transform: translateY(-5px);
}

.org-header {
  margin-bottom: 1rem;
}

.org-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.organization-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.org-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.org-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.org-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.org-stat .stat-label {
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.org-stat .stat-value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Печать визиток */
@media print {
  .navbar, .footer, .filters-section, .stats-section { display: none !important; }
  .members-grid { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
  .member-card { box-shadow: none; border: 1px solid #ddd; padding: 1rem; }
}

/* Адаптивность */
@media (max-width: 768px) {
  .organizations-grid {
    grid-template-columns: 1fr;
  }
  
  .org-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .team-cta {
    flex-direction: column;
    align-items: center;
  }
}

/* CTA секция */
.team-cta {
  text-align: center;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>



