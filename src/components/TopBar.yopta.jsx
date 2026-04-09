йопта импорт GlyphIcon из './GlyphIcon.yopta.jsx'

ёпта quickActions = [
  { id: 'search', icon: 'search', label: 'Разведка' },
  { id: 'rumors', icon: 'rumors', label: 'Слухи' },
  { id: 'stash', icon: 'stash', label: 'Сейвы' },
]

базарю TopBar({ onSelectNav }) {
  внатуре отвечаю (
    <header aria-label="Шапка Бомжграмм" className="topbar">
      <div>
        <p className="topbar-kicker">bomzhgramm.web</p>
        <h1 className="topbar-logo">Бомжграмм</h1>
      </div>

      <div className="topbar-actions">
        {quickActions.map((action) => (
          <button
            aria-label={action.label}
            className="topbar-action"
            key={action.id}
            onClick={() => onSelectNav(action.id)}
            type="button"
          >
            <GlyphIcon name={action.icon} />
          </button>
        ))}
      </div>
    </header>
  )
}

йопта экспорт по-братски TopBar
