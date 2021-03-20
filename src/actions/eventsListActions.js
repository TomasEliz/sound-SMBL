import {ACTIONS} from './ACTIONS'

export const addToEvents = (event) => {
    return {type: ACTIONS.ADD_TO_EVENTS, payload: event}
}