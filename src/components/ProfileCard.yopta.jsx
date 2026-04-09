базарю ProfileCard({ profile }) {
  внатуре отвечаю (
    <section className="profile-card panel">
      <div className="profile-card-head">
        <img alt="" className="profile-avatar" src={profile.avatarSrc} />
        <div>
          <p className="profile-name">{profile.name}</p>
          <p className="profile-handle">{profile.handle}</p>
        </div>
      </div>

      <p className="profile-status">{profile.status}</p>
      <p className="profile-tagline">{profile.tagline}</p>

      <div className="profile-stats">
        <div>
          <strong>12</strong>
          <span>районов</span>
        </div>
        <div>
          <strong>404</strong>
          <span>сторис</span>
        </div>
        <div>
          <strong>27</strong>
          <span>сейвов</span>
        </div>
      </div>
    </section>
  )
}

йопта экспорт по-братски ProfileCard
