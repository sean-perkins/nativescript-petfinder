import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { IAppState, getMatches, MatchState } from '../../../store/app.state';

import { default as matchActions } from '../../../store/actions/match.actions';

import * as dialogs from 'tns-core-modules/ui/dialogs';
import { SavedPet } from '../../../common/models/SavedPet';
import { Observable } from 'rxjs/Observable';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui/listview';
import { Actions } from '@ngrx/effects';

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
        private actions$: Actions,
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

    onPullToRefresh(args: ListViewEventData): void {
        const listView: RadListView = args.object;
        const pullTime = Date.now();
        this.store$.dispatch(new matchActions.RefreshAction);
        this.actions$
            .ofType(MatchState.ActionTypes.REFRESH_SUCCESS)
            .take(1)
            .do(() => {
                if (pullTime + 1000 < Date.now()) {
                    listView.notifyPullToRefreshFinished();
                }
                else {
                    setTimeout(() => {
                        listView.notifyPullToRefreshFinished();
                    }, 500);
                }
            })
            .subscribe();
        this.actions$
            .ofType(MatchState.ActionTypes.REFRESH_FAILED)
            .take(1)
            .do(error => {
                listView.notifyPullToRefreshFinished();
                dialogs.alert({
                    title: 'Error',
                    message: 'There was an issue refreshing your matches. Please try again.',
                    okButtonText: 'Ok'
                });
            });
    }

}
