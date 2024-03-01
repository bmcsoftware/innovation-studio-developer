import { Injectable } from '@angular/core';
import { IViewActionService } from '@helix/platform/view/api';
import { IConfirmationOotbActionProperties } from './confirmation-ootb-action.interface';
import { EMPTY, from, Observable, throwError } from 'rxjs';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ConfirmationOotbActionService implements IViewActionService<IConfirmationOotbActionProperties, any> {
  constructor(private rxModalService: RxModalService) {
  }

  // Method automatically executed at runtime.
  // inputParameters will contain the different Input parameter values.
  // This method must return an Observable, here of tye "any" due to the use
  // of rxModalService.confirm.
  execute(inputParameters: IConfirmationOotbActionProperties): Observable<any> {
    // rxModalService.confirm is a promise, returning a boolean.
    return from(this.rxModalService.confirm({
      title: inputParameters.title,
      modalStyle: RX_MODAL.modalStyles.warning,
      message: inputParameters.message
    })).pipe(
      // We need to trap the result of the confirmation window and:
      // -> Return an EMPTY observable in case of confirmation,
      // -> Throw an error if not,
      // Throwing an error will cancel the next actions but will not display an error in the UI.
      switchMap((result: boolean) => {
        if (result) {
          return EMPTY;
        } else {
          return throwError(null);
        }
      })
    );
  }
}
