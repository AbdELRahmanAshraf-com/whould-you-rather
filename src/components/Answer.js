import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAnswerQuestion } from "../actions/questions"

class Answer extends Component {
  handleSubmit = e => {
    const option = e.target.elements.option.value
    if (option !== "") {
      const { dispatch, id, authedUser } = this.props
      console.log(authedUser, option, id)
      dispatch(handleAnswerQuestion(option, id, authedUser))
      this.props.history.push(`/answer/${id}`)
    } else {
      alert("Please choose an answer")
    }
  }
  render() {
    const { userData, question, id } = this.props
    if (id === null) {
      return (
        <div style={{ margin: "auto", textAlign: "center" }}>
          <h1>Error 404</h1>
          <h2>Id entered is Invalid</h2>
        </div>
      )
    }
    return (
      <form onSubmit={this.handleSubmit}>
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
                <input type='radio' name='option' value='optionOne' />
                <label>{question.optionOne.text}</label>
              </div>
              <div>
                <input type='radio' name='option' value='optionTwo' />
                <label>{question.optionTwo.text}</label>
              </div>
              <button type='submit'>Submit</button>
              {/* <Link to={``} type='submit'>
                Submit
              </Link> */}
            </div>
          </div>
        </div>
      </form>
    )
  }
}
const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params
  if (questions[id] == null) {
    return {
      id: null,
    }
  }
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
