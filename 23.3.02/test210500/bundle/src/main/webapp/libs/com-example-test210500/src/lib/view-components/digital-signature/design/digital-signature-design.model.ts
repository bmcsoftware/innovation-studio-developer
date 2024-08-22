import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IDigitalSignatureParameters } from './digital-signature.interface';

const initialComponentProperties: IDigitalSignatureParameters = {};

export class DigitalSignatureDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IDigitalSignatureParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the output parameter.
    this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(this.sandbox.descriptor.name));
  }

  // There are no input parameters in this example.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: []
    };
  }

  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'Signature (base 64)',
          expression: this.getExpressionForProperty('signature')
        }
      ]
    }
  }
}
