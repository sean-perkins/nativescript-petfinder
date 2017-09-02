import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NSLinearIconsModule } from '../linearicons/linearicons.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { GeolocationModule } from '../geolocation/geolocation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { PetModule } from '../pet/pet.module';

@NgModule({
    imports: [
        SearchRoutingModule,
        NSLinearIconsModule,
        GeolocationModule,
        NativeScriptFormsModule,
        FormsModule,
        ReactiveFormsModule,
        PetModule
    ],
    declarations: [
        SearchPageComponent
    ],
    exports: [
        SearchPageComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
