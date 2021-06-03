import React, { Component } from "react"
import Score from "./Score"
import { connect } from "react-redux"

class Board extends Component {
  render() {
    const { usersList } = this.props
    console.log(usersList)
    return (
      <div>
        {usersList.map(user => (
          <Score id={user.id} key={user.id} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  const usersList = Object.values(users).sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length
    const scoreB = Object.keys(b.answers).length + b.questions.length
    return scoreB - scoreA
  })

  return {
    usersList,
  }
}
export default connect(mapStateToProps)(Board)
