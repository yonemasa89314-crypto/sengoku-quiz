import { useState } from 'react'

function getGrade(score, total) {
  const pct = score / total
  if (pct >= 0.93) return { grade: 'S', label: '歴史マスター！', color: '#ffd700', bg: '#fffde7', emoji: '👑' }
  if (pct >= 0.8) return { grade: 'A', label: 'すごい！', color: '#43a047', bg: '#e8f5e9', emoji: '🏆' }
  if (pct >= 0.6) return { grade: 'B', label: 'よくできました！', color: '#1565c0', bg: '#e3f2fd', emoji: '⭐' }
  if (pct >= 0.4) return { grade: 'C', label: 'もうすこし！', color: '#e65100', bg: '#fff3e0', emoji: '📖' }
  return { grade: 'D', label: 'もっとべんきょうしよう！', color: '#c62828', bg: '#ffebee', emoji: '💪' }
}

function getMessage(score, total) {
  const pct = score / total
  if (pct === 1) return '全問正解！あなたは戦国時代のプロだ！NHK「豊臣兄弟！」をもっと楽しめるね！'
  if (pct >= 0.8) return 'とてもよくできました！豊臣兄弟のことがよく分かってるね！'
  if (pct >= 0.6) return 'なかなかよくできました！もう一度チャレンジして全問正解をめざそう！'
  if (pct >= 0.4) return 'まだまだこれから！NHK「豊臣兄弟！」を見てもう一度チャレンジしてみよう！'
  return 'NHK「豊臣兄弟！」を見ながら、もう一度チャレンジしてみよう！きっとできるよ！'
}

export default function ResultScreen({ score, total, answers, onRestart }) {
  const [showMistakes, setShowMistakes] = useState(false)
  const { grade, label, color, bg, emoji } = getGrade(score, total)
  const message = getMessage(score, total)
  const mistakes = answers.filter((a) => !a.isCorrect)

  return (
    <div className="result-screen">
      <div className="result-header">
        <div className="result-emoji">{emoji}</div>
        <h2 className="result-title">けっか発表！</h2>
      </div>

      <div className="result-score-card" style={{ borderColor: color, background: bg }}>
        <div className="result-grade" style={{ color }}>
          {grade}ランク
        </div>
        <div className="result-score">
          <span className="result-num" style={{ color }}>{score}</span>
          <span className="result-denom"> / {total}</span>
          <span className="result-unit">問せいかい</span>
        </div>
        <p className="result-label" style={{ color }}>{label}</p>
      </div>

      <div className="result-message-box">
        <p className="result-message">{message}</p>
      </div>

      {mistakes.length > 0 && (
        <div className="mistakes-section">
          <button
            className="mistakes-toggle"
            onClick={() => setShowMistakes(!showMistakes)}
          >
            {showMistakes ? '▲ まちがえた問題を隠す' : `▼ まちがえた問題を見る（${mistakes.length}問）`}
          </button>

          {showMistakes && (
            <div className="mistakes-list">
              {mistakes.map((a, i) => (
                <div key={i} className="mistake-item">
                  <div className="mistake-q">
                    <span className="mistake-emoji">{a.emoji}</span>
                    <span className="mistake-question">{a.question}</span>
                  </div>
                  <div className="mistake-answers">
                    <div className="mistake-wrong">
                      ❌ あなたの答え：{a.choices[a.selectedIndex]}
                    </div>
                    <div className="mistake-correct">
                      ✅ 正解：{a.choices[a.correctIndex]}
                    </div>
                  </div>
                  <p className="mistake-explanation">{a.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mistakes.length === 0 && (
        <div className="perfect-badge">
          🌟 全問せいかい！すごすぎる！ 🌟
        </div>
      )}

      <button className="restart-btn" onClick={onRestart}>
        🔄 もう一度あそぶ
      </button>

      <p className="result-footer">
        NHK「豊臣兄弟！」を見てもっと歴史をすきになろう！
      </p>
    </div>
  )
}
