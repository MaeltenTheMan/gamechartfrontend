import { SpinnerService } from './spinner.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';



@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // emit onStarted event before request execution
        this.spinnerService.onStarted(req);

        return next.handle(req).finally(() => this.spinnerService.onFinished(req));
    }

}