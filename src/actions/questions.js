import { saveQuestion } from '../utils/api'
import { addQuestionToUser } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestionAnswer(authedUser, qid, answer){
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

function addQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    };
  }
  
  export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return dispatch => {
      return saveQuestion({ optionOneText, optionTwoText, author }).then(
        question => {
          dispatch(addQuestion(question));
          dispatch(addQuestionToUser(question));
        }
      );
    };
  }