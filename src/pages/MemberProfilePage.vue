<template>
  <div class="member-profile-page" v-if="member">
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>{{ member.name }}</h1>
        <p class="page-subtitle">{{ member.title }} • {{ member.role }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Вкладки -->
        <div class="tabs-container">
          <div class="tabs-header">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'profile' }"
              @click="activeTab = 'profile'"
            >
              Профиль
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'publications' }"
              @click="activeTab = 'publications'"
            >
              Публикации ({{ memberPublications.length }})
            </button>

          </div>

          <!-- Вкладка "Профиль" -->
          <div class="tab-content" v-show="activeTab === 'profile'">
            <div class="profile-card card">
              <div class="profile-left">
                <img :src="member.avatar || '/default-avatar.svg'" :alt="member.name" class="avatar" />
                <div class="qr-block">
                  <qrcode-vue :value="profileUrl" :size="128" level="M" />
                  <div class="qr-caption">Сканируйте, чтобы открыть визитку</div>
                </div>
                <div class="contacts">
                  <a v-if="member.email" :href="`mailto:${member.email}`" class="icon-link">
                    <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-mail" /></svg>
                    {{ member.email }}
                  </a>
                  <a v-if="member.phone" :href="`tel:${member.phone}`" class="icon-link">
                    <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#icon-phone" /></svg>
                    {{ member.phone }}
                  </a>
                  <div class="socials" v-if="member.socials && Object.keys(member.socials).length">
                    <a v-for="(url, key) in member.socials" :key="key" :href="url" class="icon-link" target="_blank" rel="noopener">
                      <svg class="icon" width="16" height="16" aria-hidden="true"><use :href="socialIcon(key)" /></svg>
                      {{ key }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="profile-right">
                <div class="meta">
                  <div class="meta-item"><span class="label">Локация:</span> <span class="value">{{ member.location }}</span></div>
                  <div class="meta-item"><span class="label">Опыт в группе:</span> <span class="value">{{ experienceYears }} лет</span></div>
                  <div class="meta-item"><span class="label">С нами с:</span> <span class="value">{{ joinedHuman }}</span></div>
                </div>

                <div class="interests" v-if="member.interests && member.interests.length">
                  <h3>Интересы</h3>
                  <div class="chips">
                    <span v-for="i in member.interests" :key="i" class="chip">{{ i }}</span>
                  </div>
                </div>

                <div class="education" v-if="getMemberEducation(member)">
                  <h3>Образование</h3>
                  <p class="education-text">{{ getMemberEducation(member) }}</p>
                </div>

                <div class="skills" v-if="member.skills && member.skills.length">
                  <h3>Навыки</h3>
                  <div class="skills-chips">
                    <span 
                      v-for="skill in visibleSkills" 
                      :key="skill"
                      class="skill-chip"
                    >
                      {{ skill }}
                    </span>
                    <button
                      v-if="hiddenSkillsCount > 0"
                      class="skill-chip skill-expand"
                      @click="toggleSkillsExpanded"
                    >
                      {{ skillsExpanded ? '− Скрыть' : `+ ещё ${hiddenSkillsCount}` }}
                    </button>
                  </div>
                </div>

                <div class="projects" v-if="getMemberProjects(member) && getMemberProjects(member).length">
                  <h3>Ключевые проекты</h3>
                  <ul class="projects-list">
                    <li v-for="project in getMemberProjects(member)" :key="project">{{ project }}</li>
                  </ul>
                </div>

                <div class="actions">
                  <button class="btn btn-primary" @click="printProfile">Печать</button>
                  <button class="btn btn-secondary" @click="downloadVCard">Скачать vCard</button>
                  <button class="btn" @click="copyLink">Скопировать ссылку</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Вкладка "Публикации" -->
          <div class="tab-content" v-show="activeTab === 'publications'">
            <!-- Фильтры для публикаций участника -->
            <PublicationFilters
              v-model="publicationFilters"
              :publications="memberPublications"
              @filter-change="handleFilterChange"
            />

            <!-- Статистика публикаций участника -->
            <PublicationStats
              :publications="filteredMemberPublications"
              :show-chart="true"
              :show-top-venues="true"
              :show-trends="false"
              @year-click="handleYearClick"
              @venue-click="handleVenueClick"
            />

            <!-- Список публикаций -->
            <div class="publications-grid" v-if="filteredMemberPublications.length">
              <PublicationCard
                v-for="publication in filteredMemberPublications"
                :key="publication.id"
                :publication="publication"
                :compact="false"
                :active-tags="publicationFilters.tags || []"
                @tag-click="handleTagClick"
                @article-click="handleArticleClick"
              />
            </div>

            <div v-else class="empty-publications">
              <p>У {{ member.name }} пока нет публикаций или они не соответствуют выбранным фильтрам.</p>
            </div>
          </div>


        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { team } from '../data/team.js'
import { publications as cmsPublications } from '../data/publications.js'
import CurveDivider from '../components/CurveDivider.vue'
import PublicationCard from '../components/PublicationCard.vue'
import PublicationFilters from '../components/PublicationFilters.vue'
import PublicationStats from '../components/PublicationStats.vue'
import QrcodeVue from 'qrcode.vue'
import dayjs from 'dayjs'

export default {
  name: 'MemberProfilePage',
  components: { 
    CurveDivider, 
    QrcodeVue, 
    PublicationCard, 
    PublicationFilters, 
    PublicationStats 
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const slug = computed(() => route.params.slug)
    const activeTab = ref('profile')
    const skillsExpanded = ref(false)

    const member = computed(() => team.find(m => m.slug === slug.value))

    // Фильтры для публикаций
    const publicationFilters = ref({
      types: [],
      years: [],
      venue: '',
      tags: [],
      search: '',
      sort: 'year-desc'
    })

    onMounted(() => {
      if (!member.value) {
        router.replace('/team')
      } else {
        document.title = `${member.value.name} — Визитка`
        
        // Проверяем параметр tab в URL
        const urlTab = route.query.tab
        if (urlTab === 'publications') {
          activeTab.value = 'publications'
        }
      }
    })

    // Публикации участника
    const memberPublications = computed(() => {
      if (!member.value?.publications) return []
      
      return cmsPublications.filter(pub => {
        // Проверяем есть ли участник среди авторов
        return pub.authors?.some(author => author.personId === member.value.id) ||
               member.value.publications.includes(pub.id)
      })
    })

    // Фильтрованные публикации
    const filteredMemberPublications = computed(() => {
      let result = [...memberPublications.value]

      // Фильтр по типу
      if (publicationFilters.value.types.length) {
        result = result.filter(pub => publicationFilters.value.types.includes(pub.type))
      }

      // Фильтр по году
      if (publicationFilters.value.years.length) {
        result = result.filter(pub => publicationFilters.value.years.includes(pub.year))
      }

      // Фильтр по площадке
      if (publicationFilters.value.venue) {
        result = result.filter(pub => pub.venue === publicationFilters.value.venue)
      }

      // Фильтр по тегам
      if (publicationFilters.value.tags.length) {
        result = result.filter(pub => 
          pub.tags && publicationFilters.value.tags.some(tag => pub.tags.includes(tag))
        )
      }

      // Поиск по названию
      if (publicationFilters.value.search) {
        const searchLower = publicationFilters.value.search.toLowerCase()
        result = result.filter(pub => 
          pub.title.toLowerCase().includes(searchLower)
        )
      }

      // Сортировка
      switch (publicationFilters.value.sort) {
        case 'year-desc':
          result.sort((a, b) => b.year - a.year)
          break
        case 'year-asc':
          result.sort((a, b) => a.year - b.year)
          break
        case 'venue':
          result.sort((a, b) => a.venue.localeCompare(b.venue))
          break
        case 'type':
          result.sort((a, b) => a.type.localeCompare(b.type))
          break
      }

      return result
    })

    // Для обратной совместимости
    const pubs = computed(() => memberPublications.value)

    const experienceYears = computed(() => dayjs().diff(dayjs(member.value?.joined), 'year'))
    const joinedHuman = computed(() => dayjs(member.value?.joined).format('DD.MM.YYYY'))

    const profileUrl = computed(() => `${location.origin}${location.pathname}#/team/${member.value?.slug}`)

    const socialIcon = (key) => {
      const map = { linkedin: '#icon-link', github: '#icon-link', scholar: '#icon-link' }
      return map[key] || '#icon-link'
    }

    const printProfile = () => window.print()

    const downloadVCard = () => {
      const m = member.value
      const vcf = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${m.name}`,
        `TITLE:${m.title}`,
        m.email ? `EMAIL;TYPE=INTERNET:${m.email}` : '',
        m.phone ? `TEL;TYPE=CELL:${m.phone}` : '',
        `NOTE:Роль: ${m.role}`,
        'END:VCARD'
      ].filter(Boolean).join('\n')
      const blob = new Blob([vcf], { type: 'text/vcard' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${m.slug}.vcf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
    }

    const copyLink = async () => {
      await navigator.clipboard.writeText(profileUrl.value)
      alert('Ссылка скопирована')
    }

    // Обработчики событий публикаций
    const handleFilterChange = () => {
      // Фильтры обновляются автоматически через v-model
    }

    const handleYearClick = (year) => {
      if (!publicationFilters.value.years.includes(year)) {
        publicationFilters.value.years.push(year)
      }
    }

    const handleVenueClick = (venue) => {
      publicationFilters.value.venue = venue
    }

    const handleTagClick = (tag) => {
      if (!publicationFilters.value.tags.includes(tag)) {
        publicationFilters.value.tags.push(tag)
      }
    }

    const handleArticleClick = (publication) => {
      // Открываем страницу публикации
      router.push(`/publications/${publication.slug}`)
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

    // Управление навыками
    const maxVisibleSkills = 12
    const toggleSkillsExpanded = () => {
      skillsExpanded.value = !skillsExpanded.value
    }

    const visibleSkills = computed(() => {
      if (!member.value?.skills) return []
      
      if (skillsExpanded.value) {
        return member.value.skills
      }
      
      return member.value.skills.slice(0, maxVisibleSkills)
    })

    const hiddenSkillsCount = computed(() => {
      if (!member.value?.skills || skillsExpanded.value) return 0
      return Math.max(0, member.value.skills.length - maxVisibleSkills)
    })



    return {
      member,
      pubs,
      activeTab,
      memberPublications,
      filteredMemberPublications,
      publicationFilters,
      experienceYears,
      joinedHuman,
      profileUrl,
      socialIcon,
      printProfile,
      downloadVCard,
      copyLink,
      handleFilterChange,
      handleYearClick,
      handleVenueClick,
      handleTagClick,
      handleArticleClick,
      getMemberEducation,
      getMemberProjects,
      skillsExpanded,
      toggleSkillsExpanded,
      visibleSkills,
      hiddenSkillsCount
    }
  }
}
</script>

<style scoped>
.page-header {
  background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%),
              linear-gradient(135deg, #2a0b3b, #0a0d1f 70%);
  color: #fff;
  padding: 4rem 0;
  text-align: center;
}

.section { padding: 3rem 0; }
.profile-card { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; }
.profile-left { display: flex; flex-direction: column; gap: 1rem; align-items: center; }
.avatar { width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-color); }
.qr-block { display: grid; place-items: center; gap: .5rem; background: var(--bg-secondary); border-radius: var(--radius-md); padding: .75rem; }
.qr-caption { font-size: .75rem; color: var(--text-secondary); }
.contacts { display: flex; flex-direction: column; gap: .5rem; width: 100%; }
.icon-link { color: var(--primary-color); text-decoration: none; font-size: .9rem; }
.icon-link:hover { color: var(--secondary-color); }

.profile-right { display: flex; flex-direction: column; gap: 1rem; }
.meta { display: grid; gap: .5rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.meta-item .label { color: var(--text-secondary); margin-right: .5rem; }
.chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.chip { background: var(--accent-color); color: #fff; padding: .25rem .6rem; border-radius: var(--radius-sm); font-size: .75rem; }

/* Образование в профиле */
.education {
  margin-top: 1.5rem;
}

.education h3 {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-text {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Проекты в профиле */
.projects {
  margin-top: 1.5rem;
}

.projects h3 {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.projects-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.projects-list li {
  margin-bottom: 0.25rem;
}

/* Навыки в профиле */
.skills {
  margin-top: 1.5rem;
}

.skills h3 {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.skills-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  padding: 0.375rem 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.skill-chip:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
}

.skill-chip.skill-expand {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.skill-chip.skill-expand:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-primary);
}
.pub-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.pub-item { padding: .75rem; background: var(--bg-secondary); border-radius: var(--radius-md); }
.pub-title { color: var(--text-primary); font-weight: 600; }
.pub-meta { color: var(--text-secondary); font-size: .85rem; display: flex; gap: .75rem; }
.actions { display: flex; gap: .5rem; flex-wrap: wrap; }

@media (max-width: 900px) {
  .profile-card { grid-template-columns: 1fr; }
  .avatar { width: 140px; height: 140px; }
}

/* Вкладки */
.tabs-container {
  margin-bottom: 2rem;
}

.tabs-header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

.tab-btn {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  position: relative;
}

.tab-btn:hover {
  background: var(--bg-secondary);
  color: var(--primary-color);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid var(--primary-color);
}

.tab-content {
  min-height: 400px;
}

/* Публикации */
.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.empty-publications {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-top: 2rem;
}



@media print {
  .navbar, .footer { display: none !important; }
  .page-header { padding: 0; }
  .section { padding: 0; }
  .profile-card { box-shadow: none; border: 1px solid #ddd; padding: 1rem; }
  .tabs-header { display: none !important; }
  .tab-content { display: block !important; }
}

@media (max-width: 768px) {
  .tabs-header {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .publications-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skills-chips {
    gap: 0.375rem;
  }
  
  .skill-chip {
    font-size: 0.6875rem;
    padding: 0.3125rem 0.625rem;
  }
}
</style>


