import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'petfinder-notification-bubble',
    moduleId: module.id,
    templateUrl: './notification-bubble.component.html',
    styleUrls: ['./notification-bubble.component.css']
})
export class NotificationBubbleComponent {

    @Input() col = 1;

}
