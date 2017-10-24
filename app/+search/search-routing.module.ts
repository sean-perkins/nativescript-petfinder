import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchGridComponent } from './components/search-grid/search-grid.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: SearchPageComponent },
    { path: 'grid', component: SearchGridComponent }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class SearchRoutingModule { }
