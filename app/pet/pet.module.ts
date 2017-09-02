import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ButtonModule } from '../button/button.module';
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular';
import { NSLinearIconsModule } from '../linearicons/linearicons.module';
import * as components from './components';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        NSLinearIconsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        components.DECLARATIONS
    ],
    exports: [
        components.EXPORTS
    ],
    providers: [
        ModalDialogService
    ],
    entryComponents: [
        components.ENTRY_COMPONENTS
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PetModule { }
