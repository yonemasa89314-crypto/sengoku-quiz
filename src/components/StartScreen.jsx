export default function StartScreen({ onStart, total }) {
  return (
    <div className="start-screen">
      <div className="start-deco top-deco">⚔️ 🏯 ⚔️</div>

      <div className="start-card">
        <div className="start-title-emoji">🐒</div>
        <h1 className="start-title">
          戦国武将
          <br />
          <span className="start-title-accent">クイズ</span>
        </h1>
        <p className="start-subtitle">
          NHK「豊臣兄弟！」を見た人にぴったり！
        </p>

        <div className="start-info-box">
          <div className="start-info-row">
            <span>📋</span>
            <span>ぜんぶで <strong>{total}問</strong></span>
          </div>
          <div className="start-info-row">
            <span>💡</span>
            <span>こまったら <strong>ヒント</strong> が使えるよ</span>
          </div>
          <div className="start-info-row">
            <span>📖</span>
            <span>答えのあとに <strong>かいせつ</strong> が読めるよ</span>
          </div>
        </div>

        <div className="start-target">
          <span>🎒 小学生向け</span>
          <span>📱 スマホで遊べる</span>
        </div>

        <button className="start-btn" onClick={onStart}>
          🎮 クイズをはじめる！
        </button>
      </div>

      <div className="start-deco bottom-deco">🌸 🗡️ 🌸</div>
    </div>
  )
}
