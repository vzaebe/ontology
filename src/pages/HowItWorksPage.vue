<template>
  <div class="how-it-works-page">
    <!-- Hero секция -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Как это работает</h1>
        <p class="hero-subtitle">
          Понятный процесс из 6 шагов создания графа знаний для вашей предметной области
        </p>
      </div>
    </section>

    <!-- Основной процесс -->
    <section class="process-section">
      <div class="container">
        <div class="process-stepper">
          <!-- Прогресс линия -->
          <div class="progress-line">
            <div class="progress-track"></div>
          </div>

          <!-- Шаги процесса -->
          <div class="steps-container">
            <div 
              v-for="(step, index) in processSteps" 
              :key="step.id"
              class="process-step"
              :class="{ 'step-active': activeStep === index }"
              @mouseenter="handleStepHover(index)"
              @mouseleave="handleStepLeave()"
              @focus="handleStepFocus(index)"
              @blur="handleStepBlur()"
              tabindex="0"
              :aria-label="`Шаг ${index + 1}: ${step.title}`"
            >
              <!-- Номер и иконка -->
              <div class="step-indicator">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-icon" v-html="step.icon"></div>
              </div>

              <!-- Контент -->
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Результат -->
    <section class="outcome-section">
      <div class="container">
        <div class="outcome-content">
          <h2>Результат</h2>
          <p>
            Готовая система управления знаниями с единой терминологией, 
            трассируемыми связями и API для интеграции со всеми вашими системами.
          </p>
          <div class="outcome-actions">
            <router-link to="#demo" class="btn btn-primary">
              Посмотреть демо
            </router-link>
            <router-link to="#contact" class="btn btn-secondary">
              Обсудить проект
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HowItWorksPage',
  setup() {
    const activeStep = ref(0)

    const processSteps = [
      {
        id: 'inventory',
        title: 'Инвентаризация источников',
        description: 'Каталоги, БД, файлы, регламенты — фиксируем владельцев, форматы, частоту обновления.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>`
      },
      {
        id: 'ontology',
        title: 'Модель онтологии',
        description: 'Согласуем термины. Описываем сущности, свойства, ограничения (класс/атрибут/правило).',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>`
      },
      {
        id: 'extraction',
        title: 'Извлечение фактов (ETL/NLP)',
        description: 'Таблицы и текст → RDF-тройки. Нормализация, очистка, маппинг к схеме.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="m8 4.5 2.5 2.5L16 2"/>
          <path d="m12 17 3 3h4"/>
          <path d="M8 22a4 4 0 0 1 0-8"/>
        </svg>`
      },
      {
        id: 'database',
        title: 'Загрузка в графовую БД',
        description: 'Разворачиваем GraphDB/Neo4j, загружаем данные, индексируем. Версии схемы.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>`
      },
      {
        id: 'queries',
        title: 'Запросы и витрины',
        description: 'SPARQL/API, панели для поиска, трассируемости «требование→проект→объект→документ».',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 6v10"/>
          <path d="M6 11h10"/>
        </svg>`
      },
      {
        id: 'quality',
        title: 'Контроль качества и эволюция',
        description: 'SHACL-валидация, мониторинг метрик качества, релизы словаря/онтологии.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 12 15 16 10"/>
        </svg>`
      }
    ]

    const handleStepHover = (index) => {
      activeStep.value = index
    }

    const handleStepLeave = () => {
      activeStep.value = 0
    }

    const handleStepFocus = (index) => {
      activeStep.value = index
    }

    const handleStepBlur = () => {
      // Не сбрасываем активный шаг при потере фокуса для лучшего UX
    }

    return {
      processSteps,
      activeStep,
      handleStepHover,
      handleStepLeave,
      handleStepFocus,
      handleStepBlur
    }
  }
}
</script>

<style scoped>
/* Общие переменные */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #06d6a0;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --border-color: #e2e8f0;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Hero секция */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.5;
}

/* Процесс */
.process-section {
  padding: 6rem 0;
  background: var(--bg-secondary);
}

.process-stepper {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* Прогресс линия */
.progress-line {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 1;
}

.progress-track {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border-radius: 1px;
}

/* Контейнер шагов */
.steps-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;
}

/* Отдельный шаг */
.process-step {
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.process-step:hover,
.process-step:focus {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
  outline: none;
}

.process-step.step-active {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.02);
}

/* Индикатор шага */
.step-indicator {
  position: relative;
  margin-bottom: 1.5rem;
}

.step-number {
  width: 48px;
  height: 48px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0 auto 1rem;
  box-shadow: var(--shadow-md);
}

.step-icon {
  color: var(--primary-color);
  opacity: 0.8;
  transition: all 0.2s ease;
}

.process-step:hover .step-icon,
.process-step:focus .step-icon {
  opacity: 1;
  transform: scale(1.1);
}

/* Контент шага */
.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.step-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Результат */
.outcome-section {
  padding: 4rem 0;
  background: var(--bg-primary);
  text-align: center;
}

.outcome-content h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.outcome-content p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.outcome-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Кнопки */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .steps-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  .progress-line {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .process-section {
    padding: 4rem 0;
  }
  
  .steps-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .process-step {
    padding: 1.5rem;
    min-height: auto;
  }
  
  .step-title {
    font-size: 1rem;
  }
  
  .step-description {
    font-size: 0.875rem;
  }
  
  .outcome-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 3rem 0;
  }
  
  .process-section {
    padding: 3rem 0;
  }
  
  .process-step {
    padding: 1.25rem;
  }
}

/* Accessibility */
.process-step:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Поддержка prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .process-step,
  .step-icon,
  .btn {
    transition: none;
  }
  
  .process-step:hover,
  .process-step:focus {
    transform: none;
  }
  
  .step-icon {
    transform: none !important;
  }
  
  .btn:hover {
    transform: none;
  }
}

/* Контраст и читаемость */
@media (prefers-contrast: high) {
  .process-step {
    border-width: 3px;
  }
  
  .step-title {
    font-weight: 700;
  }
}
</style>