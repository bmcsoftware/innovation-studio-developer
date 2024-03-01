import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IQrCodeScannerParameters } from './qr-code-scanner.interface';

export class QrCodeScannerDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IQrCodeScannerParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // This view component does not have any input parameters.
    sandbox.updateInspectorConfig(null);

    // Registering the output parameter.
    this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(this.sandbox.descriptor.name));
  }

  // Preparing the output parameter which will contain the scanner QR code value.
  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'QR code',
          expression: this.getExpressionForProperty('qrCode')
        }
      ]
    }
  }
}
