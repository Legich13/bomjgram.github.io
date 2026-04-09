йопта импорт BottomNav из './BottomNav.yopta.jsx'
йопта импорт FeedList из './FeedList.yopta.jsx'
йопта импорт RightRail из './RightRail.yopta.jsx'
йопта импорт SidebarNav из './SidebarNav.yopta.jsx'
йопта импорт StoriesRail из './StoriesRail.yopta.jsx'
йопта импорт TopBar из './TopBar.yopta.jsx'

ёпта navItems = [
  { id: 'feed', icon: 'home', label: 'Лента', mobileLabel: 'Лента', pulse: 'район' },
  { id: 'search', icon: 'search', label: 'Разведка', mobileLabel: 'Поиск', pulse: 'нюх' },
  { id: 'reels', icon: 'reels', label: 'Коротыши', mobileLabel: 'Рилсы', pulse: 'дым' },
  { id: 'rumors', icon: 'rumors', label: 'Слухи', mobileLabel: 'Слухи', pulse: 'шум' },
  { id: 'stash', icon: 'stash', label: 'Сейвы', mobileLabel: 'Сейв', pulse: 'схрон' },
  { id: 'profile', icon: 'profile', label: 'Профиль', mobileLabel: 'Я', pulse: 'вид' },
]

базарю AppShell({
  activeNav,
  activeStoryId,
  feedMeta,
  likedPostIds,
  onSelectNav,
  onSelectStory,
  onToggleLike,
  onToggleSave,
  posts,
  profile,
  savedPostIds,
  stories,
  suggestions,
}) {
  внатуре отвечаю (
    <div className="bomzh-app">
      <TopBar onSelectNav={onSelectNav} />

      <div className="app-grid">
        <SidebarNav activeNav={activeNav} items={navItems} onSelectNav={onSelectNav} />

        <main className="feed-column">
          <section className="feed-hero panel">
            <div>
              <p className="panel-kicker">Бомжграмм.web</p>
              <h2 className="feed-hero-title">{feedMeta.title}</h2>
              <p className="feed-hero-copy">{feedMeta.description}</p>
            </div>
            <span className="feed-pill">{feedMeta.pill}</span>
          </section>

          <StoriesRail activeStoryId={activeStoryId} onSelectStory={onSelectStory} stories={stories} />

          <FeedList
            likedPostIds={likedPostIds}
            onToggleLike={onToggleLike}
            onToggleSave={onToggleSave}
            posts={posts}
            savedPostIds={savedPostIds}
          />
        </main>

        <RightRail profile={profile} suggestions={suggestions} />
      </div>

      <BottomNav activeNav={activeNav} items={navItems} onSelectNav={onSelectNav} />
    </div>
  )
}

йопта экспорт по-братски AppShell
