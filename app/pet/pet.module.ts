import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import * as components from './components';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [components.DECLARATIONS],
    exports: [components.EXPORTS],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PetModule { }
