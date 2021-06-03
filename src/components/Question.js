import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"

class Question extends Component {
  render() {
    const { userData, question, answered } = this.props
    return (
      <div className='box'>
        <div className='text'>
          <p>{userData.name} asks</p>
        </div>
        <div className='data'>
          <div className='image'>
            <div
              style={{ backgroundImage: `url(${userData.avatarURL})` }}
            ></div>
          </div>
          <div className='q-info'>
            <p>Would you rather</p>
            <p>
              {question.optionOne.text.split(" ").slice(0, 4).join(" ")} or ...
            </p>
            <Link
              to={
                answered ? `/answer/${question.id}` : `/question/${question.id}`
              }
            >
              View Poll
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const userData = users[questions[id].author]
  const question = questions[id]
  const answered = Object.keys(users[authedUser].answers).includes(question.id)
  return {
    userData,
    question,
    answered,
  }
}

export default connect(mapStateToProps)(Question)
