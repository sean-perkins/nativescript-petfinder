import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Image } from 'tns-core-modules/ui/image';
const CarouselItem = require('nativescript-carousel').CarouselItem;

import { Pet } from '../../../common/models/Pet';

@Component({
    selector: 'petfinder-image-preview',
    moduleId: module.id,
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.css']
})
export class PetImagePreviewComponent implements AfterViewInit {

    @Input() pet: Pet;

    @ViewChild('carousel') carousel: ElementRef;

    ngAfterViewInit() {
        if (this.pet.hasImage) {
            this.buildCarousel();
        }
    }

    private buildCarousel(): void {
        for (let photoUrl of this.pet.photos) {
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

}
