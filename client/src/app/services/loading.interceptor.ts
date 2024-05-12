import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next): Observable<HttpEvent<any>> => { //
  const loaderService = inject(LoaderService);
  console.log('showing spinner');
  loaderService.show();//this changes the observable to be true
  return next(req).pipe(
    finalize(() => {console.log('hiding spinner');//this will be executed we get to the next page from my understanding -adolfo
      loaderService.hide()}) //this changes the observable to be false
  );
};
