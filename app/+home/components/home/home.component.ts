import { Component, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState, getRandomPet } from '../../../store/app.state';

import { default as petActions } from '../../../store/actions/pet.actions';
import { default as matchActions } from '../../../store/actions/match.actions';

import { Pet, SavedPet } from '../../../common/models/index';
import { Observable } from 'rxjs/Observable';
import { PetImagePreviewComponent } from '../../../pet/components/pet-image-preview/image-preview.component';

@Component({
    selector: 'petfinder-home',
    moduleId: module.id,
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    pet$: Observable<Pet>;

    @ViewChild(PetImagePreviewComponent) imagePreview: PetImagePreviewComponent;

    constructor(private store$: Store<IAppState>) { }

    ngOnInit() {
        this.pet$ = this.store$.let(getRandomPet);
        this.pet$
            .take(1)
            .subscribe(pet => {
                if (!pet) {
                    this.store$.dispatch(new petActions.RandomAction(49002));
                }
            });
    }

    likePet(pet: Pet): void {
        const savedPet = new SavedPet(Object.assign({}, pet, {
            createdAt: Date.now(),
            updatedAt: Date.now()
        }));
        console.log('savedPet', JSON.stringify(savedPet));
        this.store$.dispatch(new matchActions.AddAction(savedPet));
        this.store$.dispatch(new matchActions.GetAction);
        this.randomPet();
    }

    dislikePet(pet: Pet): void {
        this.randomPet();
    }

    private randomPet(): void {
        this.store$.dispatch(new petActions.RandomAction(49002));
    }
}
