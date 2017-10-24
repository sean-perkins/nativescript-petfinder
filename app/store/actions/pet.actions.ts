import { Action } from '@ngrx/store';
import { PetState as state } from '../states/pet.state';
import { Pet, PetSearch } from '../../common/models/index';

export default class PetAction {

    /*
     * Returns a record for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
     */
    static RandomAction = class implements Action {
        readonly type = state.ActionTypes.RANDOM;
        constructor(public payload: number) { }
    }

    static RandomSuccessAction = class implements Action {
        readonly type = state.ActionTypes.RANDOM_SUCCESS;
        constructor(public payload: Pet) { }
    }

    static RandomFailedAction = class implements Action {
        readonly type = state.ActionTypes.RANDOM_FAILED;
        constructor(public payload?: any) { }
    }

    // Find Actions

    static FindAction = class implements Action {
        readonly type = state.ActionTypes.FIND;
        constructor(public payload: PetSearch) { }
    }

    static FindNextAction = class implements Action {
        readonly type = state.ActionTypes.FIND_NEXT;
        payload = null;
    }

    static FindSuccessAction = class implements Action {
        readonly type = state.ActionTypes.FIND_SUCCESS;
        constructor(public payload: any) { }
    }

    static FindFailedAction = class implements Action {
        readonly type = state.ActionTypes.FIND_FAILED;
        constructor(public payload?: any) { }
    }

    // Search

    static SearchAction = class implements Action {
        readonly type = state.ActionTypes.SEARCH;
        constructor(public payload: PetSearch) { }
    }

}
