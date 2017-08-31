import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'petfinder-topbar',
    moduleId: module.id,
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

    constructor(public routerExt: RouterExtensions) { }

    navigateBack(): void {
        this.routerExt.back();
    }
}
