import { IViewActionDesignManager } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable, of } from 'rxjs';
import { IPlainObject } from '@helix/platform/shared/api';
import { Injectable } from '@angular/core';
import { ILazyLoadedActionActionDesignProperties } from './lazy-loaded-action-action.interface';

@Injectable()
export class LazyLoadedActionActionDesignManagerService implements IViewActionDesignManager<ILazyLoadedActionActionDesignProperties> {

  // This method will be called automatically to validate the input parameter values.
  validate(actionProperties: ILazyLoadedActionActionDesignProperties, propertyName: string): Observable<IPlainObject[]> {
    return of(this.validateInputParameters(actionProperties, propertyName));
  }

  // Custom validation : Validating each input parameter.
  private validateInputParameters(
    actionsParams: ILazyLoadedActionActionDesignProperties,
    issuePropertyName: string
  ): IViewComponentDesignValidationIssue[] {
  return [];
  }
}
