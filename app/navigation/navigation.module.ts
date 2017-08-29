import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NSLinearIconsModule } from '../linearicons/linearicons.module';
import { NotificationModule } from '../notification/notification.module';
import * as components from './components';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        NativeScriptRouterModule,
        NotificationModule,
        NSLinearIconsModule
    ],
    declarations: [components.DECLARATIONS],
    exports: [components.EXPORTS],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NavigationModule { }
