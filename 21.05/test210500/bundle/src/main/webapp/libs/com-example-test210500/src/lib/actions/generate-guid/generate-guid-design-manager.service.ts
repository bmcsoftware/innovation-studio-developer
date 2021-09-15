import { IViewActionDesignManager, RxViewActionRegistryService } from '@helix/platform/view/api';
import { IGenerateGuidActionDesignProperties } from './generate-guid-action.interface';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable, of } from 'rxjs';
import { IPlainObject } from '@helix/platform/shared/api';
import { Injectable } from '@angular/core';

@Injectable()
export class GenerateGuidDesignManagerService implements IViewActionDesignManager<IGenerateGuidActionDesignProperties> {
  constructor(private rxViewActionRegistryService: RxViewActionRegistryService) {
  }

  // This method will be called automatically to validate the input parameter values.
  validate(actionProperties: IGenerateGuidActionDesignProperties, propertyName: string): Observable<IPlainObject[]> {
    return of(this.validateInputParameters(actionProperties, propertyName));
  }

  // We validate each input parameter.
  // LMA:: TODO:: It seems that if we do a check if an input parameter is required here
  // it is actually a duplicate check as already done.
  private validateInputParameters(
    actionsParams: IGenerateGuidActionDesignProperties,
    issuePropertyName: string
  ): IViewComponentDesignValidationIssue[] {
    const actionDescriptor = this.rxViewActionRegistryService.get(actionsParams.name);
    const validationIssues: IViewComponentDesignValidationIssue[] = [];
    // The prefix is a string so it can be embedded between double quotes for example.
    // We remove them to compare the value.
    const prefixCleanedValue = actionsParams.prefix ? actionsParams.prefix.replace(/[\"\']/g, '') : actionsParams.prefix;

    // Here for example we forbid the value 'foobar' for the prefix.
    if (prefixCleanedValue === 'foobar') {
      validationIssues.push({
        type: 'error',
        propertyName: issuePropertyName,
        description: `${actionDescriptor.label}: Sorry but foobar is a forbidden prefix.`
      });
    }

    return validationIssues;
  }
}
