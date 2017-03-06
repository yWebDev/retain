import {Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    });
    private api_url: string = 'http://localhost:3500';

    constructor(private http: Http) {}

    private getJson(resp: Response) {
        return resp.json();
    }

    private checkForError(resp: Response): Response {
        if (resp.status >= 200 && resp.status < 300) {
            return resp;
        }

        const error = new Error(resp.statusText);
        error['response'] = resp;
        console.error(error);
        throw error;
    }

    get(path: string): Observable<any>  {
        return this.http.get(`${this.api_url}${path}`, this.headers)
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)
    }

    post(path: string, body): Observable<any>  {
        return this.http.post(`${this.api_url}${path}`, JSON.stringify(body), { headers: this.headers })
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)
    }

    put(path: string, body): Observable<any>  {
        return this.http.post(`${this.api_url}${path}`, JSON.stringify(body), { headers: this.headers })
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)
    }

    delete(path: string): Observable<any>  {
        return this.http.get(`${this.api_url}${path}`, this.headers)
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)
    }

    setHeaders(headers) {
        Object.keys(headers)
            .forEach(header => {
                this.headers.set(header, headers[header]);
            })
    }
}