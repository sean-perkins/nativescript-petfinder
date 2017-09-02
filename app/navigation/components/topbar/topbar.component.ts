import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
    selector: 'petfinder-topbar',
    moduleId: module.id,
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public routerExt: RouterExtensions) { }

    navigateBack(): void {
        this.routerExt.back();
    }

    reloadMatches(): void {
        dialogs.confirm({
            title: 'Warning',
            message: 'You are about to refresh your matches. This may take a moment',
            okButtonText: 'Ok',
            cancelButtonText: 'Cancel'
        }).then(confirmed => {
            if (confirmed) {
                console.log('TODO - reload');
            }
        });
    }

    get isMatchesPage(): boolean {
        return this.router.url === '/matches';
    }
}
