import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ICallProcessParameters, ICallProcessResponse } from '../design/call-process.interface';
import { RxLogService, RxNotificationService } from '@helix/platform/shared/api';
import { CALL_PROCESS_OPTIONS } from './call-process.types';
import { RxLaunchProcessViewActionService } from '@helix/platform/view/actions';
import { ILaunchProcessViewActionParams } from '@helix/platform/view/actions/launch-process/launch-process-view-action.types';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';

// This view component looks a lot like "generate-password".
// Please see this view component for the code comment.
@Component({
  selector: 'com-example-test210500-com-example-test210500-call-process',
  templateUrl: './call-process.component.html',
  providers: [RxLaunchProcessViewActionService]
})
export class CallProcessComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;

  private componentData: ICallProcessParameters;

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
              private rxLaunchProcessViewActionService: RxLaunchProcessViewActionService) {
    super();
  }

  ngOnInit() {
    // Subscribing to the input parameter "username" but only when it changes.
    this.config.pipe(
      pluck('username'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((username: string) => {
      this.componentData = {
        username
      };
    });

    this.notifyPropertyChanged('api', this.api);
  }

  // We are calling a process passing a process input parameter ("Input username").
  // We then get the Process output parameter.
  private callGeneratePasswordProcess(username: string): Observable<any> {
    const processParameters: ILaunchProcessViewActionParams = {
      processDefinitionName: CALL_PROCESS_OPTIONS.processDefinitionName,
      // We need to wait for the process to complete in order to get the output parameters.
      // This of course only works if the process is synchronous, aka does not have "user task"
      // that would pause the process for example.
      waitForProcessCompletion: true,
      // Process input parameters mapping.
      actionProcessInputParams: {
        'Input username': username
      }
    };

    // This call is smart enough to return directly the output parameters.
    // In the fact two calls are performed under the hood (executing the process
    // and getting the output parameters).
    return this.rxLaunchProcessViewActionService.execute(processParameters);
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
      // The response is in the process output parameter, here "Output password";
      this.callGeneratePasswordProcess(this.componentData.username).subscribe((processResponse: ICallProcessResponse) => {
        this.broadcastPassword(processResponse['Output password']);
      });
    }

    return EMPTY;
  }

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
