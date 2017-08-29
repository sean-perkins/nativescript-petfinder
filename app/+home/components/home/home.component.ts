import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState, getPets } from '../../../store/app.state';

import { default as petActions } from '../../../store/actions/pet.actions';

import { Pet } from '../../../common/models/Pet';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'petfinder-home',
    moduleId: module.id,
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    pets$: Observable<Pet[]>;

    constructor(private store$: Store<IAppState>) { }

    ngOnInit() {
        this.pets$ = this.store$.let(getPets);
        this.store$.dispatch(new petActions.RandomAction(49002));
    }

    likePet(): void {
        this.randomPet();
    }

    dislikePet(): void {
        this.randomPet();
    }

    private randomPet(): void {
        this.store$.dispatch(new petActions.RandomAction(49002));
    }
}
