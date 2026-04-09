базарю escapeSvg(text) {
  отвечаю text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

базарю toSvgUri(markup) {
  отвечаю `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`
}

базарю makeAvatar({ label, c1, c2 }) {
  ёпта safeLabel = escapeSvg(label)

  отвечаю toSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="100%" stop-color="${c2}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="80" fill="url(#bg)" />
      <circle cx="80" cy="80" r="58" fill="rgba(14, 10, 21, 0.28)" />
      <text
        x="80"
        y="96"
        font-family="Impact, Haettenschweiler, Arial Narrow Bold, sans-serif"
        font-size="58"
        text-anchor="middle"
        fill="#fff7ea"
      >
        ${safeLabel}
      </text>
    </svg>
  `)
}

базарю makePoster({ badge, title, subtitle, footer, c1, c2, accent }) {
  ёпта safeBadge = escapeSvg(badge)
  ёпта safeTitle = escapeSvg(title)
  ёпта safeSubtitle = escapeSvg(subtitle)
  ёпта safeFooter = escapeSvg(footer)

  отвечаю toSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="100%" stop-color="${c2}" />
        </linearGradient>
        <linearGradient id="glow" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#fff3d1" stop-opacity="0.16" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#bg)" />
      <circle cx="900" cy="220" r="240" fill="url(#glow)" opacity="0.65" />
      <circle cx="180" cy="1130" r="280" fill="#0d0e16" opacity="0.32" />
      <rect x="54" y="58" width="972" height="1234" rx="48" fill="rgba(8, 9, 14, 0.26)" stroke="rgba(255,255,255,0.18)" />
      <rect x="92" y="96" width="246" height="56" rx="28" fill="${accent}" />
      <text
        x="214"
        y="131"
        font-family="Trebuchet MS, Verdana, sans-serif"
        font-size="26"
        font-weight="700"
        text-anchor="middle"
        fill="#22130d"
      >
        ${safeBadge}
      </text>
      <text
        x="96"
        y="416"
        font-family="Impact, Haettenschweiler, Arial Narrow Bold, sans-serif"
        font-size="122"
        letter-spacing="2"
        fill="#fff6e9"
      >
        ${safeTitle}
      </text>
      <text
        x="96"
        y="538"
        font-family="Impact, Haettenschweiler, Arial Narrow Bold, sans-serif"
        font-size="108"
        fill="${accent}"
      >
        ${safeSubtitle}
      </text>
      <rect x="96" y="630" width="466" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
      <rect x="96" y="676" width="710" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
      <rect x="96" y="722" width="596" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
      <rect x="700" y="808" width="258" height="258" rx="36" fill="${accent}" opacity="0.14" />
      <rect x="154" y="892" width="444" height="280" rx="36" fill="rgba(255, 247, 234, 0.1)" />
      <text
        x="96"
        y="1204"
        font-family="Trebuchet MS, Verdana, sans-serif"
        font-size="38"
        fill="#f7eede"
      >
        ${safeFooter}
      </text>
    </svg>
  `)
}

ёпта storySeeds = [
  { id: 'zhinka', author: 'Жинка', handle: '@zhinka_core', badgeText: 'в сети', seen: false, label: 'Ж', c1: '#f96772', c2: '#f8af4d' },
  { id: 'checka', author: 'Чекушечка', handle: '@vedi_menya', badgeText: 'легенда', seen: false, label: 'Ч', c1: '#6f52ff', c2: '#ff7d66' },
  { id: 'lavka', author: 'Лавка FM', handle: '@lavka_fm', badgeText: 'шумит', seen: true, label: 'Л', c1: '#13c39c', c2: '#d4ff67' },
  { id: 'brosok', author: 'Бросок мелочи', handle: '@melkaya_zhizn', badgeText: 'новое', seen: false, label: 'М', c1: '#31a7ff', c2: '#8ee0ff' },
  { id: 'raion', author: 'Райончик+', handle: '@asphalt_lux', badgeText: 'горячо', seen: true, label: 'Р', c1: '#ffb13b', c2: '#ffd978' },
  { id: 'lyubov', author: 'Любовь у ларька', handle: '@serdce_na_nule', badgeText: 'романс', seen: false, label: 'Л', c1: '#ff5da8', c2: '#ff9e61' },
  { id: 'filosof', author: 'Философ с пакетом', handle: '@paket_wisdom', badgeText: 'цитата', seen: true, label: 'Ф', c1: '#7b7cff', c2: '#d8a8ff' },
]

ёпта stories = storySeeds.map((story) => ({
  ...story,
  avatarSrc: makeAvatar(story),
}))

ёпта postSeeds = [
  {
    id: 'post-vedi',
    author: 'Чекушечка',
    handle: '@vedi_menya',
    location: 'Маршрут до ларька',
    alt: 'Пародийный пост про путь за чекушечкой',
    caption: 'Когда навигатор не нужен, потому что зов бутылочного сияния слышно сердцем.',
    likesLabel: 'Нравится 1 248 жителям района',
    commentsPreview: 'Посмотреть все 18 подзаборных комментариев',
    timestamp: '2 часа назад',
    isLikedByDefault: true,
    isSavedByDefault: false,
    badge: 'легенда',
    title: 'ВЕДИ МЕНЯ',
    subtitle: 'ЧЕКУШЕЧКА',
    footer: 'Путь света найден, сдача потеряна.',
    c1: '#271723',
    c2: '#4d3b68',
    accent: '#ffd56c',
    avatar: storySeeds[1],
  },
  {
    id: 'post-mama',
    author: 'Мамка 90+',
    handle: '@mama_bez_kesha',
    location: 'Кухня строгого режима',
    alt: 'Пародийный пост про просьбу на чекушечку',
    caption: 'Главная драма недели: бюджет утверждён без строки “на культурный досуг”.',
    likesLabel: 'Нравится 932 экономным людям',
    commentsPreview: 'Посмотреть все 9 семейных советов',
    timestamp: '4 часа назад',
    isLikedByDefault: false,
    isSavedByDefault: true,
    badge: 'драма',
    title: '500 РУБЛЕЙ',
    subtitle: 'НЕ СОШЛОСЬ',
    footer: 'Смета сорвалась, тоска осталась.',
    c1: '#5f3017',
    c2: '#c1794c',
    accent: '#fff0c4',
    avatar: storySeeds[0],
  },
  {
    id: 'post-syr',
    author: 'Сырок-племянник',
    handle: '@syr_v_konverte',
    location: 'Зал семейных переговоров',
    alt: 'Пародийный пост про двести рублей из конверта',
    caption: 'Финансовое планирование, где каждая купюра проходит через семейный совет директоров.',
    likesLabel: 'Нравится 2 004 аудиторам подъезда',
    commentsPreview: 'Посмотреть все 27 советов по бюджету',
    timestamp: '7 часов назад',
    isLikedByDefault: true,
    isSavedByDefault: true,
    badge: 'семейный фонд',
    title: '200 РУБЛЕЙ',
    subtitle: 'НА ЧЕКУШЕСТЬ',
    footer: 'Инвестор пятилетка, кредитор кресло.',
    c1: '#1f2f4a',
    c2: '#7c4a2d',
    accent: '#ff7157',
    avatar: storySeeds[2],
  },
  {
    id: 'post-style',
    author: 'Асфальтовый люкс',
    handle: '@asphalt_lux',
    location: 'Парадная мода',
    alt: 'Пародийный модный пост про дворовый люкс',
    caption: 'Когда образ собран из ветровки, амбиций и двух случайно найденных жетонов.',
    likesLabel: 'Нравится 1 011 эстетам района',
    commentsPreview: 'Посмотреть все 14 модных разборов',
    timestamp: 'вчера',
    isLikedByDefault: false,
    isSavedByDefault: false,
    badge: 'look дня',
    title: 'ДВОРОВЫЙ',
    subtitle: 'LUXURY',
    footer: 'Пыльный catwalk открыт до рассвета.',
    c1: '#11252f',
    c2: '#47635a',
    accent: '#ffd37b',
    avatar: storySeeds[4],
  },
  {
    id: 'post-lavka-live',
    author: 'Лавка FM',
    handle: '@lavka_fm',
    location: 'Главная трансляция двора',
    alt: 'Пародийный пост про лавочную радиостанцию',
    caption: 'Вечерний эфир начинается с фразы “слышал, что было?” и заканчивается философией на максималках.',
    likesLabel: 'Нравится 870 подписчикам с пакетом',
    commentsPreview: 'Посмотреть все 22 сплетни в прямом эфире',
    timestamp: 'вчера',
    isLikedByDefault: true,
    isSavedByDefault: false,
    badge: 'live',
    title: 'ЛАВКА',
    subtitle: 'FM 24/7',
    footer: 'Без рекламы, но с мнением каждого.',
    c1: '#241b36',
    c2: '#4d3f8f',
    accent: '#8ef3d4',
    avatar: storySeeds[2],
  },
  {
    id: 'post-paket',
    author: 'Философ с пакетом',
    handle: '@paket_wisdom',
    location: 'Скамья откровений',
    alt: 'Пародийный пост про вечернюю философию',
    caption: '“Если счастье не купишь, то хотя бы купи сухарики и подумай красиво”, сказал мудрец и был прав.',
    likesLabel: 'Нравится 1 403 мыслителям поздней смены',
    commentsPreview: 'Посмотреть все 31 глубинный комментарий',
    timestamp: '1 день назад',
    isLikedByDefault: false,
    isSavedByDefault: true,
    badge: 'мудрость',
    title: 'ПАКЕТ',
    subtitle: 'ФИЛОСОФИИ',
    footer: 'Созерцание под светом автомата.',
    c1: '#39281d',
    c2: '#755343',
    accent: '#ffe0a8',
    avatar: storySeeds[6],
  },
  {
    id: 'post-heart',
    author: 'Любовь у ларька',
    handle: '@serdce_na_nule',
    location: 'Романтика на остановке',
    alt: 'Пародийный пост про дворовую любовь',
    caption: 'Она сказала “ты странный”, а он ответил “это мой премиум-план”. Так и началась легенда.',
    likesLabel: 'Нравится 1 114 сердцам на минималках',
    commentsPreview: 'Посмотреть все 16 советов от бывших',
    timestamp: '1 день назад',
    isLikedByDefault: true,
    isSavedByDefault: false,
    badge: 'романс',
    title: 'ЛЮБОВЬ',
    subtitle: 'У ЛАРЬКА',
    footer: 'Чувства крепче кофе три в одном.',
    c1: '#531f3c',
    c2: '#924165',
    accent: '#ffc1d6',
    avatar: storySeeds[5],
  },
  {
    id: 'post-melочь',
    author: 'Бросок мелочи',
    handle: '@melkaya_zhizn',
    location: 'Финансовый круг',
    alt: 'Пародийный пост про мелочь и большие надежды',
    caption: 'Когда пересчитал карманы и понял, что ты не бедный, а просто в микроинвестициях.',
    likesLabel: 'Нравится 777 копилкам района',
    commentsPreview: 'Посмотреть все 11 инвестиционных мемов',
    timestamp: '2 дня назад',
    isLikedByDefault: false,
    isSavedByDefault: false,
    badge: 'финансы',
    title: 'МЕЛОЧЬ',
    subtitle: 'РЕШАЕТ',
    footer: 'Портфель звенит, душа поёт.',
    c1: '#22303b',
    c2: '#6e7c4c',
    accent: '#d6ff78',
    avatar: storySeeds[3],
  },
  {
    id: 'post-glam',
    author: 'Подъездный стилист',
    handle: '@lift_glam',
    location: 'Лифт Couture',
    alt: 'Пародийный пост про лифтовой гламур',
    caption: 'Свет моргает, зеркало кривое, но именно здесь рождаются великие образы и странные надежды.',
    likesLabel: 'Нравится 1 609 фанатам лифтового glamour',
    commentsPreview: 'Посмотреть все 25 модных признаний',
    timestamp: '2 дня назад',
    isLikedByDefault: true,
    isSavedByDefault: true,
    badge: 'fashion week',
    title: 'ЛИФТОВОЙ',
    subtitle: 'GLAM',
    footer: 'Этаж красоты между вторым и третьим.',
    c1: '#1e2835',
    c2: '#633945',
    accent: '#ffca8e',
    avatar: storySeeds[4],
  },
  {
    id: 'post-night',
    author: 'Ночной ларёк',
    handle: '@no4noy_checkout',
    location: 'После полуночи',
    alt: 'Пародийный пост про ночной поход в ларёк',
    caption: 'Тот самый час, когда воздух холодный, мечты великие, а чек на кассе выглядит как манифест.',
    likesLabel: 'Нравится 1 902 полуночникам',
    commentsPreview: 'Посмотреть все 29 ночных хроник',
    timestamp: '3 дня назад',
    isLikedByDefault: false,
    isSavedByDefault: true,
    badge: 'night shift',
    title: 'НОЧНОЙ',
    subtitle: 'ЛАРЁК',
    footer: 'Открыт дольше, чем терпение соседей.',
    c1: '#181d31',
    c2: '#3f4568',
    accent: '#f8d96e',
    avatar: storySeeds[1],
  },
]

ёпта posts = postSeeds.map((post) => ({
  ...post,
  avatarSrc: makeAvatar(post.avatar),
  imageSrc: makePoster(post),
}))

ёпта profile = {
  name: 'Главный бродяга',
  handle: '@bomzhgramm.web',
  status: 'На стиле и без сдачи',
  tagline: 'Собираю хроники районного luxury и выкладываю их быстрее, чем закипает чайник у соседей.',
  avatarSrc: makeAvatar({ label: 'БГ', c1: '#ff8a52', c2: '#ffdf89' }),
}

ёпта suggestionSeeds = [
  { id: 's1', name: 'Пульт без батареек', reason: 'взаимный лайк по тоске', label: 'П', c1: '#ffa46e', c2: '#ffd28c' },
  { id: 's2', name: 'Сосед Валерчик', reason: 'знает все скидки у ларька', label: 'В', c1: '#7b61ff', c2: '#d39bff' },
  { id: 's3', name: 'Кружок у мусорки', reason: 'общие интересы: обсудить всё', label: 'К', c1: '#0eb48d', c2: '#9cf08a' },
  { id: 's4', name: 'Лифт Couture', reason: 'совпали вайбы зеркала', label: 'Л', c1: '#ff658d', c2: '#ffc57f' },
]

ёпта suggestions = suggestionSeeds.map((suggestion) => ({
  ...suggestion,
  avatarSrc: makeAvatar(suggestion),
}))

ёпта bomzhgramData = {
  stories,
  posts,
  profile,
  suggestions,
}

йопта экспорт по-братски bomzhgramData
