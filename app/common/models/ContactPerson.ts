export class ContactPerson {

    phone: string;

    state: string;

    address2: string;

    email: string;

    city: string;

    zip: string;

    fax: string;

    address1: string;

    constructor(options: ContactPerson = <ContactPerson>{}) {
        this.phone = options.phone || null;
        this.state = options.state || null;
        this.address2 = options.address2 || null;
        this.email = options.email || null;
        this.city = options.city || null;
        this.zip = options.zip || null;
        this.fax = options.fax || null;
        this.address1 = options.address1 || null;
    }

}
