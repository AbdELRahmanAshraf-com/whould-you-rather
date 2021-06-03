import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logOut } from "../actions/authedUser"

class NavBar extends Component {
  logOut = () => {
    const { dispatch } = this.props
    dispatch(logOut())
  }
  render() {
    const { users, authedUser } = this.props
    return (
      <nav className={!this.props.loading ? "active" : null}>
        <div className='navigators'>
          <Link to='/'>Home</Link>
          <Link to='/new_question'>New Question</Link>
          <Link to='/board'>Leader Board</Link>
        </div>
        <div className='info'>
          <span>Hello,{users[authedUser].name}</span>
          <span
            style={{ backgroundImage: `url(${users[authedUser].avatarURL})` }}
          ></span>
          <Link to='/' onClick={this.logOut}>
            Logout
          </Link>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ authedUser, users, loadingBar }) => ({
  users,
  authedUser,
  loading: loadingBar.default,
})
export default connect(mapStateToProps)(NavBar)
