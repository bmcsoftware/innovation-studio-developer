import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import {
  IViewActionDesignPropertyEditorConfig,
  IViewActionDesignSandbox,
  IViewActionOutputDataDictionary,
  ViewActionDesignEditableProperties
} from '@helix/platform/view/api';
import { IGenerateGuidActionDesignProperties } from './generate-guid-action.interface';
import { Injector } from '@angular/core';
import { ExpressionFormControlComponent, IExpressionFormControlOptions } from '@helix/platform/shared/components';
import { Tooltip } from '@helix/platform/shared/api';
import { distinctUntilChanged, pluck, skip } from 'rxjs/operators';

export class GenerateGuidActionDesignModel extends RxViewDesignerActionModel {
  // We need to use the Design properties that extends IViewActionDesignProperties.
  defaultProps: ViewActionDesignEditableProperties<IGenerateGuidActionDesignProperties> = {
    prefix: ''
  };

  // We need to use the Design properties that extends IViewActionDesignProperties.
  // This method will be called automatically and will display the default values
  // of the input properties or the current values already saved.
  static getInitialProperties(
    initialProperties: ViewActionDesignEditableProperties<IGenerateGuidActionDesignProperties>
  ) {
    return {
      prefix: '',
      ...initialProperties
    };
  }

  // We need to use the Design properties that extends IViewActionDesignProperties.
  // The constructor must set the action properties (input parameters)
  // and the list of the output parameters (data dictionary).
  constructor(protected injector: Injector,
              readonly sandbox: IViewActionDesignSandbox<IGenerateGuidActionDesignProperties>) {
    super(injector, sandbox);

    // We set the action Editor Configuration.
    this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());

    // Creating the data dictionary that contains the output parameter and
    // setting it.
    // Since we want to have a dynamic output parameter name containing the prefix,
    // we need to subscribe when the prefix value changes and adapt our output parameter
    // name accordingly, so we subscribe to our 'prefix' input parameter.
    const prefixParameter$ = this.sandbox.actionProperties$
      .pipe(
        pluck('prefix'),
        distinctUntilChanged()
      );

    // Updating the action properties. This can be used if we have several
    // input properties and we wish to reset some values.
    // In this use case it is not really useful.
    prefixParameter$.pipe(skip(1)).subscribe((prefix: string) => {
      this.sandbox.setActionProperties({
        prefix
      })
    });

    // Creating the output parameter.
    prefixParameter$.subscribe((prefix: string) => {
      this.sandbox.setActionOutputDataDictionary(this.getActionOutputDataDictionary(prefix));
    });
  }

  // We define the input properties.
  // The properties can be defined in the module properties but we have more control
  // in the design model.
  private getActionEditorConfig() : IViewActionDesignPropertyEditorConfig {
    return [
      {
        name: 'prefix',
        component: ExpressionFormControlComponent,
        options: {
          label: 'Prefix ("foobar" is forbidden!)',
          tooltip: new Tooltip('The generated Guid will begin by this prefix.'),
          isRequired: true,
          dataDictionary$: this.expressionConfigurator.getDataDictionary(),
          operators: this.expressionConfigurator.getOperators()
        } as IExpressionFormControlOptions
      }
    ];
  }

  // Creating the Data Dictionary, aka the output parameters.
  // In our case we want to return the guid but to have an example of a dynamic
  // output parameter (different name) we will append the output parameter
  // by the prefix. So for example if the prefix is 'case' we will change
  // the output parameter to 'guid-case'.
  // This is just an example, the output parameter could very well be named as
  // 'guid' only.
  private getActionOutputDataDictionary(prefix: string): IViewActionOutputDataDictionary{
    // The output format must be of type IViewActionOutputDataDictionary which is an array of IViewActionOutputDataDictionaryBranch
    // For example:
    // {
    //   label: 'outputParameterName',
    //   expression: this.getOutputExpressionForPropertyPath('outputParameterName'),
    // }
    const result: IViewActionOutputDataDictionary = [];
    const outputParameterName = 'guid' + this.cleanPrefix(prefix);

    result.push({
      label: outputParameterName,
      expression: this.getOutputExpressionForPropertyPath(outputParameterName)
    });

    return result;
  }

  // This is just an example so we just remove the double quotes.
  // If we have an expression (for example linked to a field value)
  // this could be kinda ugly...
  cleanPrefix(prefix: string): string {
    return prefix ? ' ' + prefix.replace(/\"/g, '') : '';
  }
}
