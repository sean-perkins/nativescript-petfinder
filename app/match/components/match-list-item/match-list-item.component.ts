import { Component, Input } from '@angular/core';
import { SavedPet } from '../../../common/models/SavedPet';

@Component({
    selector: 'petfinder-match-list-item',
    moduleId: module.id,
    templateUrl: './match-list-item.component.html',
    styleUrls: ['./match-list-item.component.css']
})
export class MatchListItemComponent {

    @Input() pet: SavedPet;

    ngOnInit() {
        console.log(JSON.stringify(this.pet));
    }

    get thumbnail(): string {
        return `background-image: url('${this.pet.photos[0]}')`;
    }

}
