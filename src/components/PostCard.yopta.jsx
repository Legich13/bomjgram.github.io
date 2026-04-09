йопта импорт GlyphIcon из './GlyphIcon.yopta.jsx'

базарю PostCard({ isLiked, isSaved, onToggleLike, onToggleSave, post }) {
  внатуре отвечаю (
    <article className="post-card panel">
      <header className="post-head">
        <div className="post-author-block">
          <img alt="" className="post-author-avatar" src={post.avatarSrc} />
          <div>
            <p className="post-author">{post.author}</p>
            <p className="post-location">{post.location}</p>
          </div>
        </div>

        <button className="post-tag" type="button">
          {post.handle}
        </button>
      </header>

      <div className="post-media-wrap">
        <img alt={post.alt} className="post-media" src={post.imageSrc} />
      </div>

      <div className="post-actions">
        <div className="post-actions-main">
          <button
            aria-label={`${isLiked ? 'Убрать лайк с поста' : 'Лайкнуть пост'} ${post.author}`}
            aria-pressed={isLiked}
            className={`icon-button ${isLiked ? 'is-liked' : ''}`}
            onClick={() => onToggleLike(post.id)}
            type="button"
          >
            <GlyphIcon filled={isLiked} name="heart" />
          </button>
          <button aria-label={`Комментарий к посту ${post.author}`} className="icon-button" type="button">
            <GlyphIcon name="comment" />
          </button>
          <button aria-label={`Поделиться постом ${post.author}`} className="icon-button" type="button">
            <GlyphIcon name="share" />
          </button>
        </div>

        <button
          aria-label={`${isSaved ? 'Убрать пост из сейвов' : 'Сохранить пост'} ${post.author}`}
          aria-pressed={isSaved}
          className="icon-button"
          onClick={() => onToggleSave(post.id)}
          type="button"
        >
          <GlyphIcon filled={isSaved} name="stash" />
        </button>
      </div>

      <div className="post-copy">
        <p className="post-likes">{post.likesLabel}</p>
        <p className="post-caption">
          <span className="post-caption-author">{post.author}</span> {post.caption}
        </p>
        <button className="post-comments-link" type="button">
          {post.commentsPreview}
        </button>
        <p className="post-time">{post.timestamp}</p>
      </div>
    </article>
  )
}

йопта экспорт по-братски PostCard
