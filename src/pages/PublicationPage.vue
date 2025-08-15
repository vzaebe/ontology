<template>
  <div v-if="article" class="publication-page">
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <p class="page-subtitle">
          <span class="venue">{{ article.journal }}</span>
          <span class="year">{{ article.year }}</span>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="card pub-card">
          <div class="meta">
            <div class="row"><span class="label">Авторы:</span> <span class="value authors">
              <template v-for="(a, idx) in authorsWithLinks" :key="idx">
                <router-link v-if="a.link" :to="a.link">{{ a.name }}</router-link>
                <span v-else>{{ a.name }}</span>
                <span v-if="idx < authorsWithLinks.length - 1">, </span>
              </template>
            </span></div>
            <div class="row" v-if="article.doi"><span class="label">DOI:</span> <span class="value"><a :href="`https://doi.org/${article.doi}`" target="_blank" rel="noopener">{{ article.doi }}</a></span></div>
            <div class="row" v-if="article.keywords?.length"><span class="label">Ключевые слова:</span> <span class="value tags"><span class="tag" v-for="k in article.keywords" :key="k">{{ k }}</span></span></div>
            <div class="row" v-if="article.metrics"><span class="label">Метрики:</span> <span class="value">📊 {{ article.metrics.citations || 0 }} цит. · ⭐ {{ article.metrics.impactFactor || 0 }}</span></div>
          </div>

          <div class="abstract" v-if="article.abstract">
            <h3>Аннотация</h3>
            <p>{{ article.abstract }}</p>
          </div>

          <div class="actions">
            <a v-if="article.url && article.url !== '#'" class="btn btn-primary icon-btn" :href="article.url" target="_blank" rel="noopener">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-file" /></svg>
              Открыть источник
            </a>
            <a v-if="article.pdf" class="btn btn-secondary icon-btn" :href="article.pdf" target="_blank" rel="noopener">
              <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-download" /></svg>
              PDF
            </a>
            <button class="btn" @click="copyLink">Скопировать ссылку</button>
            <div class="qr"><qrcode-vue :value="pageUrl" :size="96" level="M" /></div>
          </div>

          <div class="citations">
            <h3>Цитирование</h3>
            <div class="cite-row">
              <span class="cite-label">APA:</span>
              <span class="cite-text">{{ apaCitation }}</span>
              <button class="btn btn-secondary" @click="copyText(apaCitation)">Копировать</button>
            </div>
            <div class="cite-row">
              <span class="cite-label">IEEE:</span>
              <span class="cite-text">{{ ieeeCitation }}</span>
              <button class="btn btn-secondary" @click="copyText(ieeeCitation)">Копировать</button>
            </div>
            <div class="cite-row">
              <span class="cite-label">BibTeX:</span>
              <code class="cite-code">{{ bibtex }}</code>
              <button class="btn btn-secondary" @click="copyText(bibtex)">Копировать</button>
              <button class="btn" @click="downloadBibtex">Скачать .bib</button>
            </div>
          </div>

          <div class="attachments" v-if="article.pdf || (article.figures && article.figures.length) || (article.standards && article.standards.length)">
            <h3>Материалы</h3>
            <ul class="att-list">
              <li v-if="article.pdf"><a :href="article.pdf" target="_blank" rel="noopener">PDF</a></li>
              <li v-for="(f, i) in article.figures || []" :key="`fig-${i}`">
                <a :href="f" target="_blank" rel="noopener">Иллюстрация {{ i + 1 }}</a>
              </li>
              <li v-for="s in article.standards || []" :key="s">Стандарт: {{ s }}</li>
            </ul>
          </div>

          <div class="related" v-if="related.length">
            <h3>Похожие публикации</h3>
            <ul class="mini-list">
              <li v-for="r in related" :key="r.id">
                <router-link :to="`/pub/${r.id}`">{{ r.title }}</router-link>
                <span class="meta">{{ r.journal }} · {{ r.year }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CurveDivider from '../components/CurveDivider.vue'
import { articles as unifiedArticles } from '../data/articles.js'
import QrcodeVue from 'qrcode.vue'
import { team } from '../data/team.js'

export default {
  name: 'PublicationPage',
  components: { CurveDivider, QrcodeVue },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const article = computed(() => unifiedArticles.find(a => String(a.id) === String(route.params.id)))

    onMounted(() => {
      if (!article.value) router.replace('/science')
      else document.title = `${article.value.title} — Публикация`
    })

    const pageUrl = computed(() => `${location.origin}${location.pathname}#/pub/${route.params.id}`)
    const copyLink = async () => { await navigator.clipboard.writeText(pageUrl.value); alert('Ссылка скопирована') }

    const authorsWithLinks = computed(() => {
      const names = article.value?.authors || []
      return names.map(name => {
        const last = String(name).split(' ')[0]
        const member = team.find(m => m.name.includes(last))
        return member ? { name, link: `/team/${member.slug}` } : { name, link: '' }
      })
    })

    const apaCitation = computed(() => {
      const a = article.value
      if (!a) return ''
      const authors = (a.authors || []).join(', ')
      return `${authors} (${a.year}). ${a.title}. ${a.journal}.` 
    })

    const ieeeCitation = computed(() => {
      const a = article.value
      if (!a) return ''
      const authors = (a.authors || []).join(', ')
      return `${authors}, "${a.title}", ${a.journal}, ${a.year}.`
    })

    const bibtex = computed(() => {
      const a = article.value
      if (!a) return ''
      const key = (a.authors?.[0] || 'unknown').split(' ')[0].toLowerCase() + a.year
      const escape = (t) => String(t || '').replace(/[{}]/g, '')
      return `@article{${key},\n  title={${escape(a.title)}},\n  author={${escape((a.authors || []).join(' and '))}},\n  journal={${escape(a.journal)}},\n  year={${a.year}},\n  doi={${escape(a.doi || '')}}\n}`
    })

    const copyText = async (t) => { await navigator.clipboard.writeText(t); alert('Скопировано') }
    const downloadBibtex = () => {
      const blob = new Blob([bibtex.value], { type: 'application/x-bibtex' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${route.params.id}.bib`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
    }

    const related = computed(() => {
      const a = article.value
      if (!a) return []
      const kw = new Set((a.keywords || []).map(k => k.toLowerCase()))
      return unifiedArticles
        .filter(x => x.id !== a.id && x.keywords?.some(k => kw.has(String(k).toLowerCase())))
        .slice(0, 5)
    })

    return { article, pageUrl, copyLink, authorsWithLinks, apaCitation, ieeeCitation, bibtex, copyText, downloadBibtex, related }
  }
}
</script>

<style scoped>
.page-header { background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%), linear-gradient(135deg, #2a0b3b, #0a0d1f 70%); color: #fff; padding: 4rem 0; text-align: center; }
.pub-card { display: grid; gap: 1rem; }
.meta .row { display: flex; gap: .5rem; margin-bottom: .25rem; }
.label { color: var(--text-secondary); min-width: 140px; }
.value { color: var(--text-primary); }
.tags { display: inline-flex; gap: .4rem; flex-wrap: wrap; }
.tag { background: var(--bg-tertiary); color: var(--text-primary); padding: .2rem .5rem; border-radius: var(--radius-sm); font-size: .8rem; }
.abstract h3 { color: var(--primary-color); margin-bottom: .5rem; }
.actions { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; }
.qr { margin-left: auto; background: var(--bg-secondary); padding: .5rem; border-radius: var(--radius-md); }
.
.citations { margin-top: 1rem; }
.cite-row { display: grid; grid-template-columns: max-content 1fr max-content max-content; align-items: center; gap: .5rem; padding: .5rem 0; border-top: 1px solid var(--bg-tertiary); }
.cite-row:first-child { border-top: none; }
.cite-label { color: var(--text-secondary); min-width: 60px; }
.cite-text { color: var(--text-primary); }
.cite-code { display: block; white-space: pre-wrap; background: var(--bg-secondary); color: var(--text-primary); padding: .5rem; border-radius: var(--radius-sm); }

.attachments { margin-top: 1rem; }
.att-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .25rem; }

.related { margin-top: 1rem; }
.mini-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; }
.mini-list .meta { display: inline-block; margin-left: .5rem; color: var(--text-secondary); font-size: .85rem; }
@media (max-width: 768px) { .label { min-width: 90px; } .qr { margin-left: 0; } }
</style>


