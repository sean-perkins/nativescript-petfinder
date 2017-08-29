import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    imports: [ProfileRoutingModule],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
