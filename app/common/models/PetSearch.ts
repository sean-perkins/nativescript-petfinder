import { URLSearchParams } from '@angular/http';

export class PetSearch {
    /**
     * The type of animal to search for
     */
    animal?: 'barnyard' | 'bird' | 'cat' | 'dog' | 'horse' | 'reptile' | 'smallfurry';
    /**
     * The breed of the animal to search for
     */
    breed?: string;
    /**
     * The size of the animal (small, medium, large, extra-large)
     */
    size?: 'S' | 'M' | 'L' | 'XL';
    /**
     * The gender of the animal (male, female)
     */
    sex?: 'M' | 'F';
    /**
     * Your search location, either a postal code or city, state
     */
    location: string;
    /**
     * The desired age of the animal
     */
    age?: 'Baby' | 'Young' | 'Adult' | 'Senior';
    /**
     * The size offset used for pagination
     */
    offset?: number;
    /**
     * The number of search results to return
     */
    count?: number;

    constructor(options: PetSearch = <PetSearch>{}) {
        this.animal = options.animal || null;
        this.breed = options.breed || null;
        this.size = options.size || null;
        this.sex = options.sex || null;
        this.location = options.location || null;
        this.age = options.age || null;
        this.offset = options.offset || null;
        this.count = options.count || null;
    }

    nextRequest(): PetSearch {
        return new PetSearch(Object.assign({}, this, {
            offset: this.offset + this.count
        }));
    }

    toParams = (): string => {
        const params = new URLSearchParams();
        if (this.animal && this.animal !== null) {
            params.set('animal', this.animal.toString());
        }
        if (this.breed && this.breed !== null) {
            params.set('breed', this.breed.toString());
        }
        if (this.size && this.size !== null) {
            params.set('size', this.size.toString());
        }
        if (this.sex && this.sex !== null) {
            params.set('sex', this.sex.toString());
        }
        if (this.location && this.location !== null) {
            params.set('location', this.location.toString());
        }
        if (this.age && this.age !== null) {
            params.set('age', this.age.toString());
        }
        if (this.offset && this.offset !== null) {
            params.set('offset', this.offset.toString());
        }
        if (this.count && this.count !== null) {
            params.set('count', this.count.toString());
        }
        return params.toString();
    }

}
