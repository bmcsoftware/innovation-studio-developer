import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import {
  IViewActionDesignPropertyEditorConfig,
  IViewActionDesignSandbox, IViewActionOutputDataDictionary,
  ViewActionDesignEditableProperties
} from '@helix/platform/view/api';
import { IGetUserInformationActionDesignProperties } from './get-user-information-action.interface';
import { Injector } from '@angular/core';

export class GetUserInformationActionDesignModel extends RxViewDesignerActionModel {
  // We need to use the Design properties that extends IViewActionDesignProperties.
  // In our case we do not have any input properties.
  defaultProps: ViewActionDesignEditableProperties<IGetUserInformationActionDesignProperties> = {};

  // We need to use the Design properties that extends IViewActionDesignProperties.
  // This method will be called automatically.
  // In our case we do not have any input properties to add to the initial properties.
  static getInitialProperties(
    initialProperties: ViewActionDesignEditableProperties<IGetUserInformationActionDesignProperties>
  ) {
    return initialProperties;
  }

  // We need to use the Design properties that extends IViewActionDesignProperties.
  // The constructor must set the action properties (input parameters)
  // and the list of the output parameters (data dictionary).
  constructor(protected injector: Injector,
              readonly sandbox: IViewActionDesignSandbox<IGetUserInformationActionDesignProperties>) {
    super(injector, sandbox);

    // We set the action Editor Configuration, in this case it is very simple as
    // there are no input parameters.
    this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());

    // Creating the data dictionary that contains the output parameters and
    // setting it.
    this.sandbox.setActionOutputDataDictionary(this.getActionOutputDataDictionary());
  }

  // As there is no input parameters the design configuration is very simple.
  private getActionEditorConfig(): IViewActionDesignPropertyEditorConfig {
    return [];
  }

  // Creating the Data Dictionary, aka the output parameters.
  // In our case we want to return several user information.
  private getActionOutputDataDictionary(): IViewActionOutputDataDictionary {
    // The output format must be of type IViewActionOutputDataDictionary which is an array of IViewActionOutputDataDictionaryBranch
    // For example:
    // {
    //   label: 'outputParameterName',
    //   expression: this.getOutputExpressionForPropertyPath('outputParameterName'),
    // }
    const result: IViewActionOutputDataDictionary = [];

    result.push({
      label: 'userId',
      expression: this.getOutputExpressionForPropertyPath('userId')
    });

    result.push({
      label: 'userName',
      expression: this.getOutputExpressionForPropertyPath('userName')
    });

    result.push({
      label: 'userLoginName',
      expression: this.getOutputExpressionForPropertyPath('userLoginName')
    });

    result.push({
      label: 'userFullName',
      expression: this.getOutputExpressionForPropertyPath('userFullName')
    });

    return result;
  }
}
