import Navbar from '../Navbar'
import './index.css'

const HomeRoute = props => {
  const onStartGameBtn = () => {
    const {history} = props
    return history.replace('/quiz-game')
  }
  return (
    <section className="homeRoute">
      <Navbar />
      <section className="homeSection">
        <div className="homeCard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
          />
          <h1 className="homeQuestion">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="statement2">
            Test yourself with these easy quiz questions and answers
          </p>
          <button type="button" className="button" onClick={onStartGameBtn}>
            Start Quiz
          </button>
          <div className="alertMsg">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              alt="warning icon"
            />
            <p>All the progress will be lost, if you reload during the quiz</p>
          </div>
        </div>
      </section>
    </section>
  )
}
export default HomeRoute
