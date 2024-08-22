import { Injectable } from '@angular/core';
import { IViewActionService } from '@helix/platform/view/api';
import { IGenerateGuidActionProperties } from './generate-guid-action.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { IPlainObject } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { RxViewAction } from '@helix/platform/view/api';

@Injectable()
@RxViewAction({
  name: 'comExampleTest210500SActionGenerateGuid',
})
export class GenerateGuidActionService implements IViewActionService<IGenerateGuidActionProperties, never> {
  // Service that contains the Guid service.
  constructor(private rxGuidService: RxGuidService) {
  }

  // Method executed at runtime automatically.
  // params will contain the Input parameter value.
  // This method must return an Observable.
  // In this example the Action returns a Guid.
  // The output parameter can get consumed by the next actions.
  execute(params: IGenerateGuidActionProperties): Observable<never> {
    // The output format must be of type IPlainObject and the value must
    // be an observable. For example if the prefix is "case" we want to
    // return a dynamic output parameter "guid-case".
    // {
    //   'guid-case': of('case-123-456-789');
    // }
    const result: IPlainObject = {};
    const guidKey = 'guid' + this.cleanPrefix(params.prefix);

    result[guidKey] = of(this.rxGuidService.generate(params.prefix));

    return forkJoin(result);
  }

  // This is just an example so we just remove the double quotes.
  // If we have an expression (for example linked to a field value)
  // this could be kinda ugly...
  cleanPrefix(prefix: string): string {
    return prefix ? ' ' + prefix.replace(/\"/g, '') : '';
  }
}
