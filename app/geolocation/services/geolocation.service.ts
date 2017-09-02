import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OpenStreetResponse } from '../interfaces/OpenStreetResponse';
import { Observable } from 'rxjs/Observable';

const OPENSTREET_API = 'http://nominatim.openstreetmap.org/reverse?format=json';

@Injectable()
export class GeolocationService {

    constructor(private http: Http) { }

    lookupAddress(latitude: number, longitude: number, zoom = 18, addressDetails = 1): Observable<OpenStreetResponse> {
        return this.http.get(`${OPENSTREET_API}&lat=${latitude}&lon=${longitude}&zoom=${zoom}&addressdetails=${addressDetails}`)
            .map(res => res.json());
    }

}
