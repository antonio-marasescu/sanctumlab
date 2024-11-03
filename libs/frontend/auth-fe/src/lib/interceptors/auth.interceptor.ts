import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthenticationService);
    const token$ = from(authService.getIdToken());

    return token$.pipe(
        switchMap(token => {
            if (token) {
                const newReq = req.clone({
                    headers: req.headers.append(
                        'Authorization',
                        `Bearer ${token.toString()}`
                    )
                });
                return next(newReq);
            }
            return next(req);
        })
    );
}
