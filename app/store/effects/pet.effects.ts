
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PetState } from '../states/pet.state';
import { PetService } from '../services/pet.service';

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

    constructor(
        private actions$: Actions,
        private petService: PetService
    ) { }
}
