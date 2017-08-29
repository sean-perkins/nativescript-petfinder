import { Component, Input } from '@angular/core';

@Component({
    selector: 'petfinder-navbar',
    moduleId: module.id,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    @Input() row = 2;

}
