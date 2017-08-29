import { Pet } from '../../common/models/Pet';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { IAppState } from '../app.state';

export class PetState {

    static NAMESPACE = 'PetState';

    static ActionTypes = {
        RANDOM: `${PetState.NAMESPACE} Random`,
        RANDOM_SUCCESS: `${PetState.NAMESPACE} Random Success`,
        RANDOM_FAILED: `${PetState.NAMESPACE} Random Failed`,
    };

    /**
     * The collection of pets
     */
    pets: Pet[];
    /**
     * The loading state of the data
     */
    loading: boolean;

    static state$(state$: Observable<IAppState>): Observable<PetState> {
        return state$.select(state => state.pets);
    }

    static getPets(state$: Observable<PetState>) {
        return state$.select(state => state.pets);
    }

    constructor(options: PetState = <PetState>{}) {
        this.pets = Array.isArray(options.pets) ?
            options.pets : [];
        this.loading = false;
    }

}

export const getPets: any = compose(PetState.getPets, PetState.state$);
