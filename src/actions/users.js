import { RECEIVE_QUESTIONS } from "./questions"

export const RECEIVE_USERS = 'RECEIVE_QUESTIONS'

export function receiveUsers(users){
    return {
        type: RECEIVE_QUESTIONS,
        users
    }
}