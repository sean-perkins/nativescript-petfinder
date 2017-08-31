import { Injectable } from '@angular/core';
import * as appSettings from 'tns-core-modules/application-settings';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { AppCache, SavedPet } from '../../common/models/index';

/**
 * Storage Service for saving important persistence data
 * needed for the application to function
 */
@Injectable()
export class StorageService {

    static NAMESPACE = 'petfinder_cache';

    get matches(): Observable<any> {
        // console.log(JSON.stringify(this.cache));
        return of(this.cache.pets);
    }

    findMatch(id: string): Observable<SavedPet> {
        return Observable.create((observer: Observer<SavedPet>) => {
            const cache = this.cache;
            if (!cache.hasPet(<any>{ id: id })) {
                observer.error(`Match not found with id: ${id}.`);
            }
            else {
                observer.next(cache.getPet(id));
                observer.complete();
            }
            return observer;
        });
    }

    appendMatch(pet: SavedPet): Observable<any> {
        if (pet) {
            const cache = this.cache;
            // only append new matches
            if (!cache.hasPet(pet)) {
                cache.pets.push(pet);
                this.updateCache(cache);
            }
        }
        return empty();
    }

    removeMatch(pet: SavedPet): Observable<any> {
        const cache = this.cache;
        if (cache.hasPet(pet)) {
            cache.pets.splice(cache.getPetIndex(pet.id));
            this.updateCache(cache);
        }
        return empty();
    }

    clearMathes(): Observable<any> {
        const cache = this.cache;
        cache.pets = [];
        this.updateCache(cache);
        return empty();
    }

    private updateCache(cache: AppCache) {
        appSettings.setString(StorageService.NAMESPACE, cache.toJSON());
    }

    private get cache(): AppCache {
        const cache: any = appSettings.getString(StorageService.NAMESPACE);
        if (cache) {
            return new AppCache(JSON.parse(cache));
        }
        return new AppCache();
    }

}
