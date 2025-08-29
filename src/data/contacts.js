// Структура данных контактов и контакт-лиц
// Contact model: { organization, generalContacts, contactPersons, locations, workingHours }

export const contactsData = {
  // Общие контакты организации
  organization: {
    fullName: 'Центр исследований онтологий и графов знаний',
    shortName: 'Ontology.ru',
    inn: '7777777777',
    ogrn: '1234567890123',
    website: 'https://ontology.ru',
    legalAddress: 'Москва, ул. Примерная, 1, офис 100'
  },

  // Общие контакты
  generalContacts: {
    emails: {
      general: 'hello@example.org',
      partners: 'partners@example.org', 
      tech: 'tech@example.org',
      hr: 'hr@example.org',
      publications: 'publications@example.org'
    },
    phone: '+7 000 000-00-00',
    messengers: {
      telegram: '@example',
      whatsapp: '+7 000 000-00-00'
    },
    workingHours: 'Пн–Пт, 10:00–19:00 (Мск)',
    timezone: 'Europe/Moscow'
  },

  // Адреса и локации для карты
  locations: [
    {
      id: 'hq',
      name: 'Главный офис',
      address: 'Москва, ул. Примерная, 1',
      fullAddress: 'Россия, Москва, ул. Примерная, д. 1, офис 100',
      coordinates: [55.751244, 37.618423], // Примерные координаты центра Москвы
      isHeadquarters: true,
      workingHours: 'Пн–Пт, 10:00–19:00',
      phone: '+7 000 000-00-00',
      description: 'Основной офис команды разработки'
    }
  ],

  // Контакт-лица по направлениям
  contactPersons: [
    {
      id: 'general',
      name: 'Иванов Иван Иванович',
      role: 'Руководитель проекта',
      direction: 'Общие вопросы',
      directionKey: 'general',
      email: 'hello@example.org',
      telegram: '@ivanov',
      phone: '+7 000 000-01-01',
      workingHours: '10:00–18:00 (Мск)',
      bio: 'Отвечаю на общие вопросы и координирую работу команды',
      avatar: '',
      isTeamMember: true,
      teamSlug: 'ivanov-ii' // связь с данными команды
    },
    {
      id: 'partnerships',
      name: 'Петров Пётр Петрович',
      role: 'Менеджер по партнёрствам',
      direction: 'Партнёрства и бизнес',
      directionKey: 'partnerships',
      email: 'partners@example.org',
      telegram: '@petrov',
      phone: '+7 000 000-02-02',
      workingHours: '10:00–18:00 (Мск)',
      bio: 'Развиваю партнёрские отношения и бизнес-сотрудничество',
      avatar: '',
      isTeamMember: false
    },
    {
      id: 'technical',
      name: 'Сидорова Анна Сергеевна',
      role: 'Технический специалист',
      direction: 'Техника и демо',
      directionKey: 'technical',
      email: 'tech@example.org',
      telegram: '@sidorova',
      phone: '+7 000 000-03-03',
      workingHours: '10:00–18:00 (Мск)',
      bio: 'Провожу технические демо и консультирую по внедрению',
      avatar: '',
      isTeamMember: false
    },
    {
      id: 'publications',
      name: 'Козлов Дмитрий Александрович',
      role: 'Научный редактор',
      direction: 'Публикации и PR',
      directionKey: 'publications',
      email: 'publications@example.org',
      telegram: '@kozlov',
      phone: '+7 000 000-04-04',
      workingHours: '10:00–18:00 (Мск)',
      bio: 'Курирую научные публикации и связи с медиа',
      avatar: '',
      isTeamMember: true,
      teamSlug: 'kozlov-da'
    },
    {
      id: 'hr',
      name: 'Новикова Елена Михайловна',
      role: 'HR-менеджер',
      direction: 'HR и стажировки',
      directionKey: 'hr',
      email: 'hr@example.org',
      telegram: '@novikova',
      phone: '+7 000 000-05-05',
      workingHours: '10:00–18:00 (Мск)',
      bio: 'Организую стажировки и работаю с кандидатами',
      avatar: '',
      isTeamMember: false
    }
  ],

  // Настройки формы обращения
  contactForm: {
    directions: [
      { key: 'general', label: 'Общие вопросы', email: 'hello@example.org' },
      { key: 'partnerships', label: 'Партнёрства и бизнес', email: 'partners@example.org' },
      { key: 'technical', label: 'Техника и демо', email: 'tech@example.org' },
      { key: 'publications', label: 'Публикации и PR', email: 'publications@example.org' },
      { key: 'hr', label: 'HR и стажировки', email: 'hr@example.org' }
    ],
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    allowedFileTypes: ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'],
    responseTime: '24 рабочих часов',
    rateLimitDelay: 30000, // 30 секунд между отправками
    honeypotField: 'website' // скрытое поле для защиты от спама
  },

  // Настройки карты
  mapSettings: {
    defaultZoom: 12,
    clusterDistance: 50,
    apiKey: import.meta.env?.VUE_APP_YANDEX_MAPS_API_KEY || '',
    fallbackImageUrl: '/images/map-fallback.png'
  }
}

// Функции-хелперы для работы с контактами
export const getContactPersonByDirection = (direction) => {
  return contactsData.contactPersons.find(person => person.directionKey === direction)
}

export const getEmailByDirection = (direction) => {
  const formDirection = contactsData.contactForm.directions.find(d => d.key === direction)
  return formDirection ? formDirection.email : contactsData.generalContacts.emails.general
}

export const formatPhone = (phone) => {
  return phone.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5')
}

export const getWorkingHoursStatus = () => {
  const now = new Date()
  const moscowTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"}))
  const hour = moscowTime.getHours()
  const day = moscowTime.getDay()
  
  const isWorkingDay = day >= 1 && day <= 5 // Пн-Пт
  const isWorkingHour = hour >= 10 && hour < 19
  
  return {
    isOpen: isWorkingDay && isWorkingHour,
    message: isWorkingDay && isWorkingHour 
      ? 'Сейчас рабочее время' 
      : 'Сейчас нерабочее время'
  }
}
