import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, XHRBackend, Request, Response } from '@angular/http';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { PetFinder } from '../../common/PetFinder';

@Injectable()
export class ExtendedHttpService extends Http {

    constructor(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        private router: Router) {
        super(backend, defaultOptions);
    }

    request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
        if (request.url.indexOf('api.petfinder') !== -1) {
            request.url = `${request.url.toString()}&key=${PetFinder.API_KEY}&secret=${PetFinder.API_SECRET}&format=json`;
            console.log(request.url);
        }
        return super
            .request(request, options)
            .catch(this.catchErrors())
    }

    private catchErrors() {
        return (res: Response) => {
            console.error(res);
            if (res.status === 401) {
                // TODO unauthorized request
            }
            else if (res.status === 403) {
                // TODO access denied screen
            }
            return Observable.throw(res);
        };
    }


}
