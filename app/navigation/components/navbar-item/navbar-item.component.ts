import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'petfinder-navbar-item',
    moduleId: module.id,
    templateUrl: './navbar-item.component.html',
    styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent {

    @Input() icon: string;
    @Input() col = 0;

    @Input() link: string[] = [];

}
