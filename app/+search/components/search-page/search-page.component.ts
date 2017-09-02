import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData } from 'ui/segmented-bar';
import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';
import { GeolocationService } from '../../../geolocation/services/geolocation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { BreedDialogComponent } from '../../../pet/components/breed-dialog/breed-dialog.component';

@Component({
    selector: 'petfinder-search-page',
    moduleId: module.id,
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

    segmentedItems: SegmentedBarItem[] = [];

    form: FormGroup;

    private segmentedTitles = ['Dogs', 'Cats', 'Other'];

    constructor(
        private vcRef: ViewContainerRef,
        private fb: FormBuilder,
        private geolocationService: GeolocationService,
        private modalService: ModalDialogService) { }

    ngOnInit() {
        this.initSegmentedBar();
        this.initForm();
    }

    onSegmentedItemChange(args: SelectedIndexChangedEventData) {
        const segmentedBar = <SegmentedBar>args.object;
        this.form.get('animalType').setValue(segmentedBar.selectedIndex);
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
            context: null,
            fullscreen: true,
        }).then(() => {

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
            const animalType = this.form.get('animalType').value;
            switch (animalType) {
                case 0:
                    return 'All Dogs';
                case 1:
                    return 'All Cats';
                case 2:
                    return 'All Other Breeds';
            }
        }
    }

    private initForm(): void {
        this.form = this.fb.group({
            animalType: [0, Validators.required],
            location: ['', Validators.required],
            breed: [],
        });
    }

    private initSegmentedBar(): void {
        for (let title of this.segmentedTitles) {
            const item = new SegmentedBarItem();
            item.title = title;
            this.segmentedItems.push(item);
        }
    }

}
