import { IViewActionDesignManager, RxViewActionRegistryService } from '@helix/platform/view/api';
import { IConfirmationOotbActionDesignProperties } from './confirmation-ootb-action.interface';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable, of } from 'rxjs';
import { IPlainObject } from '@helix/platform/shared/api';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmationOotbDesignManagerService implements IViewActionDesignManager<IConfirmationOotbActionDesignProperties> {
  constructor(private rxViewActionRegistryService: RxViewActionRegistryService) {
  }

  // This method will be called automatically to validate the input parameter values.
  validate(actionProperties: IConfirmationOotbActionDesignProperties, propertyName: string): Observable<IPlainObject[]> {
    return of(this.validateInputParameters(actionProperties, propertyName));
  }

  // Validating each input parameter.
  private validateInputParameters(
    actionsParams: IConfirmationOotbActionDesignProperties,
    issuePropertyName: string
  ): IViewComponentDesignValidationIssue[] {
    const actionDescriptor = this.rxViewActionRegistryService.get(actionsParams.name);
    const validationIssues: IViewComponentDesignValidationIssue[] = [];

    // The input parameters "title" and "message" are required.
    if (!actionsParams.title) {
      validationIssues.push({
        type: 'error',
        propertyName: issuePropertyName,
        description: `${actionDescriptor.label}: title is a required field.`
      });
    }

    if (!actionsParams.message) {
      validationIssues.push({
        type: 'error',
        propertyName: issuePropertyName,
        description: `${actionDescriptor.label}: message is a required field.`
      });
    }

    return validationIssues;
  }
}
