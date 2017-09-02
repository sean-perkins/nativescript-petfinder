import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'tns-core-modules/ui/page';
import { Color } from 'tns-core-modules/color/color';
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import { BreedUtils } from '../../../common/utils/BreedUtils';
import { RadListView, ListViewScrollEventData } from 'nativescript-telerik-ui/listview';

@Component({
    selector: 'petfinder-breed-dialog',
    moduleId: module.id,
    templateUrl: './breed-dialog.component.html',
    styleUrls: ['./breed-dialog.component.css']
})
export class BreedDialogComponent implements OnInit {

    private alphabet = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    private animalTypes = ['Dogs', 'Cats', 'Other Animals'];

    @ViewChild('breedListView') breedListView: ElementRef;

    items: any[] = [];

    searchPhrase = '';

    currentOffset = 0;

    selectedBreed: string;

    private debouncer: any;
    private _currentTitle = 'A';

    constructor(
        private params: ModalDialogParams,
        private zone: NgZone,
        private page: Page) {

        this.page.backgroundSpanUnderStatusBar = true;
        this.page.backgroundColor = new Color('#7332D6');
        this.page.statusBarStyle = 'dark';
        this.page.actionBarHidden = true;

        this.page.on(Page.unloadedEvent, () => {
            this.params.closeCallback();
        });
    }

    ngOnInit() {
        this.items = this.listItems;
        this.selectedBreed = this.params.context.breed;
        this.listviewScrollListener();
    }

    dismiss(): void {
        this.params.closeCallback();
    }

    onSearch(args?: any) {
        const searchBar = <SearchBar>args.object;
        const phrase = searchBar.text;

        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(() => {
            this.debouncer = null;
            if (!phrase || phrase.trim().length === 0) {
                this.searchPhrase = '';
                this.items = this.getFilterListItems(this.listItems);
                this.zone.run(() => {
                    this._currentTitle = this.items[0].title;
                });
            }
            else {
                this.items = this.getFilterListItems(this.listItems, phrase);
                this.searchPhrase = phrase;
            }
        }, 400);
    }

    animatePress(element: any, breed: string) {
        element.animate({
            backgroundColor: new Color('#eee'),
            duration: 150
        }).then(() => {
            setTimeout(() => {
                this.params.closeCallback(breed);
            }, 200);
        });
    }

    get currentTitle(): string {
        return this._currentTitle;
    }

    get hasResults(): boolean {
        return this.items.length > 0 && this.items[0].breeds.length > 0;
    }

    private getFilterListItems(list: any[], phrase = this.searchPhrase): any[] {
        return list.filter(res => {
            res.breeds = res.breeds.filter(breed => breed.toLowerCase().indexOf(phrase.toLowerCase()) !== -1);
            return res.breeds.length > 0 || res.title === phrase.substr(0, 1).toUpperCase();
        });
    }

    private getFilterOffsetList(): any[] {
        let listItems = [];
        const breeds = this.breedList;
        for (const letter of this.alphabet) {
            let letterBreeds = breeds.filter(res => res.substr(0, 1).toUpperCase() === letter &&
                res.toLowerCase().indexOf(this.searchPhrase.toLowerCase()) !== -1);
            const listOffset = (40 * listItems.filter(res =>
                this.searchPhrase.substr(0, 1).toUpperCase() === letter).length) + ((1 + letterBreeds.length) * 40);
            listItems.push({
                title: letter,
                breeds: letterBreeds,
                offset: listItems.length > 0 ?
                    ((listItems[listItems.length - 1].offset + listOffset - (40 * listItems.filter(res =>
                        this.searchPhrase.substr(0, 1).toUpperCase() === letter).length))) : listOffset,
            });
        }
        return listItems;
    }

    private listviewScrollListener(): void {
        const listview = <RadListView>this.breedListView.nativeElement;
        listview.on(RadListView.scrolledEvent, (data: ListViewScrollEventData) => {
            this.zone.run(() => {
                this.currentOffset = data.scrollOffset;
            });
            const tempListItems = this.getFilterListItems(this.getFilterOffsetList()).filter(res => res.offset >= data.scrollOffset);
            if (this._currentTitle !== tempListItems[0].title) {
                this.zone.run(() => {
                    this._currentTitle = tempListItems[0].title;
                });
            }
        });
    }

    private get listItems(): any[] {
        let listItems = [];
        const breeds = this.breedList;
        for (const letter of this.alphabet) {
            let letterBreeds = breeds.filter(res => res.substr(0, 1).toUpperCase() === letter);
            listItems.push({
                title: letter,
                breeds: letter.length === 0 ? [`All ${this.animalTypes[this.params.context.animalType]}`] : letterBreeds
            });
        }
        return listItems;
    }

    private get breedList(): any[] {
        switch (this.params.context.animalType) {
            case 0:
                return BreedUtils.DOGS;
            case 1:
                return BreedUtils.CATS;
            case 2:
                return [...BreedUtils.BIRDS, ...BreedUtils.HORSES, ...BreedUtils.PIGS, ...BreedUtils.RABBITS, ...BreedUtils.REPTILES].sort();
        }
        return [];
    }

}
