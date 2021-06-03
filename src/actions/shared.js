import { receiveUsers } from "../actions/users"
import { _getQuestions, _getUsers } from "../utils/_DATA"
import { hideLoading, showLoading } from "react-redux-loading"
import { receiveQuestions } from "./questions"

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading())
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => ({ users, questions }))
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}
