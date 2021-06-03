import React, { Component } from "react"
import { connect } from "react-redux"

class Result extends Component {
  render() {
    const { userData, question, value } = this.props
    const oOneVotes = question.optionOne.votes.length
    const oTwoVotes = question.optionTwo.votes.length
    const sumVotes = oOneVotes + oTwoVotes
    const oOnePrecent = (oOneVotes / sumVotes) * 100
    const oTwoPrecent = (oTwoVotes / sumVotes) * 100
    return (
      <div className='box'>
        <div className='text'>
          <p>Asked by {userData.name}</p>
        </div>
        <div className='data'>
          <div className='image'>
            <div
              style={{ backgroundImage: `url(${userData.avatarURL})` }}
            ></div>
          </div>
          <div className='result'>
            <h3>Results:</h3>

            <div
              className={oOnePrecent > oTwoPrecent ? "votes active" : "votes"}
            >
              <p>Would you rather {question.optionOne.text}</p>
              <div>
                <span style={{ width: `${oOnePrecent}%` }}>
                  {oOnePrecent.toFixed(0)}% &nbsp;
                </span>
              </div>
              {value === "optionOne" && (
                <div className='ur-vote'>Your Vote</div>
              )}
              <p>
                {oOneVotes} out of {sumVotes} votes
              </p>
            </div>
            <div
              className={oOnePrecent < oTwoPrecent ? "votes active" : "votes"}
            >
              <p>Would you rather {question.optionTwo.text}</p>
              <div>
                <span style={{ width: `${oTwoPrecent}%` }}>
                  {oTwoPrecent.toFixed(0)}% &nbsp;
                </span>
              </div>
              {value === "optionTwo" && (
                <div className='ur-vote'>Your Vote</div>
              )}
              <p>
                {oTwoVotes} out of {sumVotes} votes
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params
  const userData = users[questions[id].author]
  const question = questions[id]
  const answered = Object.keys(users[authedUser].answers).includes(question.id)
  const value = answered && users[authedUser].answers[question.id]
  return {
    userData,
    question,
    answered,
    value,
  }
}

export default connect(mapStateToProps)(Result)
