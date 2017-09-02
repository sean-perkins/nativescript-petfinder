export interface OpenStreetResponse {
    place_id: string;
    license: string;
    osm_type: string;
    osm_id: string;
    lat: number;
    lon: number;
    display_name: string;
    address: {
        house_number: any,
        road: string,
        suburb: string,
        city: string,
        county: string,
        state_district: string,
        state: string,
        postcode: string,
        country: string,
        country_code: string
    };
    boundingbox: number[]
}
