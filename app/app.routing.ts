import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: './+home/home.module#HomeModule'
    },
    {
        path: 'profile',
        loadChildren: './+profile/profile.module#ProfileModule'
    },
    {
        path: 'matches',
        loadChildren: './+match/match.module#MatchModule'
    },
    {
        path: 'search',
        loadChildren: './+search/search.module#SearchModule'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
