import { IViewActionDesignManager } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ILazyLoadedActionActionDesignProperties } from './lazy-loaded-action-action-design.types';

@Injectable()
export class LazyLoadedActionActionDesignManagerService implements IViewActionDesignManager<ILazyLoadedActionActionDesignProperties> {

  // This method will be called automatically to validate view action input parameters.
  // [23.3.02] we Type the validate() method as:
  //    Observable<IViewComponentDesignValidationIssue[]>
  validate(actionProperties: ILazyLoadedActionActionDesignProperties, propertyName: string): Observable<IViewComponentDesignValidationIssue[]> {
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
