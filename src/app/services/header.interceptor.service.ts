import { Observable } from 'rxjs/Rx';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    userRole: string;

    constructor(private localStorage: AsyncLocalStorage) {

    }

    getUser() {
        this.localStorage.getItem<string>('Authentication').subscribe(res => {
            if (!!res) {
                this.userRole = res;

            } else {
                this.userRole = "user";
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.getUser();

        const authReq = req.clone({
            headers: req.headers.set('Authentication',
                "" + this.userRole)
        });

        return next.handle(authReq)
            .do(() => {
            })
            .catch((error, caught) => {
                //intercept the response error
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;

    }
}