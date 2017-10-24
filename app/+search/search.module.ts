import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NSLinearIconsModule } from '../linearicons/linearicons.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { GeolocationModule } from '../geolocation/geolocation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular';
import { PetModule } from '../pet/pet.module';
import { SearchGridComponent } from './components/search-grid/search-grid.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SearchRoutingModule,
        CommonModule,
        NSLinearIconsModule,
        GeolocationModule,
        NativeScriptFormsModule,
        FormsModule,
        ReactiveFormsModule,
        NativeScriptUIListViewModule,
        PetModule
    ],
    declarations: [
        SearchPageComponent,
        SearchGridComponent
    ],
    exports: [
        SearchPageComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
