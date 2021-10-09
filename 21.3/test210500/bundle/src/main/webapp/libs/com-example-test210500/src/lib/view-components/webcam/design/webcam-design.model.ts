import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IWebcamParameters } from './webcam.interface';

export class WebcamDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IWebcamParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // This view component does not have any input parameters.
    sandbox.updateInspectorConfig(null);

    // Registering the output parameter.
    this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(this.sandbox.descriptor.name));
  }

  // Preparing the output parameter which will contain the captured picture in base64 format.
  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'Picture (base64)',
          expression: this.getExpressionForProperty('pictureBase64')
        }
      ]
    }
  }
}
