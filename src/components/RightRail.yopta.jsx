йопта импорт GlyphIcon из './GlyphIcon.yopta.jsx'
йопта импорт ProfileCard из './ProfileCard.yopta.jsx'
йопта импорт SuggestionList из './SuggestionList.yopta.jsx'

ёпта tipLines = [
  'Жинка-core держится на уверенности и трёх случайных слоях одежды.',
  'Сейвь посты не сердцем, а по принципу “покажу пацанам ночью”.',
  'Если день тяжёлый, включай режим “веди меня, чекушечка”.',
]

базарю RightRail({ profile, suggestions }) {
  внатуре отвечаю (
    <aside aria-label="Правая колонка" className="right-rail">
      <ProfileCard profile={profile} />
      <SuggestionList suggestions={suggestions} />

      <section className="tips-card panel">
        <div className="tips-head">
          <p className="panel-kicker">Кодекс дня</p>
          <GlyphIcon className="tips-spark" name="spark" />
        </div>

        <h2 className="panel-title">Чекушечный метод self-care</h2>

        <div className="tips-list">
          {tipLines.map((tipLine) => (
            <p className="tip-line" key={tipLine}>
              {tipLine}
            </p>
          ))}
        </div>
      </section>
    </aside>
  )
}

йопта экспорт по-братски RightRail
