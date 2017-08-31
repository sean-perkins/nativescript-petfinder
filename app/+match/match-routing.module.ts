import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { MatchComponent } from './components/match/match.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: MatchComponent },
    { path: ':id', component: MatchDetailComponent }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class MatchRoutingModule { }
