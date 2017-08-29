import { Injectable } from '@angular/core';
import { ExtendedHttpService } from '../../http/services/extended-http.service';
import { PetFinder } from '../../common/PetFinder';
import { Shelter } from '../../common/models/Shelter';

@Injectable()
export class ShelterService {

    constructor(private http: ExtendedHttpService) { }

    /**
     * Returns a collection of shelter records matching your search criteria.
     * @param location the ZIP/postal code or city and state where the search should begin
     */
    find(location: string) {
        return this.http.get(`${PetFinder.API}/shelter.find?location=${location}`)
            .map(res => res.json())
            .map(res => {
                const shelters: Shelter[] = [];
                if (res.petfinder) {
                    if (res.petfinder.shelters) {
                        let petfinderShelter = res.petfinder.shelters.shelter;
                        for (let s of petfinderShelter) {
                            let shelter = new Shelter({
                                country: s.country.$t,
                                longitude: s.longitude.$,
                                name: s.name.$t,
                                phone: s.phone.$t,
                                state: s.state.$t,
                                address2: s.address2.$t,
                                email: s.email.$t,
                                city: s.city.$t,
                                zip: s.zip.$t,
                                fax: s.fax.$t,
                                latitude: s.latitude.$t,
                                id: s.id.$t,
                                address1: s.address1.$t
                            });
                            shelters.push(shelter);
                        }
                    }
                }
                return shelters;
            });
    }
}
