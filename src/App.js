import {Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import QuizGameRoute from './components/QuizGameRoute'
import GameResultsRoute from './components/GameResultsRoute'
import ReportContext from './context/ReportContext'
import GameReportRoute from './components/GameReportRoute'
import NotFoundRoute from './components/NotFoundRoute'
import './App.css'

const App = () => {
  const [score, setScore] = useState(0)
  const [quizReport, setQuizReport] = useState([])

  const setFinalScore = () => {
    setScore(score + 1)
  }

  const setFinalQuizReport = item => {
    setQuizReport([...quizReport, item])
  }

  return (
    <ReportContext.Provider
      value={{
        score,
        setFinalScore,
        quizReport,
        setFinalQuizReport,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
        <ProtectedRoute exact path="/quiz-game" component={QuizGameRoute} />
        <ProtectedRoute
          exact
          path="/game-results"
          component={GameResultsRoute}
        />
        <ProtectedRoute exact path="/game-report" component={GameReportRoute} />
        <Route component={NotFoundRoute} />
      </Switch>
    </ReportContext.Provider>
  )
}

export default App
