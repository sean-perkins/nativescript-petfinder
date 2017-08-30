import { SupportedBreeds, SupportedSexes, SupportedAges, SupportedPetStatuses } from '../utils/index';

export class SearchPreference {

    breed: SupportedBreeds;

    noCats: boolean;

    noDogs: boolean;

    noKids: boolean;

    noClaws: boolean;

    specialNeeds: boolean;

    hasShots: boolean;

    houseBroken: boolean;

    altered: boolean;

    sex: SupportedSexes;

    age: SupportedAges;

    status: SupportedPetStatuses;

    constructor(options: SearchPreference = <SearchPreference>{}) {
        this.breed = options.breed || null;
        this.noCats = !!options.noCats;
        this.noDogs = !!options.noDogs;
        this.noKids = !!options.noKids;
        this.noClaws = !!options.noClaws;
        this.specialNeeds = !!options.specialNeeds;
        this.hasShots = !!options.hasShots;
        this.houseBroken = !!options.houseBroken;
        this.altered = !!options.altered;
        this.sex = options.sex || null;
        this.age = options.age || null;
        this.status = options.status || 'A';
    }
}
