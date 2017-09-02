import { SavedPet } from '../../common/models/SavedPet';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { IAppState } from '../app.state';

export class MatchState {

    static NAMESPACE = 'MatchState';

    static ActionTypes = {
        ADD: `${MatchState.NAMESPACE} Add`,
        ADD_SUCCESS: `${MatchState.NAMESPACE} Add Success`,
        ADD_FAILED: `${MatchState.NAMESPACE} Add Failed`,
        GET: `${MatchState.NAMESPACE} Get`,
        GET_SUCCESS: `${MatchState.NAMESPACE} Get Success`,
        GET_FAILED: `${MatchState.NAMESPACE} Get Failed`,
        FIND: `${MatchState.NAMESPACE} Find`,
        FIND_SUCCESS: `${MatchState.NAMESPACE} Find Success`,
        FIND_FAILED: `${MatchState.NAMESPACE} Find Failed`,
        REFRESH: `${MatchState.NAMESPACE} Refresh`,
        REFRESH_SUCCESS: `${MatchState.NAMESPACE} Refresh Success`,
        REFRESH_FAILED: `${MatchState.NAMESPACE} Refresh Failed`

    };

    matches: SavedPet[];

    matchDetail: SavedPet;

    /**
     * The loading state of the data
     */
    loading: boolean;

    static state$(state$: Observable<IAppState>): Observable<MatchState> {
        return state$.select(state => state.matches);
    }

    static getMatches(state$: Observable<MatchState>) {
        return state$.select(state => state.matches);
    }

    static getMatchCount(state$: Observable<MatchState>) {
        return state$.select(state => state.matches.length);
    }

    static getMatchDetail(state$: Observable<MatchState>) {
        return state$.select(state => state.matchDetail);
    }

    static isLoading(state$: Observable<MatchState>) {
        return state$.select(state => state.loading);
    }

    constructor(options: MatchState = <MatchState>{}) {
        this.matches = Array.isArray(options.matches) ?
            options.matches.map(res => new SavedPet(res)) : [];
        this.loading = !!options.loading;
        this.matchDetail = options.matchDetail || null;
    }

}

export const getMatchesLoading: any = compose(MatchState.isLoading, MatchState.state$);
export const getMatches: any = compose(MatchState.getMatches, MatchState.state$);
export const getMatchDetail: any = compose(MatchState.getMatchDetail, MatchState.state$);
export const getMatchCount: any = compose(MatchState.getMatchCount, MatchState.state$);
