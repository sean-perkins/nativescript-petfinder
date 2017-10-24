import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getPets, getPetSearch, isPetsLoading } from '../../../store/app.state';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Pet, PetSearch } from '../../../common/models/index';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui/listview';

import { default as petActions } from '../../../store/actions/pet.actions';

@Component({
    selector: 'petfinder-search-grid',
    moduleId: module.id,
    templateUrl: './search-grid.component.html',
    styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements OnInit, AfterContentInit {

    pets$: Observable<Pet[]>;

    isLoading$: Observable<boolean>;

    petSearch$: Observable<PetSearch>;

    constructor(
        private store$: Store<IAppState>,
        private router: Router) { }

    ngOnInit() {
        this.pets$ = this.store$.let(getPets);
        this.petSearch$ = this.store$.let(getPetSearch);
        this.isLoading$ = this.store$.let(isPetsLoading);
    }

    ngAfterContentInit() {
        this.petSearch$
            .take(1)
            .subscribe(searchPreference => {
                if (searchPreference) {
                    this.store$.dispatch(new petActions.FindAction(searchPreference));
                }
                else {
                    this.router.navigate(['/search']);
                }
            });
    }

    onPageRequest(args: ListViewEventData) {
        const listView: RadListView = args.object;
        this.store$.dispatch(new petActions.FindNextAction);
        this.isLoading$
            .take(2)
            .subscribe(res => {
                if (!res) {
                    listView.notifyLoadOnDemandFinished();
                }
            });
    }

}
