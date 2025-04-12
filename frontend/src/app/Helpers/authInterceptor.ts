import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const withCredentials = req.clone({ withCredentials: true });
    console.log("Request made with ", req);
    console.log("Request made with ", withCredentials);
    console.log("Request made with ", next);

    return next(withCredentials);
  }