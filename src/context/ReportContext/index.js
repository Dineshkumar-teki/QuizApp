import React from 'react'

const ReportContext = React.createContext({
  score: 0,
  setFinalScore: () => {},
  quizReport: [],
  setFinalQuizReport: () => {},
})

export default ReportContext
