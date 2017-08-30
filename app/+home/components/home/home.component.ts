import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState, getPets } from '../../../store/app.state';

import { default as petActions } from '../../../store/actions/pet.actions';

import { Pet } from '../../../common/models/Pet';
import { Observable } from 'rxjs/Observable';
import { PetImagePreviewComponent } from '../../../pet/components/pet-image-preview/image-preview.component';

@Component({
    selector: 'petfinder-home',
    moduleId: module.id,
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {

    pets$: Observable<Pet[]>;

    @ViewChild(PetImagePreviewComponent) imagePreview: PetImagePreviewComponent;

    constructor(private store$: Store<IAppState>) { }

    ngOnInit() {
        this.pets$ = this.store$.let(getPets);
        this.store$.dispatch(new petActions.RandomAction(49002));
    }

    ngAfterViewInit() {
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
