import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { IAppState, getMatchDetail } from '../../../store/app.state';

import { default as matchActions } from '../../../store/actions/match.actions';

import { Accuracy } from 'tns-core-modules/ui/enums';
import { SavedPet } from '../../../common/models/SavedPet';
import { Observable } from 'rxjs/Observable';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as phone from 'nativescript-phone';
import * as email from 'nativescript-email';
import * as geolocation from 'nativescript-geolocation';
import { compose as composeEmail } from 'nativescript-email';
import { Directions } from 'nativescript-directions';

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

    disableMask(args?: any): void {
        if (args) {
            args.animate({
                opacity: 0,
                duration: 400
            }).then(() => {
                this.initialLoad = false;
                this.mask = false;
            });
        }
    }

    inquire(pet: SavedPet): void {
        const actions = [];
        const contact = pet.contact;
        if (contact.phone) {
            actions.push(`Call ${contact.phone}`);
        }
        if (contact.email) {
            actions.push('Email')
        }
        if (contact.address1) {
            actions.push('View on Maps');
        }

        dialogs.action({
            title: 'Contact Methods',
            message: 'Select an option',
            actions: actions,
            cancelButtonText: 'Cancel'
        }).then(selectedAction => {
            if (selectedAction) {
                if (selectedAction === 'View on Maps') {
                    geolocation.enableLocationRequest().then(() => {
                        geolocation.getCurrentLocation({
                            desiredAccuracy: Accuracy.high,
                            updateDistance: 0.1,
                            timeout: 20000
                        }).then(location => {
                            const directions = new Directions();
                            directions.available().then(() => {
                                directions.navigate({
                                    from: {
                                        lat: location.latitude,
                                        lng: location.longitude
                                    },
                                    to: {
                                        address: `${contact.address1} ${contact.city}, ${contact.state} ${contact.zip}`
                                    },
                                    ios: {
                                        preferGoogleMaps: true,

                                    }
                                })
                            }, () => {
                                dialogs.alert({
                                    title: 'Error',
                                    message: 'Error opening maps on your device',
                                    okButtonText: 'Ok'
                                });
                            });
                        }, () => {
                            dialogs.alert({
                                title: 'Error',
                                message: 'Error accessing your current location.',
                                okButtonText: 'Ok'
                            });
                        });
                    }, () => {
                        dialogs.alert({
                            title: 'Error',
                            message: 'You must grant access to your location to use this feature.',
                            okButtonText: 'Ok'
                        });
                    });
                }
                else if (selectedAction === 'Email') {
                    email.available().then(() => {
                        email.compose({
                            subject: `Inquring about ${pet.name}`,
                            body: '',
                            to: [contact.email],

                        }).then(() => { }, () => {
                            dialogs.alert({
                                title: 'Error',
                                message: 'There was an issue sending the email.',
                                okButtonText: 'Ok'
                            });
                        });
                    }, () => {
                        dialogs.alert({
                            title: 'Error',
                            message: 'Email is not available',
                            okButtonText: 'Ok'
                        });
                    });
                }
                else if (selectedAction.startsWith('Call')) {
                    const formattedPhone = contact.phone.replace(/ /g, '').replace(/["'()]/g, '').replace(/-/g, '');
                    phone.dial(formattedPhone, true);
                }
            }
        });
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
