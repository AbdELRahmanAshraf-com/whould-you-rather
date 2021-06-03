import React, { Component } from "react"
import { connect } from "react-redux"

class Score extends Component {
  render() {
    const { userData, answeredQuestionCount, createdQuestionsCount, score } =
      this.props
    return (
      <div className='box'>
        <div className='data'>
          <div className='image'>
            <div
              style={{ backgroundImage: `url(${userData.avatarURL})` }}
            ></div>
          </div>
          <div className='score-info'>
            <h2>{userData.name}</h2>
            <div className='res'>
              <p>Answered Questions</p>
              <span>{answeredQuestionCount}</span>
              <hr />
              <p>Created Questions</p>
              <span>{createdQuestionsCount}</span>
            </div>
          </div>
          <div className='score'>
            <div className='score-cal'>
              <div>Score</div>
              <div>
                <div className='score-num'>
                  <span>{score}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users }, { id }) => {
  const userData = users[id]
  const createdQuestionsCount = userData.questions.length
  const answeredQuestionCount = Object.keys(userData.answers).length
  const score = answeredQuestionCount + createdQuestionsCount
  return {
    userData,
    answeredQuestionCount,
    createdQuestionsCount,
    score,
  }
}

export default connect(mapStateToProps)(Score)
