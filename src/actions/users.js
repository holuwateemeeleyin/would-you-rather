import {saveQuestionAnswer} from '../utils/api'
import { addQuestionAnswer } from './questions'

export const RECEIVE_USERS = 'RECEIVE_USERS'
// Add answer to users
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';


export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

function addUserAnswer(authedUser, qid, answer){
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleSaveQuestionAnswer(authedUser, qid, answer){
    return dispatch => {
        dispatch(addUserAnswer(authedUser, qid, answer))
        dispatch(addQuestionAnswer(authedUser, qid, answer))

        return saveQuestionAnswer(authedUser, qid, answer).catch(e => {
            console.warn('Eror in handleSaveQuestion:', e);
        })
    }
}

export function addQuestionToUser({ id, author }) {
    return {
      type: ADD_QUESTION_TO_USER,
      id,
      author
    };
  }