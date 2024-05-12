import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  constructor() { }
  show() {
    console.log('show');
    this.loading.next(true);
  }
  hide() {
    console.log('hide');
    this.loading.next(false);
  }
}
