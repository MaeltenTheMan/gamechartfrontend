import { Observable } from 'rxjs/Rx';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    userRole: string;

    status: string;

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

    getStatus() {
        this.localStorage.getItem<string>('Status').subscribe(res => {
  
            if (!!res) {
                this.status = res;
            

            } 
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.getUser();
        this.getStatus();

        

        const authReq = req.clone({
            headers: req.headers.set('Authentication',
                "" + this.userRole)
               
        } );
        
        const second = authReq.clone({
            
            headers: authReq.headers.set("Status",
            "" + this.status)
        })

        return next.handle(second)
            .do(() => {
            })
            .catch((error, caught) => {
                //intercept the response error
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;

    }
}