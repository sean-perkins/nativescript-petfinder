import { Action } from '@ngrx/store';
import { ShelterState as state } from '../states/shelter.state';
import { Shelter } from '../../common/models/Shelter';

export default class ShelterAction {

    /*
     * Returns a collection of shelter records matching your search criteria.
     */
    static FindAction = class implements Action {
        readonly type = state.ActionTypes.FIND;
        constructor(public payload: number) { }
    }

    static FindSuccessAction = class implements Action {
        readonly type = state.ActionTypes.FIND_SUCCESS;
        constructor(public payload: Shelter[]) { }
    }

    static FindFailedAction = class implements Action {
        readonly type = state.ActionTypes.FIND_FAILED;
        constructor(public payload?: any) {
            console.log('error', payload);
        }
    }

}
