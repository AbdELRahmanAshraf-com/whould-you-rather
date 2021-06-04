import React, { Component, Fragment } from "react"
import Switcher from "./Switcher"
import Login from "./Login"
import LoadingBar from "react-redux-loading"
import NavBar from "./NavBar"
import Answer from "./Answer"
import Result from "./Result"
import New_Question from "./New_Question"
import { handleInitialData } from "../actions/shared"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Board from "./Board"

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        {!this.props.authedUser ? (
          <Login />
        ) : (
          <Fragment>
            <div>
              {this.props.authedUser && <NavBar />}
              <LoadingBar style={{ backgroundColor: "#00a693" }} />
              <div className='margin'></div>
              {this.props.loading ? null : (
                <div>
                  <Route path='/' exact component={Switcher} />
                  <Route path='/answer/:id' component={Result} />
                  <Route path='/question/:id' component={Answer} />
                  <Route path='/add' component={New_Question} />
                  <Route path='/leaderboard' component={Board} />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar, authedUser }) {
  return {
    loading: loadingBar.default,
    authedUser,
  }
}
export default connect(mapStateToProps)(App)
