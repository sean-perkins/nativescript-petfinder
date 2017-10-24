import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData } from 'ui/segmented-bar';
import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';
import { Router } from '@angular/router';
import { PetSearch } from '../../../common/models/PetSearch';
import { GeolocationService } from '../../../geolocation/services/geolocation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { BreedDialogComponent } from '../../../pet/components/breed-dialog/breed-dialog.component';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/app.state';
import { default as petActions } from '../../../store/actions/pet.actions';

@Component({
    selector: 'petfinder-search-page',
    moduleId: module.id,
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

    segmentedItems: SegmentedBarItem[] = [];
    ageSegmentedItems: SegmentedBarItem[] = [];
    sizeSegmentedItems: SegmentedBarItem[] = [];
    genderSegmentedItems: SegmentedBarItem[] = [];

    form: FormGroup;

    submitted = false;

    ageSegmentInit = false;
    sizeSegmentInit = false;
    genderSegmentInit = false;

    private segmentedTitles = ['Dogs', 'Cats', 'Other'];
    private ageTitles = ['Baby', 'Young', 'Adult', 'Senior'];
    private genderTitles = ['Male', 'Female'];
    private sizeTitles = ['Small', 'Medium', 'Large', 'Extra Large'];

    constructor(
        private vcRef: ViewContainerRef,
        private store$: Store<IAppState>,
        private fb: FormBuilder,
        private geolocationService: GeolocationService,
        private router: Router,
        private modalService: ModalDialogService) { }

    ngOnInit() {
        this.initSegmentedBar();
        this.initAgeSegmentedBar();
        this.initSizeSegmentedBar();
        this.initGenderSegmentedBar();
        this.initForm();
    }

    onSegmentedItemChange(args: SelectedIndexChangedEventData) {
        const segmentedBar = <SegmentedBar>args.object;
        this.form.get('animalType').setValue(segmentedBar.selectedIndex);
        this.form.get('breed').setValue(this.animalTypeText);
    }

    onAgeSegmentedItemChange(args: SelectedIndexChangedEventData) {
        const segmentedBar = <SegmentedBar>args.object;
        if (!this.ageSegmentInit) {
            this.ageSegmentInit = true;
            return;
        }
        this.form.get('age').setValue(this.ageTitles[segmentedBar.selectedIndex]);
    }

    onSizeSegmentedItemChange(args: SelectedIndexChangedEventData) {
        const segmentedBar = <SegmentedBar>args.object;
        if (!this.sizeSegmentInit) {
            this.sizeSegmentInit = true;
            return;
        }
        this.form.get('size').setValue(this.sizeTitles[segmentedBar.selectedIndex]);
    }

    onGenderSegmentedItemChange(args: SelectedIndexChangedEventData) {
        const segmentedBar = <SegmentedBar>args.object;
        if (!this.genderSegmentInit) {
            this.genderSegmentInit = true;
            return;
        }
        this.form.get('gender').setValue(this.genderTitles[segmentedBar.selectedIndex]);
    }

    search(): void {
        this.submitted = true;
        if (this.form.valid) {
            const value = this.form.value;
            const preferences = new PetSearch(<any>{
                breed: this.sanitizeBreed(value.breed),
                size: value.size ? value.size.substr(0, 1) : null,
                sex: value.gender ? value.gender.substr(0, 1) : null,
                animal: <any>this.getAnimal(value.animalType),
                location: value.location,
                offset: 0,
                count: 10
            });
            this.store$.dispatch(new petActions.SearchAction(preferences));
            this.router.navigate(['/search/grid']);
        }
        else {
            dialogs.alert({
                title: 'Error',
                message: 'Please enter a valid location.',
                okButtonText: 'Ok'
            });
        }
    }

    useLocation(): void {
        geolocation.enableLocationRequest()
            .then(() => {
                geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    updateDistance: 0.1,
                    timeout: 20000
                }).then(location => {
                    this.geolocationService.lookupAddress(location.latitude, location.longitude)
                        .take(1)
                        .subscribe(result => {
                            const postcode = result.address.postcode;
                            const zipcode = postcode.indexOf('-') ? postcode.split('-')[0] : postcode;
                            this.form.get('location').setValue(zipcode);
                        });
                });
            }, () => {
                // TODO did not give access to location
            });
    }

    openBreedSelection(): void {
        this.form.get('breed').disable();
        this.modalService.showModal(BreedDialogComponent, {
            viewContainerRef: this.vcRef,
            context: {
                breed: this.form.get('breed').value,
                animalType: this.form.get('animalType').value
            },
            fullscreen: true,
        }).then(breed => {
            if (breed) {
                this.form.get('breed').setValue(breed);
            }
        });
        // TODO open breed selection modal
        setTimeout(() => {
            this.form.get('breed').enable();
        });
    }

    get breedHintText(): string {
        const breed = this.form.get('breed').value;
        if (breed && breed.length > 0) {
            return breed;
        }
        else {
            return this.animalTypeText;
        }
    }

    private sanitizeBreed(breed: string) {
        if (breed === 'All Dogs' || breed === 'All Cats' || breed == 'All Other') {
            return null;
        }
        return breed;
    }

    private getAnimal(index: number): string {
        switch (this.segmentedTitles[index]) {
            case 'Dogs':
                return 'dog';
            case 'Cats':
                return 'cat';
            case 'Other':
                return 'barnyard';
        }
        return null;
    }

    private get animalTypeText(): string {
        const animalType = this.form.get('animalType').value;
        switch (animalType) {
            case 0:
                return 'All Dogs';
            case 1:
                return 'All Cats';
            case 2:
                return 'All Other Breeds';
        }
        return '';
    }

    private initForm(): void {
        this.form = this.fb.group({
            animalType: [0, Validators.required],
            location: ['', Validators.required],
            breed: [],
            age: [],
            gender: [],
            size: []
        });
    }

    private initSegmentedBar(): void {
        for (let title of this.segmentedTitles) {
            const item = new SegmentedBarItem();
            item.title = title;
            this.segmentedItems.push(item);
        }
    }

    private initAgeSegmentedBar(): void {
        for (let title of this.ageTitles) {
            const item = new SegmentedBarItem();
            item.title = title;
            this.ageSegmentedItems.push(item);
        }
    }

    private initSizeSegmentedBar(): void {
        for (let title of this.sizeTitles) {
            const item = new SegmentedBarItem();
            item.title = title;
            this.sizeSegmentedItems.push(item);
        }
    }

    private initGenderSegmentedBar(): void {
        for (let title of this.genderTitles) {
            const item = new SegmentedBarItem();
            item.title = title;
            this.genderSegmentedItems.push(item);
        }
    }

}
