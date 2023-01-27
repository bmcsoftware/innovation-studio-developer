import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IOpenBladeParameters } from '../design/open-blade.interface';
import { catchError, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { get, isEqual } from 'lodash';
import { RxOpenViewActionService } from '@helix/platform/view/actions';
import { IOpenViewActionParams } from '@helix/platform/view/actions/open-view/open-view-action.types';
import { OpenViewActionType } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-open-blade',
  styleUrls: ['./open-blade.scss'],
  templateUrl: './open-blade.component.html'
})
export class OpenBladeComponent extends BaseViewComponent implements OnInit,IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: IOpenBladeParameters;
  viewResult = '';

  // Note:
  // It is very important for 21.05 and 21.3 to import the RxOpenViewActionService module
  // "OpenViewActionModule" in the view component module for now to avoid a dependency error
  // at runtime.
  // The error would not appear in debug mode but would appear in other cases.
  // Here please check file "open-blade-registration.module.ts".
  constructor(private rxOpenViewActionService: RxOpenViewActionService) {
    super();
  }

  ngOnInit() {
    // Subscribing to input parameter changes.
    this.config.pipe(
      distinctUntilChanged(isEqual),
      takeUntil(this.destroyed$)
    ).subscribe((config: IOpenBladeParameters) => {
      this.inputParams = config;
    });
  }

  openBlade(): void {
    const viewParameters: IOpenViewActionParams = {
      presentation: {
        type: OpenViewActionType.DockedRightModal,
        title: this.inputParams.viewName
      },
      viewDefinitionName: this.inputParams.viewName,
      // The view input parameters, if any, would be passed in the IViewInputParams format, aka
      // viewParams: {
      //   "view input parameter 1":"value",
      //   "view input parameter 2":"value"
      // }
      // Here we assume that the view has two view input parameters
      // first name and last name.
      viewParams: {
        "first name":"John",
        "last name":"Wick"
      }
    };

    this.rxOpenViewActionService
      .execute(viewParameters)
      .pipe(
        // This code will be used if the view is closed by a button with an action "Close View"
        // with "act as cancel".
        catchError((error) => {
          this.viewResult = 'The view has been closed, with Cancel action.';

          return throwError(error);
        })
      ).subscribe((viewOutput) => {
      // viewOutput would contain the view output parameters with this format:
      // {
      //   "view output parameter 1":"value",
      //   "view output parameter 2":"value"
      // }
      // Here we assume that we have a view output parameter returning "full name":
      this.viewResult = 'The view has been closed and returned ' + get(viewOutput, 'full name') + '.';
    });
  }
}
