import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { handleAnswerQuestion } from "../actions/questions"

class Answer extends Component {
  state = {
    selectedOption: null,
  }
  handleSubmit = e => {
    const { dispatch, id, authedUser } = this.props
    const { selectedOption } = this.state
    console.log(authedUser, selectedOption, id)
    dispatch(handleAnswerQuestion(selectedOption, id, authedUser))
  }
  render() {
    const { userData, question, id } = this.props
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
            <div>
              <input
                onChange={e => {
                  this.setState({
                    selectedOption: e.target.value,
                  })
                }}
                type='radio'
                name='option'
                value='optionOne'
              />
              <label>{question.optionOne.text}</label>
            </div>
            <div>
              <input
                onChange={e => {
                  this.setState({
                    selectedOption: e.target.value,
                  })
                }}
                type='radio'
                name='option'
                value='optionTwo'
              />
              <label>{question.optionTwo.text}</label>
            </div>
            <Link
              to={`/answer/${id}`}
              type='submit'
              onClick={this.handleSubmit}
            >
              Submit
            </Link>
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
  return {
    userData,
    question,
    id,
    authedUser,
  }
}
export default connect(mapStateToProps)(Answer)
