import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: './+home/home.module#HomeModule'
    },
    {
        path: 'profile',
        loadChildren: './+profile/profile.module#ProfileModule'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
