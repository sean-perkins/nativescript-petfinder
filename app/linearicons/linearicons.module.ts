import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearIconsDirective } from './directives/linearicons.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [LinearIconsDirective],
    exports: [LinearIconsDirective],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NSLinearIconsModule { }
