import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PetModule } from '../pet/pet.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        PetModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
