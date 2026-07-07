import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import { questions } from './data/questions'

export default function App() {
  const [screen, setScreen] = useState('start')
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleStart = () => {
    setScreen('quiz')
    setCurrentQ(0)
    setScore(0)
    setAnswers([])
  }

  const handleAnswer = (selectedIndex) => {
    const q = questions[currentQ]
    const isCorrect = selectedIndex === q.correct
    if (isCorrect) setScore((s) => s + 1)
    setAnswers((prev) => [
      ...prev,
      {
        id: q.id,
        question: q.question,
        emoji: q.emoji,
        choices: q.choices,
        selectedIndex,
        correctIndex: q.correct,
        isCorrect,
        explanation: q.explanation,
      },
    ])
  }

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setScreen('result')
    } else {
      setCurrentQ((q) => q + 1)
    }
  }

  const handleRestart = () => {
    setScreen('start')
  }

  return (
    <div className="app-wrapper">
      {screen === 'start' && <StartScreen onStart={handleStart} total={questions.length} />}
      {screen === 'quiz' && (
        <QuizScreen
          key={currentQ}
          question={questions[currentQ]}
          questionIndex={currentQ}
          total={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
