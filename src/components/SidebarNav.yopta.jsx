йопта импорт GlyphIcon из './GlyphIcon.yopta.jsx'

базарю SidebarNav({ items, activeNav, onSelectNav }) {
  внатуре отвечаю (
    <aside className="sidebar" aria-label="Левая панель Бомжграмм">
      <div className="brand-lockup">
        <p className="brand-kicker">Дворовый social club</p>
        <h1 className="brand-logo">
          <span>Бомж</span>
          <span>грамм</span>
        </h1>
        <p className="brand-copy">
          Instagram-web вайб, но с асфальтовым luxury, чекушечным драматизмом и
          честной лавочной эстетикой.
        </p>
      </div>

      <nav aria-label="Лавочная навигация" className="sidebar-nav">
        {items.map((item) => {
          ёпта isActive = item.id === activeNav

          отвечаю (
            <button
              aria-current={isActive ? 'page' : undefined}
              className={`sidebar-link ${isActive ? 'is-active' : ''}`}
              key={item.id}
              onClick={() => onSelectNav(item.id)}
              type="button"
            >
              <GlyphIcon className="sidebar-link-icon" filled={isActive} name={item.icon} />
              <span>{item.label}</span>
              <span className="sidebar-link-pulse">{item.pulse}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar-note panel">
        <p className="panel-kicker">Сегодня по району</p>
        <p className="sidebar-note-text">
          Не путай бедность с концепцией. В этом сезоне в тренде злой glamour,
          пакетная философия и жинка-core до победного.
        </p>
      </div>
    </aside>
  )
}

йопта экспорт по-братски SidebarNav
