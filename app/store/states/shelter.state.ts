import { Shelter } from '../../common/models/Shelter';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { IAppState } from '../app.state';

export class ShelterState {

    static NAMESPACE = 'ShelterState';

    static ActionTypes = {
        FIND: `${ShelterState.NAMESPACE} Find`,
        FIND_SUCCESS: `${ShelterState.NAMESPACE} Find Success`,
        FIND_FAILED: `${ShelterState.NAMESPACE} Find Failed`,
        GET: `${ShelterState.NAMESPACE} Get`,
        GET_SUCCESS: `${ShelterState.NAMESPACE} Get Success`,
        GET_FAILED: `${ShelterState.NAMESPACE} Get Failed`,
        GET_PETS: `${ShelterState.NAMESPACE} Get Pets`,
        GET_PETS_SUCCESS: `${ShelterState.NAMESPACE} Get Pets Success`,
        GET_PETS_FAILED: `${ShelterState.NAMESPACE} Get Pets Failed`,
        LIST_BY_BREED: `${ShelterState.NAMESPACE} List By Breed`,
        LIST_BY_BREED_SUCCESS: `${ShelterState.NAMESPACE} List By Breed Success`,
        LIST_BY_BREED_FAILED: `${ShelterState.NAMESPACE} List By Breed Failed`
    };

    /**
     * The collection of available shelters near the supplied zipcode
     */
    shelters: Shelter[];
    /**
     * The loading state of the data
     */
    loading: boolean;

    static state$(state$: Observable<IAppState>): Observable<ShelterState> {
        return state$.select(state => state.shelters);
    }

    static getShelters(state$: Observable<ShelterState>) {
        return state$.select(state => state.shelters);
    }

    constructor(options: ShelterState = <ShelterState>{}) {
        this.shelters = Array.isArray(options.shelters) ?
            options.shelters : [];
        this.loading = false;
    }

}

export const getShelters: any = compose(ShelterState.getShelters, ShelterState.state$);
