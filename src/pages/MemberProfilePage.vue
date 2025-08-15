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

            <div class="skills" v-if="member.skills && member.skills.length">
              <h3>Навыки</h3>
              <div class="chips">
                <span v-for="s in member.skills" :key="s" class="chip">{{ s }}</span>
              </div>
            </div>

            <div class="publications" v-if="pubs.length">
              <h3>Публикации</h3>
              <ul class="pub-list">
                <li v-for="p in pubs" :key="p.id" class="pub-item">
                  <div class="pub-title">{{ p.title }}</div>
                  <div class="pub-meta">
                    <span class="venue">{{ p.venue }}</span>
                    <span class="year">{{ p.year }}</span>
                  </div>
                </li>
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
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { team } from '../data/team.js'
import { publications as cmsPublications } from '../data/publications.js'
import CurveDivider from '../components/CurveDivider.vue'
import QrcodeVue from 'qrcode.vue'
import dayjs from 'dayjs'

export default {
  name: 'MemberProfilePage',
  components: { CurveDivider, QrcodeVue },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const slug = computed(() => route.params.slug)

    const member = computed(() => team.find(m => m.slug === slug.value))

    onMounted(() => {
      if (!member.value) {
        router.replace('/team')
      } else {
        document.title = `${member.value.name} — Визитка`
      }
    })

    const pubs = computed(() => {
      const byId = new Map(cmsPublications.map(p => [p.id, p]))
      return (member.value?.publications || []).map(id => byId.get(id)).filter(Boolean)
    })

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

    return {
      member,
      pubs,
      experienceYears,
      joinedHuman,
      profileUrl,
      socialIcon,
      printProfile,
      downloadVCard,
      copyLink
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
.pub-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.pub-item { padding: .75rem; background: var(--bg-secondary); border-radius: var(--radius-md); }
.pub-title { color: var(--text-primary); font-weight: 600; }
.pub-meta { color: var(--text-secondary); font-size: .85rem; display: flex; gap: .75rem; }
.actions { display: flex; gap: .5rem; flex-wrap: wrap; }

@media (max-width: 900px) {
  .profile-card { grid-template-columns: 1fr; }
  .avatar { width: 140px; height: 140px; }
}

@media print {
  .navbar, .footer { display: none !important; }
  .page-header { padding: 0; }
  .section { padding: 0; }
  .profile-card { box-shadow: none; border: 1px solid #ddd; padding: 1rem; }
}
</style>


