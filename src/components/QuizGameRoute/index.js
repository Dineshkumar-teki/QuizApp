import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReportContext from '../../context/ReportContext'
import Navbar from '../Navbar'
import './index.css'

const pageViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}
const optionsView = {
  defaultoption: 'DEFAULT',
  imageoption: 'IMAGE',
  singleoption: 'SINGLE_SELECT',
}
let intervalId
let onClickNextBtn
let onClickSubmitBtn
class QuizGameRoute extends Component {
  state = {
    pageView: pageViews.initial,
    quizQuestions: [],
    questionNumber: 0,
    userChoice: '',
    timer: 15,
    totalQuestions: 0,
  }

  componentDidMount() {
    this.getQuizQuestions()
  }

  componentWillUnmount() {
    clearInterval(intervalId)
  }

  startQuestionTimer = () => {
    intervalId = setInterval(() => {
      const {timer, questionNumber, quizQuestions} = this.state
      if (timer === 0) {
        if (questionNumber === quizQuestions.length - 1) {
          onClickSubmitBtn()
        } else {
          onClickNextBtn()
        }
      } else {
        this.setState(prevState => ({timer: prevState.timer - 1}))
      }
    }, 1000)
  }

  getQuizQuestions = async () => {
    this.setState({pageView: pageViews.pending})
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const {questions, total} = data
      const formatedQuestions = questions.map(eachOne => ({
        id: eachOne.id,
        options: eachOne.options,
        optionsType: eachOne.options_type,
        questionText: eachOne.question_text,
      }))
      this.setState({
        pageView: pageViews.success,
        quizQuestions: formatedQuestions,
        totalQuestions: total,
      })
      this.startQuestionTimer()
    } else {
      this.setState({pageView: pageViews.failure})
    }
  }

  onNextQuestion = () => {
    clearInterval(intervalId)
    const {questionNumber} = this.state
    if (questionNumber < 10) {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1,
        userChoice: '',
        timer: 15,
      }))
    }
    this.startQuestionTimer()
  }

  selectedOption = id => {
    clearInterval(intervalId)
    this.setState({userChoice: id})
  }

  handleUserChoice = option => {
    const {userChoice} = this.state
    let result = ''
    if (userChoice === option.id && option.isCorrect === 'true') {
      result = 'rightOption'
    } else if (userChoice === option.id && option.isCorrect === 'false') {
      result = 'wrongOption'
    } else if (option.isCorrect === 'true') {
      result = 'rightOption'
    }
    return result
  }

  handleRAWImg = option => {
    const {userChoice} = this.state
    if (userChoice === option.id && option.isCorrect === 'true') {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
          className="rightAndWrongImg"
        />
      )
    }
    if (userChoice === option.id && option.isCorrect === 'false') {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
          alt="incorrect close circle"
          className="rightAndWrongImg"
        />
      )
    }
    if (option.isCorrect === 'true') {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
          className="rightAndWrongImg"
        />
      )
    }
    return null
  }

  onRetryBtn = () => {
    this.getQuizQuestions()
  }

  displayOptionView = (optionsType, options) => {
    const {userChoice} = this.state
    const optionsF = options.map(eachOption => ({
      id: eachOption.id,
      isCorrect: eachOption.is_correct,
      text: eachOption.text,
      imageUrl: eachOption.image_url,
    }))
    switch (optionsType) {
      case optionsView.defaultoption:
        return (
          <ReportContext.Consumer>
            {value => {
              const {setFinalScore} = value
              return (
                <ul className="defaultOptions">
                  {optionsF.map(eachOne => {
                    const {id, isCorrect, text} = eachOne
                    const onchooseOption = () => {
                      if (isCorrect === 'true') {
                        setFinalScore()
                      }
                      this.selectedOption(id, isCorrect)
                    }
                    return (
                      <li key={id}>
                        <button
                          className={`option ${
                            userChoice && this.handleUserChoice(eachOne)
                          }`}
                          onClick={onchooseOption}
                          disabled={userChoice}
                        >
                          {text}
                        </button>
                        {userChoice && this.handleRAWImg(eachOne)}
                      </li>
                    )
                  })}
                </ul>
              )
            }}
          </ReportContext.Consumer>
        )
      case optionsView.singleoption:
        return (
          <ReportContext.Consumer>
            {value => {
              const {setFinalScore} = value
              return (
                <ul className="singleOptions">
                  {optionsF.map(eachOne => {
                    const {id, isCorrect, text} = eachOne
                    const onchooseOption = () => {
                      if (isCorrect === 'true') {
                        setFinalScore()
                      }
                      this.selectedOption(id, isCorrect)
                    }
                    return (
                      <li className="singleOption" key={id}>
                        <input
                          type="radio"
                          id={id}
                          name="single"
                          onChange={onchooseOption}
                        />
                        <label htmlFor={id}>{text}</label>
                        {userChoice && this.handleRAWImg(eachOne)}
                      </li>
                    )
                  })}
                </ul>
              )
            }}
          </ReportContext.Consumer>
        )
      case optionsView.imageoption:
        return (
          <ReportContext.Consumer>
            {value => {
              const {setFinalScore} = value
              return (
                <ul className="imageOptions">
                  {optionsF.map(eachOne => {
                    const {id, isCorrect, text, imageUrl} = eachOne
                    const onchooseOption = () => {
                      if (isCorrect === 'true') {
                        setFinalScore()
                      }
                      this.selectedOption(id, isCorrect)
                    }
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          className="imgOption"
                          onClick={onchooseOption}
                        >
                          <img
                            className="optionImg"
                            src={imageUrl}
                            alt={text}
                          />
                        </button>
                        {userChoice && this.handleRAWImg(eachOne)}
                      </li>
                    )
                  })}
                </ul>
              )
            }}
          </ReportContext.Consumer>
        )

      default:
        return null
    }
  }

  onSubmitQuiz = score => {
    clearInterval(intervalId)
    const {totalQuestions} = this.state
    // const scoreInPercentage = math.floor((score * 100) / totalQuestions)
    const {history} = this.props
    return history.replace('/game-results')
  }

  displaySuccessView = () => {
    const {
      quizQuestions,
      questionNumber,
      userChoice,
      timer,
      totalQuestions,
    } = this.state
    const {id, options, optionsType, questionText} = quizQuestions[
      questionNumber
    ]
    return (
      <ReportContext.Consumer>
        {value => {
          const {setFinalQuizReport, quizReport, score} = value
          onClickSubmitBtn = () => {
            if (userChoice === '') {
              const item = quizQuestions[questionNumber]
              setFinalQuizReport(item)
            }
            this.onSubmitQuiz(score)
          }
          onClickNextBtn = () => {
            if (userChoice === '') {
              const item = quizQuestions[questionNumber]
              setFinalQuizReport(item)
            }
            this.onNextQuestion()
          }
          return (
            <>
              <div className="scoreAndTimerCard">
                <div className="scoreCard">
                  <p className="title">Question</p>
                  <p className="score">
                    {questionNumber + 1}/{totalQuestions}
                  </p>
                </div>
                <div className="timerCard">
                  <p>{timer}</p>
                </div>
              </div>
              <div className="questionCard">
                <p>{questionText}</p>
                {this.displayOptionView(optionsType, options)}
                {questionNumber === quizQuestions.length - 1 ? (
                  <button
                    type="button"
                    className={`nextQuestionBtn ${userChoice && 'active'} `}
                    onClick={onClickSubmitBtn}
                    disabled={userChoice === ''}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`nextQuestionBtn ${userChoice && 'active'} `}
                    onClick={onClickNextBtn}
                    disabled={userChoice === ''}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </>
          )
        }}
      </ReportContext.Consumer>
    )
  }

  displayPageView = () => {
    const {pageView} = this.state
    switch (pageView) {
      case pageViews.success:
        return <>{this.displaySuccessView()}</>
      case pageViews.failure:
        return (
          <section className="failureView">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
              alt="failure view"
            />
            <h1>Something went wrong</h1>
            <p>Our servers are busy please try again</p>
            <button type="button" className="button" onClick={this.onRetryBtn}>
              Retry
            </button>
          </section>
        )
      case pageViews.pending:
        return (
          <div className="loader-container loader" data-testid="loader">
            <Loader type="ThreeDots" color="#263868" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <section className="quizGameRoute">
        <Navbar />
        <section className="homeSection">
          <div className="gameCard">{this.displayPageView()}</div>
        </section>
      </section>
    )
  }
}

export default QuizGameRoute
