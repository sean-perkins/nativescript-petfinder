import { Action } from '@ngrx/store';
import { MatchState as state } from '../states/match.state';
import { SavedPet } from '../../common/models/index';

export default class MatchActions {

    // Add Actions

    static AddAction = class implements Action {
        readonly type = state.ActionTypes.ADD;
        constructor(public payload: SavedPet) { }
    }

    static AddSuccessAction = class implements Action {
        readonly type = state.ActionTypes.ADD_SUCCESS;
        payload = null;
    }

    static AddFailedAction = class implements Action {
        readonly type = state.ActionTypes.ADD_FAILED;
        constructor(public payload?: any) { }
    }

    // Get Actions

    static GetAction = class implements Action {
        readonly type = state.ActionTypes.GET;
        payload = null;
    }

    static GetActionSuccess = class implements Action {
        readonly type = state.ActionTypes.GET_SUCCESS;
        constructor(public payload: SavedPet[]) {
            // Order by most recent
            payload = payload.sort((a: SavedPet, b: SavedPet) => {
                return b.createdAt - a.createdAt;
            });
        }
    }

    static GetActionFailed = class implements Action {
        readonly type = state.ActionTypes.GET_FAILED;
        constructor(public payload?: any) { }
    }

    // Find Actions

    static FindAction = class implements Action {
        readonly type = state.ActionTypes.FIND;
        constructor(public payload: string) { }
    }

    static FindActionSuccess = class implements Action {
        readonly type = state.ActionTypes.FIND_SUCCESS;
        constructor(public payload: SavedPet) { }
    }

    static FindActionFailed = class implements Action {
        readonly type = state.ActionTypes.FIND_FAILED;
        constructor(public payload?: any) { }
    }

}
