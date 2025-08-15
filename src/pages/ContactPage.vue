<template>
  <div class="contact-page">
    <CurveDivider />
    <section class="page-header">
      <div class="container">
        <h1>Контакты</h1>
        <p class="page-subtitle">Свяжитесь с нами по вопросам сотрудничества</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <form class="card form" @submit.prevent="submit">
          <div class="row">
            <div class="col">
              <label>Имя</label>
              <input v-model="form.name" required />
            </div>
            <div class="col">
              <label>Email</label>
              <input type="email" v-model="form.email" required />
            </div>
          </div>
          <div class="row">
            <div class="col full">
              <label>Сообщение</label>
              <textarea v-model="form.message" rows="5" required />
            </div>
          </div>
          <div class="actions">
            <button class="btn btn-primary">Отправить</button>
            <a class="btn btn-secondary" href="mailto:contact@ontology.ru">Почта</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import CurveDivider from '../components/CurveDivider.vue'

export default {
  name: 'ContactPage',
  components: { CurveDivider },
  setup() {
    const form = ref({ name: '', email: '', message: '' })
    const submit = () => {
      alert('Спасибо! Мы свяжемся с вами.')
      form.value = { name: '', email: '', message: '' }
    }
    return { form, submit }
  }
}
</script>

<style scoped>
.page-header { background: radial-gradient(600px 400px at 12% 20%, rgba(255,47,109,0.35), transparent 60%), linear-gradient(135deg, #2a0b3b, #0a0d1f 70%); color: #fff; padding: 4rem 0; text-align: center; }
.form { padding: 1.5rem; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.col.full { grid-column: 1 / -1; }
label { font-weight: 600; color: var(--text-primary); display: block; margin-bottom: .25rem; }
input, textarea { width: 100%; padding: .6rem .75rem; border: 1px solid var(--text-light); border-radius: var(--radius-md); background: var(--bg-primary); }
.actions { display: flex; gap: .5rem; margin-top: 1rem; }
@media (max-width: 768px) { .row { grid-template-columns: 1fr; } }
</style>


