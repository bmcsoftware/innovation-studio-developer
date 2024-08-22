import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IDefinitionPickerComponentOptions,
  IExpressionFormControlOptions,
  RxDefinitionPickerComponent,
  RxDefinitionPickerType
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IFloatingPanelParameters } from './floating-panel.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IFloatingPanelParameters = {
  viewName: '',
  panelTitle: '',
  panelIdentifier: ''
};

export class FloatingPanelDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IFloatingPanelParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IFloatingPanelParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            // To select a view we use RxDefinitionPickerComponent which allows to leverage the OOTB definition
            // pickers.
            // In the options the definition type can be set, use IntelliSense to see the available values (RxDefinitionPickerType).
            // export declare enum RxDefinitionPickerType {
            //   View = "view",
            //   Record = "record",
            //   DataRecord = "dataRecord",
            //   RegularRecord = "regularRecord",
            //   RegularDataRecord = "regularDataRecord",
            //   PublicRegularDataRecord = "publicRegularDataRecord",
            //   InheritableRecord = "inheritableRecord",
            //   NamedList = "namedList",
            //   Association = "association",
            //   Process = "process",
            //   Chatbot = "chatbot"
            // }
            {
              name: 'viewName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'View Name',
                tooltip: new Tooltip('Innovation Studio View Name to be displayed in the floating panel.'),
                definitionType: RxDefinitionPickerType.View,
                required: true
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'panelTitle',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Panel title',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            // We will create the panel only if it does not exist already with the id set in panelIdentifier.
            // If there is no panelIdentifier set then the same panel could be created several time when you
            // navigate away from the view with the view component and come back to the same view.
            // This might be an expected behavior though so the option is left opened.
            {
              name: 'panelIdentifier',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Panel Identifier.',
                tooltip: new Tooltip('If a panel already exists with this Id it will not recreated.'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators()
              } as IExpressionFormControlOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation. The "model" contains the stepList (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IFloatingPanelParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.viewName) {
      validationIssues.push(sandbox.createError('The view is required.', 'viewName'));
    }

    if (!model.panelTitle) {
      validationIssues.push(sandbox.createError('The panel title is required.', 'panelTitle'));
    }

    if (!model.panelIdentifier) {
      validationIssues.push(sandbox.createWarning('It is recommended to set a panel identifier to avoid creating multiple panels with the same view.', 'panelIdentifier'));
    }

    return validationIssues;
  }
}
