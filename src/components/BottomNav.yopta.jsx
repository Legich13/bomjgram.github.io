йопта импорт GlyphIcon из './GlyphIcon.yopta.jsx'

базарю BottomNav({ activeNav, items, onSelectNav }) {
  внатуре отвечаю (
    <nav aria-label="Нижняя навигация" className="bottom-nav">
      {items.map((item) => {
        ёпта isActive = item.id === activeNav

        отвечаю (
          <button
            aria-current={isActive ? 'page' : undefined}
            className={`bottom-nav-link ${isActive ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => onSelectNav(item.id)}
            type="button"
          >
            <GlyphIcon filled={isActive} name={item.icon} />
            <span>{item.mobileLabel}</span>
          </button>
        )
      })}
    </nav>
  )
}

йопта экспорт по-братски BottomNav
