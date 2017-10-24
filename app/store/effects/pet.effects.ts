
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PetState } from '../states/pet.state';
import { PetService } from '../services/pet.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.state';

import { default as petActions } from '../actions/pet.actions';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class PetEffects {

    @Effect() random$: Observable<Action> = this.actions$
        .ofType(PetState.ActionTypes.RANDOM)
        .switchMap(({ payload }) =>
            this.petService.getRandom(payload)
                .map(res => new petActions.RandomSuccessAction(res))
                .catch(error => of(new petActions.RandomFailedAction(error)))
        );

    @Effect() find$: Observable<Action> = this.actions$
        .ofType(PetState.ActionTypes.FIND)
        .switchMap(({ payload }) =>
            this.petService.findPets(payload)
                .map(res => new petActions.FindSuccessAction(res))
                .catch(error => of(new petActions.FindFailedAction(error)))
        );

    @Effect() findNext$: Observable<any> = this.actions$
        .ofType(PetState.ActionTypes.FIND_NEXT)
        .withLatestFrom(this.store$.select(s => s.pets))
        .map(([action, state]: [Action, PetState]) => {
            if (state.hasNextPage && state.nextRequest) {
                return new petActions.FindAction(state.nextRequest);
            }
            return state;
        });

    constructor(
        private actions$: Actions,
        private petService: PetService,
        private store$: Store<IAppState>
    ) { }
}
