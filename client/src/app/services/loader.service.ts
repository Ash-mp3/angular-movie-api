import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = false;
  constructor() { }
  setloading(loading: boolean) {
    this.loading = loading;
  }
  getloading() {
    return this.loading;
  }
}
