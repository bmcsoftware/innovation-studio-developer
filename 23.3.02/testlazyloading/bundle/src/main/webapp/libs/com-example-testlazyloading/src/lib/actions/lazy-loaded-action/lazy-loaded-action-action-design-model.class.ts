import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import {
  IViewActionDesignPropertyEditorConfig,
  IViewActionDesignSandbox,
  IViewActionOutputDataDictionary,
  ViewActionDesignEditableProperties
} from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { ExpressionFormControlComponent, IExpressionFormControlOptions } from '@helix/platform/shared/components';
import { ILazyLoadedActionActionDesignProperties } from './lazy-loaded-action-action-design.types';

export class LazyLoadedActionActionDesignModel extends RxViewDesignerActionModel {
  // This method is called when a new or an existing view action is initialized in the view designer.
  // It returns values for all input parameters of the view action.
  // [23.3.02] We use the new common interface ILazyLoadedActionActionProperties.
  static getInitialProperties(currentInputParams: ViewActionDesignEditableProperties<ILazyLoadedActionActionDesignProperties>) {
    return {
      message: '',
      ...currentInputParams
    };
  }

  // The constructor is setting the action properties (input parameters).
  constructor(protected injector: Injector,
              readonly sandbox: IViewActionDesignSandbox<ILazyLoadedActionActionDesignProperties>) {
    super(injector, sandbox);

    // Configure view action input parameter editor
    this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());

    // Add view action output parameters to the expression builder data dictionary.
    this.sandbox.setActionOutputDataDictionary(this.getActionOutputDataDictionary());
  }

  // Defining the input parameters properties.
  private getActionEditorConfig() : IViewActionDesignPropertyEditorConfig {
    return [
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

  private getActionOutputDataDictionary(): IViewActionOutputDataDictionary {
    // Add view action output parameters here.
    return [];
  }
}
