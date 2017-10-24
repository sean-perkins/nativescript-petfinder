import { Component, Input } from '@angular/core';

import { Pet } from '../../../common/models/Pet';

@Component({
    selector: 'petfinder-pet-list-item',
    moduleId: module.id,
    templateUrl: './pet-list-item.component.html',
    styleUrls: ['./pet-list-item.component.css']
})
export class PetListItemComponent {

    @Input() pet: Pet;

}
