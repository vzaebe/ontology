<template>
  <div class="yandex-map-container">
    <div class="map-header">
      <h3>Где нас найти</h3>
      <div class="map-actions">
        <button 
          @click="openInYandexMaps"
          class="btn btn-secondary map-btn"
          :aria-label="'Открыть в Яндекс.Картах'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Открыть карту
        </button>
        
        <button 
          @click="buildRoute"
          class="btn btn-primary map-btn"
          :aria-label="'Построить маршрут'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 11l19-9-9 19-2-8-8-2z"/>
          </svg>
          Маршрут
        </button>
      </div>
    </div>

    <div 
      ref="mapContainer"
      class="map-wrapper"
      :class="{ 'map-loading': isLoading, 'map-error': hasError }"
    >
      <!-- Ленивая загрузка карты -->
      <div v-if="!mapLoaded && !hasError" class="map-placeholder" @click="loadMap">
        <div class="placeholder-content">
          <svg class="placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <p class="placeholder-text">Нажмите для загрузки интерактивной карты</p>
          <button class="btn btn-primary">Загрузить карту</button>
        </div>
      </div>

      <!-- Индикатор загрузки -->
      <div v-if="isLoading" class="map-loading-indicator">
        <div class="loading-spinner"></div>
        <p>Загрузка карты...</p>
      </div>

      <!-- Ошибка загрузки -->
      <div v-if="hasError" class="map-error-state">
        <div class="error-content">
          <svg class="error-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p class="error-text">Не удалось загрузить карту</p>
          <div class="error-actions">
            <button @click="retryLoad" class="btn btn-secondary">Попробовать ещё раз</button>
            <button @click="openInYandexMaps" class="btn btn-primary">Открыть в Яндекс.Картах</button>
          </div>
        </div>
      </div>

      <!-- Контейнер для карты -->
      <div 
        v-show="mapLoaded && !hasError"
        ref="yandexMap" 
        class="yandex-map"
        :style="{ height: mapHeight }"
      ></div>
    </div>

    <!-- Список локаций под картой -->
    <div v-if="locations.length > 1" class="locations-list">
      <h4>Наши локации</h4>
      <div class="locations-grid">
        <div 
          v-for="location in locations" 
          :key="location.id"
          class="location-card"
          @click="focusLocation(location)"
        >
          <div class="location-header">
            <h5>{{ location.name }}</h5>
            <span v-if="location.isHeadquarters" class="hq-badge">HQ</span>
          </div>
          <p class="location-address">{{ location.address }}</p>
          <div v-if="location.workingHours" class="location-hours">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            {{ location.workingHours }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'YandexMap',
  props: {
    locations: {
      type: Array,
      required: true
    },
    apiKey: {
      type: String,
      default: ''
    },
    mapHeight: {
      type: String,
      default: '400px'
    },
    autoLoad: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const mapContainer = ref(null)
    const yandexMap = ref(null)
    const mapLoaded = ref(false)
    const isLoading = ref(false)
    const hasError = ref(false)
    const mapInstance = ref(null)
    const markersCollection = ref(null)

    // Основная локация (HQ или первая)
    const primaryLocation = props.locations.find(loc => loc.isHeadquarters) || props.locations[0]

    // Наблюдатель для ленивой загрузки
    let intersectionObserver = null

    const loadYandexMapsAPI = () => {
      return new Promise((resolve, reject) => {
        // Проверяем, загружен ли уже API
        if (window.ymaps && window.ymaps.ready) {
          resolve(window.ymaps)
          return
        }

        // Создаем скрипт для загрузки API
        const script = document.createElement('script')
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${props.apiKey}&lang=ru_RU`
        script.async = true
        
        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(() => resolve(window.ymaps))
          } else {
            reject(new Error('Яндекс.Карты API не загружен'))
          }
        }
        
        script.onerror = () => {
          reject(new Error('Ошибка загрузки Яндекс.Карты API'))
        }
        
        document.head.appendChild(script)
      })
    }

    const initMap = async () => {
      try {
        const ymaps = await loadYandexMapsAPI()
        
        if (!yandexMap.value) {
          throw new Error('Контейнер карты не найден')
        }

        // Создаем карту
        const map = new ymaps.Map(yandexMap.value, {
          center: primaryLocation.coordinates,
          zoom: 15,
          controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
        }, {
          // Опции карты
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true
        })

        mapInstance.value = map

        // Создаем коллекцию для маркеров
        const collection = new ymaps.GeoObjectCollection()
        markersCollection.value = collection

        // Добавляем маркеры для всех локаций
        props.locations.forEach(location => {
          const placemark = new ymaps.Placemark(
            location.coordinates,
            {
              balloonContentHeader: location.name,
              balloonContentBody: `
                <div style="max-width: 200px;">
                  <p><strong>${location.address}</strong></p>
                  ${location.workingHours ? `<p>🕒 ${location.workingHours}</p>` : ''}
                  ${location.phone ? `<p>📞 <a href="tel:${location.phone}">${location.phone}</a></p>` : ''}
                  ${location.description ? `<p>${location.description}</p>` : ''}
                </div>
              `,
              balloonContentFooter: `
                <div style="margin-top: 10px;">
                  <button onclick="window.open('https://yandex.ru/maps/?rtext=~${location.coordinates[0]},${location.coordinates[1]}', '_blank')" style="background: #fc3; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                    Построить маршрут
                  </button>
                </div>
              `
            },
            {
              preset: location.isHeadquarters ? 'islands#redIcon' : 'islands#blueIcon',
              iconCaption: location.isHeadquarters ? 'HQ' : location.name
            }
          )

          collection.add(placemark)
        })

        map.geoObjects.add(collection)

        // Если локаций несколько, настраиваем кластеризацию
        if (props.locations.length > 1) {
          const clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: false,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
          })

          clusterer.add(collection)
          map.geoObjects.add(clusterer)

          // Устанавливаем границы карты для показа всех точек
          map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 50
          })
        }

        mapLoaded.value = true

        // Аналитика
        if (window.gtag) {
          window.gtag('event', 'map_loaded')
        }

      } catch (error) {
        console.error('Ошибка инициализации карты:', error)
        hasError.value = true
      }
    }

    const loadMap = async () => {
      if (isLoading.value || mapLoaded.value) return

      isLoading.value = true
      hasError.value = false

      try {
        await nextTick()
        await initMap()
      } catch (error) {
        hasError.value = true
      } finally {
        isLoading.value = false
      }
    }

    const retryLoad = () => {
      hasError.value = false
      loadMap()
    }

    const openInYandexMaps = () => {
      const coords = primaryLocation.coordinates
      const url = `https://yandex.ru/maps/?ll=${coords[1]},${coords[0]}&z=15&l=map&pt=${coords[1]},${coords[0]},pm2rdl`
      window.open(url, '_blank')
      
      // Аналитика
      if (window.gtag) {
        window.gtag('event', 'contact_route_click', {
          source: 'yandex_maps_button'
        })
      }
    }

    const buildRoute = () => {
      const coords = primaryLocation.coordinates
      const url = `https://yandex.ru/maps/?rtext=~${coords[0]},${coords[1]}`
      window.open(url, '_blank')
      
      // Аналитика
      if (window.gtag) {
        window.gtag('event', 'contact_route_click', {
          source: 'build_route_button'
        })
      }
    }

    const focusLocation = (location) => {
      if (mapInstance.value && markersCollection.value) {
        mapInstance.value.setCenter(location.coordinates, 16, {
          duration: 300
        })
        
        // Находим соответствующий маркер и открываем балун
        markersCollection.value.each(placemark => {
          const coords = placemark.geometry.getCoordinates()
          if (coords[0] === location.coordinates[0] && coords[1] === location.coordinates[1]) {
            placemark.balloon.open()
          }
        })
      }
    }

    const setupIntersectionObserver = () => {
      if (!window.IntersectionObserver || !mapContainer.value) return

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !mapLoaded.value && !isLoading.value && props.autoLoad) {
              loadMap()
            }
          })
        },
        {
          rootMargin: '100px 0px',
          threshold: 0.1
        }
      )

      intersectionObserver.observe(mapContainer.value)
    }

    onMounted(() => {
      nextTick(() => {
        if (props.autoLoad) {
          setupIntersectionObserver()
        }
      })
    })

    onUnmounted(() => {
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
      
      if (mapInstance.value) {
        mapInstance.value.destroy()
      }
    })

    return {
      mapContainer,
      yandexMap,
      mapLoaded,
      isLoading,
      hasError,
      primaryLocation,
      loadMap,
      retryLoad,
      openInYandexMaps,
      buildRoute,
      focusLocation
    }
  }
}
</script>

