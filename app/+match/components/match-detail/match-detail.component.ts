import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { IAppState, getMatchDetail } from '../../../store/app.state';

import { default as matchActions } from '../../../store/actions/match.actions';

import { SavedPet } from '../../../common/models/SavedPet';
import { Observable } from 'rxjs/Observable';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';

import { Image } from 'tns-core-modules/ui/image';
import { Page } from 'tns-core-modules/ui/page';
const CarouselItem = require('nativescript-carousel').CarouselItem;

@Component({
    selector: 'petfinder-match-detail',
    moduleId: module.id,
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit, AfterContentInit, AfterViewInit {

    @ViewChild('carousel') carousel: ElementRef;
    @ViewChild('scrollView') scrollView: ElementRef;

    pet$: Observable<SavedPet>;

    mask = true;

    initialLoad = true;

    constructor(
        private page: Page,
        private zone: NgZone,
        private route: ActivatedRoute,
        private store$: Store<IAppState>) { }

    ngOnInit() {
        this.pet$ = this.store$.let(getMatchDetail);
    }

    ngAfterViewInit() {
        this.buildCarousel();
        this.handlePageScroll();
    }

    ngAfterContentInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.store$.dispatch(new matchActions.FindAction(id));
        }
    }

    getPetBackgroundStyle(pet: SavedPet): string {
        if (pet.hasImage) {
            return `background-image: url('${pet.photos[0]}');`;
        }
        return '';
    }

    disableMask(): void {
        this.initialLoad = false;
        this.mask = false;
    }

    private handlePageScroll(): void {
        const scrollView: ScrollView = this.scrollView.nativeElement;
        scrollView.on(ScrollView.scrollEvent, () => {
            if (!this.mask) {
                this.zone.run(() => {
                    const profile: GridLayout = this.page.getViewById('profile');
                    profile.style.opacity = 0;
                    this.mask = true;
                    profile.animate({
                        opacity: 1,
                        duration: 500
                    });
                });
            }
        });
    }

    private buildCarousel(): void {
        this.pet$
            .take(2)
            .subscribe(res => {
                if (res !== null) {
                    for (let photoUrl of res.photos) {
                        const image = new Image();
                        image.width = 300;
                        image.height = 800;
                        image.src = photoUrl;
                        image.className = 'image';

                        const item = new CarouselItem();
                        item.addChild(image);

                        this.carousel.nativeElement.addChild(item);
                    }
                    this.carousel.nativeElement.refresh();
                }
            });
    }

}
