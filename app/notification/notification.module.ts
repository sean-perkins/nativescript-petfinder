import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as components from './components';

@NgModule({
    imports: [CommonModule],
    declarations: [components.DECLARATIONS],
    exports: [components.EXPORTS],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NotificationModule { }
