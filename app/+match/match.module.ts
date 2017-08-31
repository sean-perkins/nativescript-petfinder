import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchRoutingModule } from './match-routing.module';
import { MatchComponent } from './components/match/match.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { PetModule } from '../pet/pet.module';
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular';
import { MatchUIModule } from '../match/match.module';

@NgModule({
    imports: [
        MatchRoutingModule,
        NativeScriptUIListViewModule,
        MatchUIModule,
        CommonModule,
        PetModule
    ],
    declarations: [
        MatchComponent,
        MatchDetailComponent
    ],
    exports: [
        MatchComponent,
        MatchDetailComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MatchModule { }
