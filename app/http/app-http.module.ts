import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ExtendedHttpService } from './services/extended-http.service';

@NgModule({
    imports: [HttpModule, RouterModule],
    providers: [ExtendedHttpService],
    exports: [HttpModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppHttpModule { }
