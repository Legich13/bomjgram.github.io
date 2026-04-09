йопта импорт { useState } из 'react'
йопта импорт AppShell из './components/AppShell.yopta.jsx'
йопта импорт bomzhgramData из './content/bomzhgramData.yopta.jsx'

ёпта feedMetaByNav = {
  feed: {
    title: 'Лента района',
    description: 'Главные хроники чекушечного люкса, подъездного глянца и дворовых откровений.',
    pill: 'Сейчас в моде: жинка-core',
  },
  search: {
    title: 'Разведка по району',
    description: 'Смотрим, кто опять выкладывает эстетский трэш и где сегодня шумит подъездный TikTok.',
    pill: 'В эфире: лавочный ресёрч',
  },
  reels: {
    title: 'Коротыши с лавки',
    description: 'Вертикальные зарисовки про дворовый glamour и спонтанные философские залёты.',
    pill: 'Горячо: дымок у ларька',
  },
  rumors: {
    title: 'Слухи у подъезда',
    description: 'Личные сообщения, сплетни и разговоры о том, кто опять утащил настроение и мелочь.',
    pill: 'Шумит: дворцовый gossip',
  },
  stash: {
    title: 'Сейвы под матрасом',
    description: 'Склад всего, что достойно повторного просмотра после двух часов ночи и внезапной ностальгии.',
    pill: 'Накоплено: 404 прикола',
  },
  profile: {
    title: 'Профиль главного бродяги',
    description: 'Личный архив подвигов, районных легенд и эстетики “вид имели, деньги нет”.',
    pill: 'Статус: на стиле и без сдачи',
  },
}

базарю toggleId(items, targetId) {
  if (items.includes(targetId)) {
    отвечаю items.filter((item) => item !== targetId)
  }

  отвечаю [...items, targetId]
}

базарю App() {
  ёпта [activeNav, setActiveNav] = useState('feed')
  ёпта [activeStoryId, setActiveStoryId] = useState(bomzhgramData.stories[0]?.id ?? null)
  ёпта [likedPostIds, setLikedPostIds] = useState(
    bomzhgramData.posts.filter((post) => post.isLikedByDefault).map((post) => post.id),
  )
  ёпта [savedPostIds, setSavedPostIds] = useState(
    bomzhgramData.posts.filter((post) => post.isSavedByDefault).map((post) => post.id),
  )

  базарю handleSelectNav(navId) {
    setActiveNav(navId)
  }

  базарю handleSelectStory(storyId) {
    setActiveStoryId(storyId)
  }

  базарю handleToggleLike(postId) {
    setLikedPostIds((currentIds) => toggleId(currentIds, postId))
  }

  базарю handleToggleSave(postId) {
    setSavedPostIds((currentIds) => toggleId(currentIds, postId))
  }

  ёпта feedMeta = feedMetaByNav[activeNav] ?? feedMetaByNav.feed

  внатуре отвечаю (
    <AppShell
      activeNav={activeNav}
      activeStoryId={activeStoryId}
      feedMeta={feedMeta}
      likedPostIds={likedPostIds}
      onSelectNav={handleSelectNav}
      onSelectStory={handleSelectStory}
      onToggleLike={handleToggleLike}
      onToggleSave={handleToggleSave}
      posts={bomzhgramData.posts}
      profile={bomzhgramData.profile}
      savedPostIds={savedPostIds}
      stories={bomzhgramData.stories}
      suggestions={bomzhgramData.suggestions}
    />
  )
}

йопта экспорт по-братски App
