базарю SuggestionList({ suggestions }) {
  внатуре отвечаю (
    <section aria-labelledby="suggestions-title" className="suggestions panel">
      <div className="suggestions-head">
        <div>
          <p className="panel-kicker">Кого мутить на лавке</p>
          <h2 className="panel-title" id="suggestions-title">
            Рекомендации по странному вайбу
          </h2>
        </div>
        <button className="ghost-link" type="button">
          Освежить слухи
        </button>
      </div>

      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div className="suggestion-row" key={suggestion.id}>
            <div className="suggestion-profile">
              <img alt="" className="suggestion-avatar" src={suggestion.avatarSrc} />
              <div>
                <p className="suggestion-name">{suggestion.name}</p>
                <p className="suggestion-reason">{suggestion.reason}</p>
              </div>
            </div>

            <button className="follow-pill" type="button">
              Позвать
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

йопта экспорт по-братски SuggestionList
