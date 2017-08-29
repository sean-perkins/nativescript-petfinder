import { ShelterState } from './../states/shelter.state';
import { Action } from '@ngrx/store';

export function shelterReducer(
    state: ShelterState = new ShelterState,
    action: Action) {
    switch (action.type) {
        case ShelterState.ActionTypes.FIND:
            return Object.assign({}, state, {
                loading: true
            });
        case ShelterState.ActionTypes.FIND_SUCCESS:
            return Object.assign({}, state, {
                shelters: action.payload,
                loading: false
            });
        case ShelterState.ActionTypes.FIND_FAILED:
            return Object.assign({}, state, {
                shelters: [],
                loading: false
            });
        default:
            return state;
    }
}
