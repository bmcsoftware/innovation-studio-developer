import { IViewActionDesignManager, RxViewActionRegistryService } from '@helix/platform/view/api';
import {
  IFruitAttributeDetail,
  IFruitDefinition,
  IFruitPickerActionDesignProperties
} from './fruit-picker-action.interface';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
import { Observable, of } from 'rxjs';
import { IPlainObject } from '@helix/platform/shared/api';
import { Injectable } from '@angular/core';
import { find, findIndex, forEach } from 'lodash';
import { FRUIT_PICKER_FRUIT_LIST_ACTION } from './fruit-picker-action.types';

@Injectable()
export class FooDesignManagerService implements IViewActionDesignManager<IFruitPickerActionDesignProperties> {
  constructor(private rxViewActionRegistryService: RxViewActionRegistryService) {
  }

  // This method will be called automatically to validate the input parameter values.
  validate(actionProperties: IFruitPickerActionDesignProperties, propertyName: string): Observable<IPlainObject[]> {
    return of(this.validateInputParameters(actionProperties, propertyName));
  }

  // Validating each input parameter.
  private validateInputParameters(
    actionsParams: IFruitPickerActionDesignProperties,
    issuePropertyName: string
  ): IViewComponentDesignValidationIssue[] {
    const actionDescriptor = this.rxViewActionRegistryService.get(actionsParams.name);
    const validationIssues: IViewComponentDesignValidationIssue[] = [];

    if (!actionsParams.fruit) {
      validationIssues.push({
        type: 'error',
        propertyName: issuePropertyName,
        description: `${actionDescriptor.label}: The fruit name is required.`
      });
    }

    // The attributes are stored as new input parameters on the format:
    // 'fruitAttributes.<dynamicParameterName>', for example:
    // 'fruitAttributes.color'
    // This means that in order to verify those values in the design-manager file we would need to test:
    // actionsParams['fruitAttributes.color']

    // We have to check in the fruit attribute list which of those attributes are required.
    // As not all fruits are declared in FRUIT_PICKER_FRUIT_LIST_ACTION if we do not find the fruit specific
    // configuration we get the default one.
    const fruitConfigurationIndex = findIndex(FRUIT_PICKER_FRUIT_LIST_ACTION, {name: actionsParams.fruit});

    const fruitAttributes: IFruitDefinition = fruitConfigurationIndex === -1 ?
      find(FRUIT_PICKER_FRUIT_LIST_ACTION, {name: 'default'}) :
      FRUIT_PICKER_FRUIT_LIST_ACTION[fruitConfigurationIndex];

    forEach(fruitAttributes.necessaryAttributes, (attribute: IFruitAttributeDetail) => {
      if (attribute.isRequired && !actionsParams[`fruitAttributes.${attribute.name}`]) {
        validationIssues.push({
          type: 'error',
          propertyName: issuePropertyName,
          description: `${actionDescriptor.label}: The attribute ${attribute.name} is required.`
        });
      }
    });

    return validationIssues;
  }
}
