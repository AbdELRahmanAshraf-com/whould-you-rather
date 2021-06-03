import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddQuestion } from "../actions/questions"

class New_Question extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const optionOne = e.target.elements.optionOne.value
    const optionTwo = e.target.elements.optionTwo.value
    const { handleAddQuestion, authedUser, history } = this.props
    handleAddQuestion(optionOne, optionTwo, authedUser)
    history.push("/")
  }
  render() {
    return (
      <div className='box'>
        <div className='text'>
          <h2>Create New Question</h2>
        </div>
        <div className='n_q_data'>
          <p>Complete the question:</p>
          <h3>Would you rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              autoComplete='off'
              required
              type='text'
              name='optionOne'
              placeholder='Enter Option One Text Here'
            />
            <div>
              <hr />
              <span>OR</span>
              <hr />
            </div>
            <input
              autoComplete='off'
              required
              type='text'
              name='optionTwo'
              placeholder='Enter Option One Text Here'
            />
            <button type='submit'>Add Question</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  }
}
const mapDispatchToProps = {
  handleAddQuestion,
}
export default connect(mapStateToProps, mapDispatchToProps)(New_Question)
