import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import { questions } from './data/questions'

const QUIZ_SIZE = 10

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export default function App() {
  const [screen, setScreen] = useState('start')
  const [activeQuestions, setActiveQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleStart = () => {
    setActiveQuestions(pickRandom(questions, QUIZ_SIZE))
    setCurrentQ(0)
    setScore(0)
    setAnswers([])
    setScreen('quiz')
  }

  const handleAnswer = (selectedIndex) => {
    const q = activeQuestions[currentQ]
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
    if (currentQ + 1 >= activeQuestions.length) {
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
      {screen === 'start' && (
        <StartScreen onStart={handleStart} total={QUIZ_SIZE} totalPool={questions.length} />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          key={currentQ}
          question={activeQuestions[currentQ]}
          questionIndex={currentQ}
          total={activeQuestions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={score}
          total={activeQuestions.length}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
