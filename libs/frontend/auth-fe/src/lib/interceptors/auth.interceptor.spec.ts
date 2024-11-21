import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../services/authentication.service';
import { HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

describe('authInterceptor', () => {
    let mockAuthService: {
        getIdToken: jest.Mock;
    };
    let testScheduler: TestScheduler;

    beforeEach(() => {
        mockAuthService = {
            getIdToken: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useValue: mockAuthService }
            ]
        });
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should add bearer token to request if authenticated', async () => {
        await testScheduler.run(async ({ cold, expectObservable }) => {
            const falseToken = 'my-super-token';
            jest.spyOn(mockAuthService, 'getIdToken').mockReturnValue(
                Promise.resolve(falseToken)
            );

            const mockRequest = new HttpRequest('GET', '/test', {
                headers: new HttpHeaders()
            });
            const mockNext = (req: HttpRequest<unknown>) => {
                return cold('--b', { b: req });
            };

            const result = await TestBed.runInInjectionContext(() =>
                authInterceptor(
                    mockRequest,
                    mockNext as unknown as HttpHandlerFn
                )
            );

            expectObservable(result).toBe(
                '--b',
                mockRequest.clone({
                    headers: mockRequest.headers.append(
                        'Authorization',
                        `Bearer ${falseToken}`
                    )
                })
            );
        });
    });
});
