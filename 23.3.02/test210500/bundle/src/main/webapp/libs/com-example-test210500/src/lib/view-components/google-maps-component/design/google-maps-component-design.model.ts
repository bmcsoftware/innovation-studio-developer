import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IGoogleMapsComponentParameters } from './google-maps-component.interface';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IGoogleMapsComponentParameters = {
  apiKey: '',
  addressName: '',
  address: ''
};

export class GoogleMapsComponentDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IGoogleMapsComponentParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IGoogleMapsComponentParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // LMA:: TODO:: Why required does not add automatically a validation error.
  // LMA:: TODO:: Add validation since it's not automatic...
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'apiKey',
              component: TextFormControlComponent,
              required: true,
              options: {
                label: 'Google Maps Api Key'
              }
            },
            {
              name: 'addressName',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Address Name',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              name: 'address',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Address',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation.
  // The model contains the input parameter values.
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IGoogleMapsComponentParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.addressName) {
      validationIssues.push(sandbox.createError('The Address Name is required.', 'addressName'));
    }

    if (!model.address) {
      validationIssues.push(sandbox.createError('The Address id is required.', 'address'));
    }

    return validationIssues;
  }
}
