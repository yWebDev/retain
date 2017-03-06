import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api';
import {StoreHelper} from './store-helper';
import {Store} from '../store';

@Injectable()
export class AuthService implements CanActivate {
    private JWT_KEY: string = 'retain_key';
    private JWT: string = '';

    constructor(private router: Router,
                private api: ApiService,
                private storeHelper: StoreHelper,
                private store: Store,) {
        const token = window.localStorage.getItem(this.JWT_KEY);

        if (token) {
            this.setJwt(token);
        }
    }

    setJwt(jwt: string) {
        window.localStorage.setItem(this.JWT_KEY, jwt);
        this.api.setHeaders({Authorization: `Bearer ${jwt}`});
        this.JWT = jwt;
    }

    isAuthenticated(): boolean {
        return Boolean(this.JWT);
    }

    canActivate() {
        const canActivate = this.isAuthenticated();
        this.onCanActivate(canActivate);
        return canActivate;
    }

    onCanActivate(canActivate: boolean) {
        if (!canActivate) {
            this.router.navigate(['', 'auth']);
        }
    }

    authenticate(path, credits): Observable<any> {
        return this.api.post(`/${path}`, credits)
            .do((resp: any) => this.setJwt(resp.token))
            .do((resp: any) => this.storeHelper.update('user', resp.data))
            .map((resp: any) => resp.data);
    }

    signout() {
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.purge();
        this.router.navigate(['', 'auth'])
    }
}
