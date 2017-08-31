import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pet } from '../../../common/models/Pet';

@Component({
    selector: 'petfinder-pet-selector',
    moduleId: module.id,
    templateUrl: './pet-selector.component.html',
    styleUrls: ['./pet-selector.component.css']
})
export class PetSelectorComponent {

    @Input() pet: Pet;

    @Input() row = 1;

    @Output() onLike: EventEmitter<Pet> = new EventEmitter();
    @Output() onDislike: EventEmitter<Pet> = new EventEmitter();

    onLiked(): void {
        this.onLike.emit(this.pet);
    }

    onDisliked(): void {
        this.onDislike.emit(this.pet);
    }

}
