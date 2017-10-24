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
                random: action.payload,
                loading: false
            });
        case PetState.ActionTypes.RANDOM_FAILED:
            return Object.assign({}, state, {
                random: null,
                loading: false
            });
        case PetState.ActionTypes.FIND:
            return Object.assign({}, state, {
                loading: true
            });
        case PetState.ActionTypes.FIND_FAILED:
            return Object.assign({}, state, {
                loading: false,
                pets: []
            });
        case PetState.ActionTypes.FIND_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                pets: [...state.pets, ...action.payload.pets],
                pageOffset: action.payload.offset,
                hasNextPage: action.payload.hasNext,
                nextRequest: action.payload.nextRequest
            });
        case PetState.ActionTypes.SEARCH:
            return Object.assign({}, state, {
                search: action.payload
            });
        default:
            return state;
    }
}
