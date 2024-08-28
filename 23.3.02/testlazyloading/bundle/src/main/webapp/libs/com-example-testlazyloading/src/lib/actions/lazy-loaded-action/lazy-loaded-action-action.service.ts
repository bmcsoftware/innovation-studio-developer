import { Injectable } from '@angular/core';
import { IViewActionService, RxViewAction } from '@helix/platform/view/api';
import { EMPTY, from, Observable, throwError } from 'rxjs';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { switchMap } from 'rxjs/operators';
import { ILazyLoadedActionActionProperties } from './lazy-loaded-action-action.types';

@Injectable()
@RxViewAction({
  name: 'comExampleTestlazyloadingLazyLoadedAction'
})
// [23.3.02] changing the type from:
//    IViewActionService<ILazyLoadedActionActionProperties, any>
// to:
//    IViewActionService<ILazyLoadedActionActionProperties, never>
export class LazyLoadedActionActionService implements IViewActionService<ILazyLoadedActionActionProperties, never> {
  constructor(private rxModalService: RxModalService) {}

  // Method automatically executed at runtime.
  // inputParameters will contain the different Input parameter values.
  // This method must return an Observable, here of tye "any" due to the use
  // of rxModalService.confirm.
  // [23.3.02] changing the type from:
  //    IViewActionService<ILazyLoadedActionActionProperties, any>
  // to:
  //    IViewActionService<ILazyLoadedActionActionProperties, never>
  execute(inputParameters: ILazyLoadedActionActionProperties): Observable<never> {
    // rxModalService.confirm is a promise, returning a boolean.
    return from(this.rxModalService.confirm({
      title: 'default',
      modalStyle: RX_MODAL.modalStyles.warning,
      message: inputParameters.message
    })).pipe(
      // We need to trap the result of the confirmation window and return an EMPTY observable in case
      // of confirmation or throw an error if not.
      // Throwing an error will cancel the next actions.
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
