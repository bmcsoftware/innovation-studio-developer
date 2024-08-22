import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import {
  IViewActionDesignPropertyEditorConfig,
  IViewActionDesignSandbox,
  ViewActionDesignEditableProperties
} from '@helix/platform/view/api';
import { IConfirmationOotbActionDesignProperties } from './confirmation-ootb-action.interface';
import { Injector } from '@angular/core';
import { ExpressionFormControlComponent, IExpressionFormControlOptions } from '@helix/platform/shared/components';

export class ConfirmationOotbActionDesignModel extends RxViewDesignerActionModel {
  // This method will be called automatically and will set the default values
  // of the input parameters or their current values.
  static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<IConfirmationOotbActionDesignProperties>) {
    return {
      title: '',
      message: '',
      ...initialProperties
    };
  }

  // The constructor is setting the action properties (input parameters).
  constructor(protected injector: Injector,
              readonly sandbox: IViewActionDesignSandbox<IConfirmationOotbActionDesignProperties>) {
    super(injector, sandbox);

    // Setting the input parameters properties.
    this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
  }

  // Defining the input parameters properties.
  private getActionEditorConfig() : IViewActionDesignPropertyEditorConfig {
    return [
      {
        name: 'title',
        component: ExpressionFormControlComponent,
        options: {
          label: 'Title',
          isRequired: true,
          dataDictionary$: this.expressionConfigurator.getDataDictionary(),
          operators: this.expressionConfigurator.getOperators()
        } as IExpressionFormControlOptions
      },
      {
        name: 'message',
        component: ExpressionFormControlComponent,
        options: {
          label: 'Message',
          isRequired: true,
          dataDictionary$: this.expressionConfigurator.getDataDictionary(),
          operators: this.expressionConfigurator.getOperators()
        } as IExpressionFormControlOptions
      }
    ];
  }
}
