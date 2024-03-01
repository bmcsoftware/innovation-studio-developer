import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// We are using a pipe to filter the icon names, this means it is not easy to get the list
// of filtered icons to display a message.
// For this we have a service that has an Observable passing the number of filtered icons.
// The pipe is emitting the number of filtered icons and the component subscribes to the
// service observable and display the Adapt Alert when necessary.
@Injectable({
  providedIn: 'root'
})
export class IconFilterTrackingService {
  // The component subscribes to this observable.
  isFilterComplete$: Observable<number>;
  // The pipe will emit on this subject.
  filterComplete: Subject<number>;

  constructor() {
    this.filterComplete = new Subject<number>();
    this.isFilterComplete$ = this.filterComplete.asObservable();
  }
}
