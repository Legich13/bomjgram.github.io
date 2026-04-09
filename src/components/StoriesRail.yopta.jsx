базарю StoriesRail({ activeStoryId, onSelectStory, stories }) {
  внатуре отвечаю (
    <section aria-labelledby="stories-title" className="stories panel">
      <div className="stories-head">
        <div>
          <p className="panel-kicker">Кружки у подъезда</p>
          <h2 className="panel-title" id="stories-title">
            У кого сегодня новая районная легенда
          </h2>
        </div>
        <span className="stories-tail">Потяни вправо, если жизнь жмёт</span>
      </div>

      <div className="stories-rail">
        {stories.map((story) => {
          ёпта isActive = story.id === activeStoryId

          отвечаю (
            <button
              aria-label={`История ${story.author}`}
              aria-pressed={isActive}
              className={`story-chip ${isActive ? 'is-active' : ''} ${story.seen ? 'is-seen' : ''}`}
              key={story.id}
              onClick={() => onSelectStory(story.id)}
              type="button"
            >
              <span className="story-ring">
                <img alt="" className="story-avatar" src={story.avatarSrc} />
              </span>
              <span className="story-author">{story.author}</span>
              <span className="story-badge">{story.badgeText}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

йопта экспорт по-братски StoriesRail
