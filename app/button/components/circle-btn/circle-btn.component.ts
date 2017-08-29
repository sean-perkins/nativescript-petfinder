import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'petfinder-circle-btn',
    moduleId: module.id,
    templateUrl: './circle-btn.component.html',
    styleUrls: ['./circle-btn.component.css']
})
export class CircleButtonComponent {

    @Input() icon: string;

    @Input() type: 'danger' | 'success' = 'success';

    @Input() col = 0;

    @Output() onTap: EventEmitter<boolean> = new EventEmitter();

    tapped(): void {
        console.log('tapped');
        this.onTap.emit(true);
    }

}
