import React, { Component } from "react"
import Question from "./Question"
import { connect } from "react-redux"

class Switcher extends Component {
  state = {
    isAnswered: false,
  }
  render() {
    const { unAnsweredQuestions, answeredQuestions } = this.props
    return (
      <div className='switcher-comp'>
        <div className='switcher'>
          <button
            className={!this.state.isAnswered ? "active" : ""}
            onClick={() =>
              this.setState({
                isAnswered: false,
              })
            }
          >
            Unanswerd Questions
          </button>
          <button
            className={this.state.isAnswered ? "active" : ""}
            onClick={() =>
              this.setState({
                isAnswered: true,
              })
            }
          >
            Answerd Questions
          </button>
        </div>
        <div className='ques_list'>
          {this.state.isAnswered
            ? answeredQuestions &&
              answeredQuestions.map(q => <Question id={q.id} key={q.id} />)
            : unAnsweredQuestions &&
              unAnsweredQuestions.map(q => <Question id={q.id} key={q.id} />)}
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ questions, users, authedUser }) => {
  const sortedQuestions = Object.values(questions).sort(
    (a, b) => b.timestamp - a.timestamp
  )
  const userAnswers = Object.keys(users[authedUser].answers)
  const answeredQuestions = sortedQuestions.filter(q =>
    userAnswers.includes(q.id)
  )
  const unAnsweredQuestions = sortedQuestions.filter(
    q => !userAnswers.includes(q.id)
  )

  return {
    answeredQuestions,
    unAnsweredQuestions,
    users,
    questions,
  }
}

export default connect(mapStateToProps)(Switcher)
