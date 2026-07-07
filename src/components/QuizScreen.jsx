import { useState } from 'react'

const LABELS = ['Ａ', 'Ｂ', 'Ｃ', 'Ｄ']
const COLORS = ['btn-red', 'btn-blue', 'btn-green', 'btn-purple']

export default function QuizScreen({ question, questionIndex, total, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null)
  const [showHint, setShowHint] = useState(false)

  const isAnswered = selected !== null
  const isCorrect = isAnswered && selected === question.correct
  const progress = ((questionIndex) / total) * 100

  const handleSelect = (index) => {
    if (isAnswered) return
    setSelected(index)
    onAnswer(index)
  }

  return (
    <div className="quiz-screen">
      {/* ── progress ── */}
      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-label">
          <span className="progress-current">{questionIndex + 1}</span>
          <span className="progress-sep"> / </span>
          <span className="progress-total">{total}</span>
          <span className="progress-unit">問</span>
        </div>
      </div>

      {/* ── question card ── */}
      <div className="question-card">
        <div className="question-emoji" role="img" aria-hidden="true">
          {question.emoji}
        </div>
        <p className="question-text">{question.question}</p>

        <button
          className={`hint-toggle ${showHint ? 'hint-open' : ''}`}
          onClick={() => setShowHint(!showHint)}
          aria-expanded={showHint}
        >
          💡 {showHint ? 'ヒントを隠す' : 'ヒントを見る'}
        </button>

        {showHint && (
          <div className="hint-box">
            👉 {question.hint}
          </div>
        )}
      </div>

      {/* ── choices ── */}
      <div className="choices-grid">
        {question.choices.map((choice, i) => {
          let extra = ''
          if (isAnswered) {
            if (i === question.correct) extra = ' choice-correct'
            else if (i === selected) extra = ' choice-wrong'
            else extra = ' choice-dim'
          }
          return (
            <button
              key={i}
              className={`choice-btn ${COLORS[i]}${extra}`}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              aria-label={`選択肢 ${LABELS[i]}: ${choice}`}
            >
              <span className="choice-label">{LABELS[i]}</span>
              <span className="choice-text">{choice}</span>
            </button>
          )
        })}
      </div>

      {/* ── feedback ── */}
      {isAnswered && (
        <div className={`feedback-card ${isCorrect ? 'feedback-ok' : 'feedback-ng'}`}>
          <div className="feedback-header">
            <span className="feedback-icon">{isCorrect ? '🎉' : '😢'}</span>
            <span className="feedback-title">
              {isCorrect
                ? 'せいかい！'
                : `ざんねん！正解は「${question.choices[question.correct]}」だよ`}
            </span>
          </div>
          <p className="feedback-explanation">{question.explanation}</p>
          <button className="next-btn" onClick={onNext}>
            {questionIndex + 1 >= total ? '🏆 けっかをみる！' : 'つぎの問題へ →'}
          </button>
        </div>
      )}
    </div>
  )
}
