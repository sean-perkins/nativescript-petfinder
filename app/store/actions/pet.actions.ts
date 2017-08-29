import { Action } from '@ngrx/store';
import { PetState as state } from '../states/pet.state';
import { Pet } from '../../common/models/Pet';

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
        constructor(public payload?: any) {
            console.log('error', payload);
        }
    }

}
