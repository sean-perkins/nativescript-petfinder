import { ContactPerson } from './ContactPerson';

export class Pet {

    contact: ContactPerson;

    age: string; // Young

    size: string; // M

    photos: string[];

    id: string;

    shelterPetId: string;

    breeds: string[];

    name: string;

    sex: string; // M

    description: string;

    mix: boolean; // yes

    shelterId: string;

    lastUpdate: string;

    animal: string;

    status: string; //A

    constructor(options: Pet = <Pet>{}) {
        this.contact = options.contact ? new ContactPerson(options.contact) : null;
        this.age = options.age || null;
        this.size = options.size || null;
        this.photos = Array.isArray(options.photos) ? options.photos : [];
        this.id = options.id || null;
        this.shelterPetId = options.shelterPetId || null;
        this.breeds = Array.isArray(options.breeds) ? options.breeds : [];
        this.name = options.name || null;
        this.sex = options.sex || null;
        this.description = options.description || null;
        this.mix = !!options.mix;
        this.shelterId = options.shelterId || null;
        this.lastUpdate = options.lastUpdate || null;
        this.animal = options.animal || null;
        this.status = options.status || null;
    }

}
