import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { Color } from 'tns-core-modules/color/color';
import './operators';

import { Store } from '@ngrx/store';
import { IAppState } from './store/app.state';

import { default as shelterActions } from './store/actions/shelter.actions';
@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {

    constructor(
        private page: Page,
        private store$: Store<IAppState>) {
        page.backgroundSpanUnderStatusBar = true;
        page.actionBarHidden = true;
        page.backgroundColor = new Color('#7332D6');
    }

    ngOnInit(): void {

    }

}
