import { Pet, PetSearch } from '../../common/models/index';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { IAppState } from '../app.state';

export class PetState {

    static NAMESPACE = 'PetState';

    static ActionTypes = {
        RANDOM: `${PetState.NAMESPACE} Random`,
        RANDOM_SUCCESS: `${PetState.NAMESPACE} Random Success`,
        RANDOM_FAILED: `${PetState.NAMESPACE} Random Failed`,
        SEARCH: `${PetState.NAMESPACE} Search`,
        FIND: `${PetState.NAMESPACE} Find`,
        FIND_SUCCESS: `${PetState.NAMESPACE} Find Success`,
        FIND_FAILED: `${PetState.NAMESPACE} Find Failed`,
        FIND_NEXT: `${PetState.NAMESPACE} Find Next`
    };

    random: Pet;

    /**
     * The collection of pets
     */
    pets: Pet[];
    /**
     * The loading state of the data
     */
    loading: boolean;

    pageOffset: number;

    hasNextPage: boolean;

    nextRequest: PetSearch;

    search: PetSearch;

    static state$(state$: Observable<IAppState>): Observable<PetState> {
        return state$.select(state => state.pets);
    }

    static getRandomPet(state$: Observable<PetState>) {
        return state$.select(state => state.random);
    }

    static getPets(state$: Observable<PetState>) {
        return state$.select(state => state.pets);
    }

    static isLoading(state$: Observable<PetState>) {
        return state$.select(state => state.loading);
    }

    static getPageOffset(state$: Observable<PetState>) {
        return state$.select(state => state.pageOffset);
    }

    static getSearch(state$: Observable<PetState>) {
        return state$.select(state => state.search);
    }

    constructor(options: PetState = <PetState>{}) {
        this.pets = Array.isArray(options.pets) ?
            options.pets : [];
        this.loading = !!options.loading;
        this.pageOffset = options.pageOffset || null;
        this.hasNextPage = !!options.hasNextPage;
        this.nextRequest = options.nextRequest || null;
        this.search = options.search || null;
        this.random = options.random || null;
    }

}

export const getRandomPet: any = compose(PetState.getRandomPet, PetState.state$);
export const getPets: any = compose(PetState.getPets, PetState.state$);
export const isPetsLoading: any = compose(PetState.isLoading, PetState.state$);
export const getPetsPageOffset: any = compose(PetState.getPageOffset, PetState.state$);
export const getPetSearch: any = compose(PetState.getSearch, PetState.state$);
