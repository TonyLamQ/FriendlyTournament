import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const authJwtToken = localStorage.getItem("authJwtToken");
        if(authJwtToken){
            const cloned = req.clone({
                headers:req.headers
                    .set('Authorization', `${authJwtToken}`)
            });

            return next.handle(cloned)
        } else {
            return next.handle(req);
        }
    }
}