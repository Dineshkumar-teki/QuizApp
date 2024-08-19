import Navbar from '../Navbar'
import ReportContext from '../../context/ReportContext'
import './index.css'

const optionsView = {
  defaultoption: 'DEFAULT',
  imageoption: 'IMAGE',
  singleoption: 'SINGLE_SELECT',
}
const GameReportRoute = () => (
  <ReportContext.Consumer>
    {value => {
      const {score, quizReport} = value
      const displayOptionView = (optionsType, options) => {
        const optionsF = options.map(eachOption => ({
          id: eachOption.id,
          isCorrect: eachOption.is_correct,
          text: eachOption.text,
          imageUrl: eachOption.image_url,
        }))
        switch (optionsType) {
          case optionsView.defaultoption:
            return (
              <div className="defaultOptions">
                {optionsF.map(eachOne => {
                  const {id, isCorrect, text} = eachOne
                  return (
                    <div key={id}>
                      <button
                        className={`option ${
                          isCorrect === 'true' && 'rightOption'
                        }`}
                        disabled
                      >
                        {text}
                      </button>
                      {isCorrect === 'true' && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                          alt="correct checked circle"
                          className="rightAndWrongImg"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )

          case optionsView.singleoption:
            return (
              <div className="singleOptions">
                {optionsF.map(eachOne => {
                  const {id, isCorrect, text} = eachOne
                  return (
                    <div className="singleOption" key={id}>
                      <input
                        type="radio"
                        id={id}
                        name="single"
                        defaultChecked={isCorrect === 'true'}
                      />
                      <label htmlFor={id}>{text}</label>
                      {isCorrect === 'true' && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                          alt="correct checked circle"
                          className="rightAndWrongImg"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )

          case optionsView.imageoption:
            return (
              <div className="imageOptions">
                {optionsF.map(eachOne => {
                  const {id, isCorrect, imageUrl} = eachOne
                  return (
                    <button type="button" className="imgOption" key={id}>
                      <img className="optionImg" src={imageUrl} alt="" />
                      {isCorrect === 'true' && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                          alt="correct checked circle"
                          className="rightAndWrongImg"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            )

          default:
            return null
        }
      }
      return (
        <section className="gameReportRoute">
          <Navbar />
          <section className="reportSection">
            <div className="reportCard">
              <div className="topcard">
                <div className="marksCard">
                  <span className="marks">{score}</span>
                  <span className="slash">/</span>
                  <span className="total">10</span>
                </div>
                <div className="marksCla">
                  <div className="marksclassification">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                      alt="correct answer icon"
                      className="correctIcon"
                    />
                    <p>{score} Correct answers</p>
                  </div>
                  <div className="marksclassification">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                      alt="incorrect answer icon"
                      className="incorrectIcon"
                    />
                    <p>
                      {Math.abs(10 - score - quizReport.length)} Incorrect
                      answers
                    </p>
                  </div>
                  <div className="marksclassification">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                      alt="unattempted icon"
                      className="unattemptedIcon"
                    />
                    <p>{quizReport.length} Unattempted answers</p>
                  </div>
                </div>
              </div>
              <div className="bottomSection">
                {quizReport.length === 0 ? (
                  <h1 className="attemptedallTitle">
                    Attempted all the questions
                  </h1>
                ) : (
                  <>
                    <h1 className="unattemptedQuestionsTitle">
                      Unattempted Questions
                    </h1>
                    <ol className="unattemptedQuestions">
                      {quizReport.map(eachOne => (
                        <li key={eachOne.id} className="eachQuestion">
                          <h1>{eachOne.questionText}</h1>
                          {displayOptionView(
                            eachOne.optionsType,
                            eachOne.options,
                          )}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </section>
        </section>
      )
    }}
  </ReportContext.Consumer>
)

export default GameReportRoute