<style scoped>
.yandex-map-container {
  margin: 3rem 0;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.map-header h3 {
  color: var(--primary-color);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.map-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.map-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  min-height: 44px;
  white-space: nowrap;
}

.map-btn svg {
  flex-shrink: 0;
}

.map-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.yandex-map {
  width: 100%;
  border-radius: var(--radius-lg);
}

.map-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: var(--gradient-glass);
  cursor: pointer;
  transition: background 0.3s ease;
}

.map-placeholder:hover {
  background: rgba(102, 126, 234, 0.1);
}

.placeholder-content {
  text-align: center;
  padding: 2rem;
}

.placeholder-icon {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.placeholder-text {
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
}

.map-loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.map-loading-indicator p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.875rem;
}

.map-error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
}

.error-content {
  text-align: center;
}

.error-icon {
  color: var(--error-color, #ef4444);
  margin-bottom: 1rem;
}

.error-text {
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
}

.error-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.locations-list {
  margin-top: 2rem;
}

.locations-list h4 {
  color: var(--primary-color);
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.location-card {
  background: var(--gradient-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 1rem;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(102, 126, 234, 0.3);
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.location-header h5 {
  color: var(--primary-color);
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.hq-badge {
  background: var(--primary-color);
  color: white;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.location-address {
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.location-hours {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.8125rem;
}

.location-hours svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .map-header {
    flex-direction: column;
    align-items: stretch;
  }

  .map-actions {
    justify-content: stretch;
  }

  .map-btn {
    flex: 1;
    justify-content: center;
  }

  .placeholder-content {
    padding: 1.5rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .locations-grid {
    grid-template-columns: 1fr;
  }
}

/* Состояния доступности */
.map-btn:focus,
.location-card:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.map-btn:focus:not(:focus-visible),
.location-card:focus:not(:focus-visible) {
  outline: none;
}

.map-btn:focus-visible,
.location-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Отключение анимаций для пользователей с пониженным восприятием движения */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }
  
  .location-card:hover {
    transform: none;
  }
  
  .map-placeholder {
    transition: none;
  }
}
</style>
