import { Injectable } from '@angular/core';
import { IViewActionService } from '@helix/platform/view/api';
import { IConfirmationActionProperties } from './confirmation-action.interface';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { AdaptModalService, ModalDialog } from '@bmc-ux/adapt-angular';
import { ConfirmationActionComponent } from './dialog-component/confirmation-action.component';
import { switchMap } from 'rxjs/operators';
import { RxViewAction } from '@helix/platform/view/api';

// the "any" type is necessary here due to the use of AdaptModalService.
// It needs to match the the Observable type in the execute() method.
@Injectable()
@RxViewAction({
  name: 'comExampleTest210500ActionConfirmation',
})
export class ConfirmationActionService implements IViewActionService<IConfirmationActionProperties, any> {
  constructor(private adaptModalService: AdaptModalService) {
  }

  // Method automatically executed at runtime.
  // inputParameters will contain the different Input parameter values.
  // This method must return an Observable, here of tye "any" due to the use
  // of AdaptModalService.
  execute(inputParameters: IConfirmationActionProperties): Observable<any> {
    // Opens an Adapt Modal Dialog window and waits for the user confirmation.
    const modalDialogConfig: ModalDialog = {
      isDialog: true,
      content: ConfirmationActionComponent,
      title: inputParameters.title,
      data: inputParameters.message
    };

    // AdaptModalService.open returns a promise, we need to return an Observable.
    return from(this.adaptModalService.open(modalDialogConfig)).pipe(
      switchMap((signature: string) => {
        if (signature) {
          return forkJoin({
            // Output parameter.
            signature: of(signature)
          });
        } else {
          // throwing an error will not be displayed in the UI but will
          // stop the action chain (following actions will not be executed).
          return throwError(null);
        }
      })
    );
  }
}
