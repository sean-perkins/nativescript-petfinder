
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { MatchState } from '../states/match.state';
import { StorageService } from '../services/storage.service';
import { PetService } from '../services/pet.service';
import { Pet, SavedPet } from '../../common/models/index';
import { IAppState } from '../app.state';

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

    @Effect() refresh$: Observable<Action> = this.actions$
        .ofType(MatchState.ActionTypes.REFRESH)
        .withLatestFrom(this.store$.select(s => s.matches))
        .map(([action, state]: [Action, MatchState]) => {
            return state.matches;
        })
        .switchMap(matches => {
            const subscriptions: ObservableInput<Pet>[] = [];
            for (const match of matches) {
                subscriptions.push(this.petService.getPet(match.id));
            }
            return Observable.combineLatest(subscriptions)
                .switchMap(pets => {
                    const updateSubscriptions: ObservableInput<SavedPet>[] = [];
                    for (const pet of pets) {
                        updateSubscriptions.push(this.storage.updateMatch(pet));
                    }
                    return Observable.combineLatest(updateSubscriptions);
                })
                .map(() => new matchActions.RefreshActionSuccess)
                .catch(error => of(new matchActions.RefreshActionFailed(error)));
        });

    constructor(
        private actions$: Actions,
        private storage: StorageService,
        private petService: PetService,
        private store$: Store<IAppState>
    ) { }
}
