import React, { Component } from "react"
import { connect } from "react-redux"
import { logIn } from "../actions/authedUser"

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logIn(e.target[0].value))
    // this.toHome = true
  }
  render() {
    return (
      <div className='login-box'>
        <div className='text'>
          <h2>Welocome to the Would you rather app!</h2>
          <p>Please sign in to continue</p>
        </div>
        <div className='image'></div>
        <h2>Sign in</h2>
        <form onSubmit={this.handleSubmit}>
          <select id='user'>
            <option defaultValue disabled>
              Select User
            </option>
            {this.props.users.map(l => (
              <option value={l.id} key={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
  users: Object.values(users),
  authedUser,
})

export default connect(mapStateToProps)(Login)
