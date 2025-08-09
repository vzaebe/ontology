<template>
  <span class="citation-badge">
    <router-link :to="to" class="citation-link" :title="title" :aria-label="ariaLabel">
      <svg class="icon" width="14" height="14" aria-hidden="true"><use href="#icon-link"/></svg>
      <span class="citation-text">источник</span>
    </router-link>
  </span>
  
</template>

<script>
export default {
  name: 'CitationBadge',
  props: {
    to: { type: String, required: true },
    title: { type: String, default: '' },
    label: { type: String, default: 'источник' }
  },
  computed: {
    ariaLabel() {
      return this.title ? `Источник: ${this.title}` : 'Источник';
    }
  }
}
</script>

<style scoped>
.citation-badge {
  display: inline-flex;
  margin-left: 0.5rem;
}
.citation-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 0.75rem;
  text-decoration: none;
}
.citation-link:hover {
  background: var(--primary-color);
  color: #fff;
}
.citation-text { line-height: 1; }
</style>


