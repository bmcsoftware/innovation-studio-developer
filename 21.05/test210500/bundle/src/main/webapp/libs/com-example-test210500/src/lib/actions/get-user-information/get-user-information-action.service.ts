import { Injectable } from '@angular/core';
import { IViewActionService } from '@helix/platform/view/api';
import { IGetUserInformationActionProperties } from './get-user-information-action.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { IPlainObject, RxCurrentUserService } from '@helix/platform/shared/api';

@Injectable()
export class GetUserInformationActionService implements IViewActionService<IGetUserInformationActionProperties, never> {
  // Service that contains the current user information.
  constructor(private rxCurrentUserService: RxCurrentUserService) {
  }

  // Method executed at runtime automatically.
  // params will contain the different Input parameter values.
  // Here there are no input parameters.
  // This method must return an Observable.
  // In this example the Action returns the different user information.
  // These output parameters can get consumed by the next actions.
  execute(params: IGetUserInformationActionProperties): Observable<never> {
    // The output format must be of type IPlainObject and the value must
    // be an observable. For example:
    // {
    //   userName: of('amelie');
    // }
    const result: IPlainObject = {};

    result['userId'] = of(this.rxCurrentUserService.get().userId);
    result['userName'] = of(this.rxCurrentUserService.getName());
    result['userLoginName'] = of(this.rxCurrentUserService.get().loginName);
    result['userFullName'] = of(this.rxCurrentUserService.get().fullName);

    return forkJoin(result);
  }
}
