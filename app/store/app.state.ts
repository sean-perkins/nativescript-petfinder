import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import * as appReducers from './reducers/index';
import * as appStates from './states/index';

export interface IAppState {
    shelters: appStates.ShelterState;
    notifications: appStates.NotificationState;
    pets: appStates.PetState;
    matches: appStates.MatchState;
};

const reducers = {
    shelters: appReducers.shelterReducer,
    pets: appReducers.petReducer,
    matches: appReducers.matchReducer
};

export function AppReducer(state: any, action: any) {
    return combineReducers(reducers)(state, action);
}

export * from './states/index';
