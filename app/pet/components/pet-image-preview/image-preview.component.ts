import { Component, OnInit, Input } from '@angular/core';

import { Pet } from '../../../common/models/Pet';

@Component({
    selector: 'petfinder-image-preview',
    moduleId: module.id,
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.css']
})
export class PetImagePreviewComponent {

    @Input() pet: Pet;

    @Input() row = 0;

    get src(): string {
        if (this.pet) {
            if (this.pet.photos.length > 0) {
                return this.pet.photos[0];
            }
        }
        return '';
    }

}
