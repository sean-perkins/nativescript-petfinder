import { SavedPet } from './SavedPet';
import { Shelter } from './Shelter';
import { SearchPreference } from './SearchPreference';

export class AppCache {

    zipcode: string;

    searchPreference: SearchPreference;

    pets: SavedPet[];

    shelters: Shelter[];

    constructor(options: AppCache = <AppCache>{}) {
        this.searchPreference = options.searchPreference ? new SearchPreference(options.searchPreference) : null;
        this.zipcode = options.zipcode || null;
        this.pets = Array.isArray(options.pets) ?
            options.pets.map(res => new SavedPet(res)) : [];
        this.shelters = Array.isArray(options.shelters) ?
            options.shelters.map(res => new Shelter(res)) : [];

    }

}
