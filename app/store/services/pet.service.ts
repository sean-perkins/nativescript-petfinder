import { Injectable } from '@angular/core';
import { ExtendedHttpService } from '../../http/services/extended-http.service';
import { PetFinder } from '../../common/PetFinder';
import { Pet, ContactPerson, PetSearch } from '../../common/models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PetService {

    constructor(private http: ExtendedHttpService) { }

    /**
     * Returns a record for a randomly selected pet. You can choose the characteristics of the pet you want returned using the various arguments to this method.
     * @param location The location to search for a pet
     */
    getRandom(location: string) {
        return this.http.get(`${PetFinder.API}/pet.getRandom?location=${location}&output=full`)
            .map(res => res.json())
            .map(res => this.formatPetData(res));
    }

    /**
     * Returns a record for a single pet.
     * @param id The id of the pet
     */
    getPet(id: string): Observable<Pet> {
        return this.http.get(`${PetFinder.API}/pet.get?id=${id}`)
            .map(res => res.json())
            .map(res => this.formatPetData(res));
    }

    findPets(options: PetSearch): Observable<any> {
        return this.http.get(`${PetFinder.API}/pet.find?output=full&${options.toParams()}`)
            .map(res => res.json())
            .map(res => {
                const pets = [];
                if (res.petfinder) {
                    if (res.petfinder.pets) {
                        for (const pet of res.petfinder.pets.pet) {
                            pets.push(this.formatPetRecord(pet));
                        }
                    }
                }
                return {
                    pets: pets,
                    offset: res.petfinder.lastOffset.$t,
                    hasNext: pets.length === options.count,
                    nextRequest: options.nextRequest()
                };
            });
    }

    private formatPetData(res: any): Pet {
        let pet: Pet = null;
        if (res.petfinder) {
            const p = res.petfinder.pet;
            pet = this.formatPetRecord(p);
        }
        return pet;
    }

    private formatPetRecord(p): any {
        if (p) {
            const contact = new ContactPerson({
                phone: p.contact.phone.$t,
                state: p.contact.state.$t,
                address2: p.contact.address2.$t,
                email: p.contact.email.$t,
                city: p.contact.city.$t,
                zip: p.contact.zip.$t,
                fax: p.contact.fax.$t,
                address1: p.contact.address1.$t
            });

            const photos = [];

            const ids = [];

            const pPhotos = p.media.photos;

            if (pPhotos) {
                const media: any[] = p.media.photos.photo;
                for (let image of media) {
                    if (image.$t.indexOf('width=500') !== -1) {
                        if (ids.indexOf(image['@id']) === -1) {
                            photos.push(image.$t);
                            ids.push(image['@id']);
                        }
                    }
                }
            }

            return new Pet(<any>{
                status: p.status.$t,
                contact: contact,
                age: p.age.$t,
                size: p.size.$t,
                photos: photos,
                id: p.id.$t,
                shelterPetId: p.shelterPetId.$t,
                breeds: p.breeds.breed.$t,
                name: p.name.$t,
                sex: p.sex.$t,
                description: p.description.$t,
                mix: p.mix.$t === 'yes',
                shelterId: p.shelterId.$t,
                lastUpdate: p.lastUpdate.$t,
                animal: p.animal.$t
            });

        }
    }
}
