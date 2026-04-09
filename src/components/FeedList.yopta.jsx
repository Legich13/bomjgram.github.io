йопта импорт PostCard из './PostCard.yopta.jsx'

базарю FeedList({ likedPostIds, onToggleLike, onToggleSave, posts, savedPostIds }) {
  внатуре отвечаю (
    <section aria-label="Лента постов" className="feed-list">
      {posts.map((post) => (
        <PostCard
          isLiked={likedPostIds.includes(post.id)}
          isSaved={savedPostIds.includes(post.id)}
          key={post.id}
          onToggleLike={onToggleLike}
          onToggleSave={onToggleSave}
          post={post}
        />
      ))}
    </section>
  )
}

йопта экспорт по-братски FeedList
