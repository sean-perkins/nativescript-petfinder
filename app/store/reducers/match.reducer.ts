import { MatchState } from './../states/match.state';
import { Action } from '@ngrx/store';

export function matchReducer(
    state: MatchState = new MatchState,
    action: Action) {
    switch (action.type) {
        case MatchState.ActionTypes.GET:
            return Object.assign({}, state, {
                loading: true
            });
        case MatchState.ActionTypes.GET_SUCCESS:
            return Object.assign({}, state, {
                matches: [...action.payload],
                loading: false
            });
        case MatchState.ActionTypes.GET_FAILED:
            return Object.assign({}, state, {
                matches: [],
                loading: false
            });
        case MatchState.ActionTypes.FIND:
            return Object.assign({}, state, {
                loading: true,
                matchDetail: null
            });
        case MatchState.ActionTypes.FIND_SUCCESS:
            return Object.assign({}, state, {
                matchDetail: action.payload,
                loading: false
            });
        case MatchState.ActionTypes.FIND_FAILED:
            return Object.assign({}, state, {
                matchDetail: null,
                loading: false
            });
        default:
            return state;
    }
}
