import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskService } from './services/task.service';
import { EffectsModule } from '@ngrx/effects';
import { ShelterEffects } from './effects/shelter.effects';
import { AppHttpModule } from '../http/app-http.module';
import { HttpModule } from '@angular/http';
import { ShelterService } from './services/shelter.service';
import { PetService } from './services/pet.service';
import { PetEffects } from './effects/pet.effects';
import { StorageService } from './services/storage.service';
import { MatchEffects } from './effects/match.effects';

@NgModule({
    imports: [
        AppHttpModule,
        HttpModule,
        EffectsModule.run(ShelterEffects),
        EffectsModule.run(PetEffects),
        EffectsModule.run(MatchEffects)
    ],
    providers: [
        PetService,
        ShelterService,
        StorageService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppStoreModule { }
