import { Component, Input, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getMatchCount } from '../../../store/app.state';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'petfinder-navbar',
    moduleId: module.id,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterContentInit {

    @Input() row = 2;

    matchCount$: Observable<number>;

    constructor(private store$: Store<IAppState>) { }

    ngAfterContentInit() {
        this.matchCount$ = this.store$.let(getMatchCount);
    }

}
