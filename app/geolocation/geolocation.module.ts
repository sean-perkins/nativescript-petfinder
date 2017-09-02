import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from 'nativescript-angular';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
    imports: [
        HttpModule,
        NativeScriptHttpModule
    ],
    providers: [
        GeolocationService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class GeolocationModule { }
