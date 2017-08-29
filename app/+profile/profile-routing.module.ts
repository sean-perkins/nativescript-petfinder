import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: ProfileComponent },
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class ProfileRoutingModule { }
