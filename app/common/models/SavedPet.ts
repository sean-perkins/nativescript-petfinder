import { Pet } from './Pet';

export class SavedPet extends Pet {

    createdAt: number;

    updatedAt: number;

    constructor(options: SavedPet = <SavedPet>{}) {
        super(options);
        this.createdAt = options.createdAt || null;
        this.updatedAt = options.updatedAt || null;
    }

}
