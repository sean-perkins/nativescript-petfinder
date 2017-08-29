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

    @Output() onLike: EventEmitter<boolean> = new EventEmitter();
    @Output() onDislike: EventEmitter<boolean> = new EventEmitter();

    onLiked(): void {
        this.onLike.emit(true);
    }

    onDisliked(): void {
        this.onDislike.emit(true);
    }


}
