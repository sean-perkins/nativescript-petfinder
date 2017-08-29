
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ShelterState } from '../states/shelter.state';
import { ShelterService } from '../services/shelter.service';

import { default as shelterActions } from '../actions/shelter.actions';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class ShelterEffects {

    @Effect() find$: Observable<Action> = this.actions$
        .ofType(ShelterState.ActionTypes.FIND)
        .switchMap(({ payload }) =>
            this.shelterService.find(payload)
                .map(res => new shelterActions.FindSuccessAction(res))
                .catch(error => of(new shelterActions.FindFailedAction(error)))
        );

    constructor(
        private actions$: Actions,
        private shelterService: ShelterService
    ) { }
}
