import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IGeneratePasswordParameters, IRestApiResponse } from '../design/generate-password.interface';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { HttpClient } from '@angular/common/http';
import { GENERATE_PASSWORD_OPTIONS } from './generate-password.types';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-generate-password',
  templateUrl: './generate-password.component.html',
  standalone: true,
  imports: [CommonModule]
})
@RxViewComponent({
  name: 'comExampleTest210500GeneratePassword'
})
export class GeneratePasswordComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;

  private componentData: IGeneratePasswordParameters = {
    username: ''
  };

  // Overriding default apis so we can implement:
  // setProperty (when a value is set through a button set property action),
  // refresh (when the view component is refreshed a button refresh action),
  private api = {
    setProperty: this.setProperty.bind(this),
    // In this example we use the refresh method to get the password.
    refresh: this.refresh.bind(this)
  };

  constructor(private rxLogService: RxLogService,
              private rxNotificationService: RxNotificationService,
              private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    // We subscribe to the "username" input parameter changes.
    this.config.pipe(
      pluck('username'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((username: string) => {
      this.componentData.username = username;
    });

    // This method is used to broadcast a value to outside the view component.
    // Here we broadcast the api changes we overrode.
    this.notifyPropertyChanged('api', this.api);
  }

  // We are calling a custom rest api from this bundle that will return the password.
  // We are using the regular Angular HttpClient object.
  private getPassword(username: string): Observable<any> {
    const url = GENERATE_PASSWORD_OPTIONS.restApiUrl + encodeURIComponent(username);

    return this.httpClient.get(url);
  }

  // Setting the password in the view component output parameter
  // and broadcasting its value to other view components.
  private broadcastPassword(password: string): void {
    this.notifyPropertyChanged('password', password);
    this.rxNotificationService.addInfoMessage('The new password is ' + password);
  }

  // In this example we use the refresh method to get the password.
  refresh(): Observable<any> {
    if (this.componentData.username) {
      this.getPassword(this.componentData.username).subscribe((restApiResponse: IRestApiResponse) => {
        this.broadcastPassword(restApiResponse.password);
      });
    }

    return EMPTY;
  }

  // This method is triggered by a button "set property" action.
  setProperty(propertyPath: string, propertyValue: any): void {
    switch (propertyPath) {
      case 'username': {
        this.componentData.username = propertyValue;
        break;
      }
      default: {
        this.rxLogService.warning(`Standalone Field: property ${propertyPath} is not settable, value was ${propertyValue}.`);
      }
    }
  }
}
