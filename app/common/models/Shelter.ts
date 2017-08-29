export class Shelter {

    country: string;

    longitude: number;

    name: string;

    phone: string;

    state: string;

    address2: string

    email: string;

    city: string;

    zip: string;

    fax: string;

    latitude: number;

    id: string;

    address1: string;

    constructor(options: Shelter = <Shelter>{}) {
        this.country = options.country || null;
        this.longitude = options.longitude || null;
        this.name = options.name || null;
        this.phone = options.phone || null;
        this.state = options.state || null;
        this.address2 = options.address2 || null;
        this.email = options.email || null;
        this.city = options.city || null;
        this.zip = options.zip || null;
        this.fax = options.fax || null;
        this.latitude = options.latitude || null;
        this.id = options.id || null;
        this.address1 = options.address1 || null;
    }

}
