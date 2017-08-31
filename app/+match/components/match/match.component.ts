import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { IAppState, getMatches } from '../../../store/app.state';

import { default as matchActions } from '../../../store/actions/match.actions';

import { SavedPet } from '../../../common/models/SavedPet';
import { Observable } from 'rxjs/Observable';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui/listview';

@Component({
    selector: 'petfinder-match',
    moduleId: module.id,
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, AfterContentInit {

    matches$: Observable<SavedPet[]>;

    constructor(
        private store$: Store<IAppState>,
        private router: Router) { }

    ngOnInit() {
        this.matches$ = this.store$.let(getMatches);
    }

    ngAfterContentInit() {
        this.store$.dispatch(new matchActions.GetAction);
    }

    viewMatch(args: ListViewEventData): void {
        this.matches$
            .take(1)
            .subscribe(matches => {
                const match = matches[args.index];
                this.router.navigate(['/matches', match.id]);
            });
    }

}
