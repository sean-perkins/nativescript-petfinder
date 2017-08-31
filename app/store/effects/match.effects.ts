
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MatchState } from '../states/match.state';
import { StorageService } from '../services/storage.service';

import { default as matchActions } from '../actions/match.actions';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class MatchEffects {

    @Effect() addMatch$: Observable<Action> = this.actions$
        .ofType(MatchState.ActionTypes.ADD)
        .switchMap(({ payload }) =>
            this.storage.appendMatch(payload)
                .map(res => new matchActions.AddSuccessAction)
                .catch(error => of(new matchActions.AddFailedAction(error)))
        );

    @Effect() getMatches$: Observable<Action> = this.actions$
        .ofType(MatchState.ActionTypes.GET)
        .switchMap(() =>
            this.storage.matches
                .map(res => new matchActions.GetActionSuccess(res))
                .catch(error => of(new matchActions.GetActionFailed(error)))
        );

    @Effect() findMatchDetail$: Observable<Action> = this.actions$
        .ofType(MatchState.ActionTypes.FIND)
        .switchMap(({ payload }) =>
            this.storage.findMatch(payload)
                .map(res => new matchActions.FindActionSuccess(res))
                .catch(error => of(new matchActions.GetActionFailed(error)))
        );

    constructor(
        private actions$: Actions,
        private storage: StorageService
    ) { }
}
