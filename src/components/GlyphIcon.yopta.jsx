базарю GlyphIcon({ name, filled = false, className = '' }) {
  ёпта iconClassName = `glyph-icon ${className}`.trim()

  if (name === 'home') {
    внатуре отвечаю filled ? (
      <svg aria-hidden="true" className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3.5 3.5 10.4V21h6.4v-5.4h4.2V21h6.4V10.4L12 3.5Z" />
      </svg>
    ) : (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="M3.5 10.4 12 3.5l8.5 6.9" />
        <path d="M5 9.8V21h5.4v-5.4h3.2V21H19V9.8" />
      </svg>
    )
  }

  if (name === 'search') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? '2.2' : '1.9'} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6.2" />
        <path d="m16 16 4.4 4.4" />
      </svg>
    )
  }

  if (name === 'reels') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <rect height="16.5" rx="3" width="15" x="4.5" y="3.75" />
        <path d="m9.8 3.8 2.8 4.1" />
        <path d="m14 3.8 2.8 4.1" />
        <path d="m10 10.2 5.2 2.8-5.2 2.8Z" fill={filled ? '#181213' : 'currentColor'} stroke="none" />
      </svg>
    )
  }

  if (name === 'rumors') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="M5.2 6.2h13.6v9.2H9.7l-4.5 3.9V6.2Z" />
        <circle cx="9.2" cy="10.8" fill={filled ? '#181213' : 'currentColor'} r="0.9" stroke="none" />
        <circle cx="12" cy="10.8" fill={filled ? '#181213' : 'currentColor'} r="0.9" stroke="none" />
        <circle cx="14.8" cy="10.8" fill={filled ? '#181213' : 'currentColor'} r="0.9" stroke="none" />
      </svg>
    )
  }

  if (name === 'stash') {
    внатуре отвечаю filled ? (
      <svg aria-hidden="true" className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 3.8h12v16.4l-6-3.3-6 3.3V3.8Z" />
      </svg>
    ) : (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="M6 3.8h12v16.4l-6-3.3-6 3.3V3.8Z" />
      </svg>
    )
  }

  if (name === 'profile') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <circle cx="12" cy="8.2" fill={filled ? '#181213' : 'none'} r="3.6" />
        <path d="M5 19c1.3-3.4 4-5.1 7-5.1s5.7 1.7 7 5.1" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  }

  if (name === 'heart') {
    внатуре отвечаю filled ? (
      <svg aria-hidden="true" className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 20.5 4.4 13.1a5 5 0 0 1 7.1-7.1L12 6.5l.5-.5a5 5 0 0 1 7.1 7.1L12 20.5Z" />
      </svg>
    ) : (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="M12 20.5 4.4 13.1a5 5 0 0 1 7.1-7.1L12 6.5l.5-.5a5 5 0 0 1 7.1 7.1L12 20.5Z" />
      </svg>
    )
  }

  if (name === 'comment') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="M4.5 5.4h15v10.2H9.6l-5.1 4.2V5.4Z" />
      </svg>
    )
  }

  if (name === 'share') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="M21 3 10.2 13.8" />
        <path d="M21 3 14 20l-3.8-6.2L4 10.2 21 3Z" />
      </svg>
    )
  }

  if (name === 'spark') {
    внатуре отвечаю (
      <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
        <path d="m12 3 1.8 4.8L19 9.6l-4.8 1.8L12 16.2l-1.8-4.8L5 9.6l5.2-1.8L12 3Z" />
      </svg>
    )
  }

  внатуре отвечаю (
    <svg aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
}

йопта экспорт по-братски GlyphIcon
