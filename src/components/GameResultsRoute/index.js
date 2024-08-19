import Navbar from '../Navbar'
import ReportContext from '../../context/ReportContext'
import './index.css'

const GameResultsRoute = props => (
  <ReportContext.Consumer>
    {value => {
      const {score} = value
      const onToReport = () => {
        const {history} = props
        return history.push('/game-report')
      }
      return (
        <section className="homeRoute">
          <Navbar />
          <section className="homeSection">
            {score > 5 ? (
              <div className="resultsCard won">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                  alt="won"
                  className="trophy"
                />
                <h1 className="congrats">Congrats!</h1>
                <h1 className="percent">{score * 10}% Correctly Answered</h1>
                <p className="stat1">Quiz completed successfully.</p>
                <p className="attempted">
                  You attempted {score} out of 10 questions as correct.
                </p>
                <button type="button" className="button" onClick={onToReport}>
                  Report
                </button>
              </div>
            ) : (
              <div className="resultsCard">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                  alt="lose"
                  className="lose"
                />
                <h1 className="congrats">You lose!</h1>
                <h1 className="percent">{score * 10}% Correctly Answered</h1>
                <p className="attempted">
                  You attempted {score} out of 10 questions as correct.
                </p>
                <button type="button" className="button" onClick={onToReport}>
                  Report
                </button>
              </div>
            )}
          </section>
        </section>
      )
    }}
  </ReportContext.Consumer>
)

export default GameResultsRoute
