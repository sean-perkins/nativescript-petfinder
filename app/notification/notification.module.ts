import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular';
import * as components from './components';

@NgModule({
    imports: [
        CommonModule,
        NativeScriptRouterModule
    ],
    declarations: [
        components.DECLARATIONS
    ],
    exports: [
        components.EXPORTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NotificationModule { }
