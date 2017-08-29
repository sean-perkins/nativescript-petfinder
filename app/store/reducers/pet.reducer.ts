import { PetState } from './../states/pet.state';
import { Action } from '@ngrx/store';

export function petReducer(
    state: PetState = new PetState,
    action: Action) {
    switch (action.type) {
        case PetState.ActionTypes.RANDOM:
            return Object.assign({}, state, {
                loading: true
            });
        case PetState.ActionTypes.RANDOM_SUCCESS:
            return Object.assign({}, state, {
                pets: [action.payload],
                loading: false
            });
        case PetState.ActionTypes.RANDOM_SUCCESS:
            return Object.assign({}, state, {
                shelters: [],
                loading: false
            });
        default:
            return state;
    }
}
