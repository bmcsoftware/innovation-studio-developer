import {
  ActionListWidgetComponent,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  RxViewActionValidatorService,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewActionDesignProperties, IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { IImageClickParameters } from './image-click.interface';
import { flatten } from 'lodash';

export class ImageClickDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
  // This validator is used to validate the actions.
  private viewActionValidatorService = this.injector.get(RxViewActionValidatorService);

  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Actions observable object. On modification, we will validate them.
    const actions$ = this.sandbox.getChildComponents<IViewActionDesignProperties>();

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig());

    // Registering the view component validations based on the input parameter values.
    // We have several set of validation:
    // -> Calling the validation for the actions,
    // -> Checking we have at least one action,
    // -> Checking the other input parameters validation,
    combineLatest([
      //Checking we have at least one action.
      actions$.pipe(map((actions) => {
        let validationIssues = [];

        if (!actions || actions.length === 0) {
          validationIssues.push(sandbox.createError('Please add at least one action.', 'actions'));
        }

        return validationIssues;
      })),
      // Calling the OOTB action validation that will check every action own validation process,
      // for example are the required properties of one action set, etc...
      actions$.pipe(switchMap((actions) => {
        return this.viewActionValidatorService.validate(actions, 'actions');
      })),
      // Checking the other input parameters validation, here the title view component input.
      this.sandbox.componentProperties$.pipe(
        map((componentProperties) => {
          return this.validate(this.sandbox, componentProperties as IImageClickParameters);
        })
      )
    ])
      .pipe(map(flatten), takeUntil(this.sandbox.destroyed$))
      .subscribe((validationIssues) => {
        // All the different validations will be "merged" into one set of validation.
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Method called automatically that sets the view component input parameters
  // default values and / or current values.
  static getInitialProperties(initialProperties?: IImageClickParameters): IImageClickParameters {
    return {
      title: '',
      actions: [],
      // Will contain the current values.
      ...initialProperties
    }
  }

  // Setting the View Component input parameters.
  private setInspectorConfig() {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'title',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Title',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            }
          ]
        },
        {
          label: 'Actions',
          // Leveraging OOTB Platform Actions control.
          controls: [
            {
              widgetName: 'actions',
              component: ActionListWidgetComponent
            }
          ]
        }
      ]
    };
  }

  // This validation is only testing the other View Component input parameters, not the actions.
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IImageClickParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.title) {
      validationIssues.push(sandbox.createError('Please enter the image title.', 'title'));
    }

    return validationIssues;
  }
}
