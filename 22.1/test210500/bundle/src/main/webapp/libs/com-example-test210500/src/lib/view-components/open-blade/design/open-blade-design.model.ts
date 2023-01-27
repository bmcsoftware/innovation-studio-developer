import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  IDefinitionPickerComponentOptions,
  RxDefinitionPickerComponent,
  RxDefinitionPickerType
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOpenBladeParameters } from './open-blade.interface';

// View component input parameters.
const initialComponentProperties: IOpenBladeParameters = {
  viewName: ''
};

export class OpenBladeDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Setting view component input parameters configuration.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the view component validation based on the input parameter values.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [IOpenBladeParameters]) =>
          this.validate(this.sandbox, componentProperties)
        )
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: IOpenBladeParameters): IOpenBladeParameters {
    return {
      viewName: '',
      ...initialProperties
    }
  }

  private setInspectorConfig(model : IOpenBladeParameters) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'viewName',
              // A view picker will be displayed to select a view from the existing views.
              component: RxDefinitionPickerComponent,
              options: {
                label: 'View Name',
                tooltip: new Tooltip('Innovation Studio View Name to be opened in the blade.'),
                definitionType: RxDefinitionPickerType.View,
                required: true
              } as IDefinitionPickerComponentOptions
            }
          ]
        }
      ]
    };
  }

  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IOpenBladeParameters
  ): IViewComponentDesignValidationIssue[] {
    const validationIssues = [];

    if (!model.viewName) {
      validationIssues.push(sandbox.createError('View name cannot be blank.', 'viewName'));
    }

    return validationIssues;
  }
}
