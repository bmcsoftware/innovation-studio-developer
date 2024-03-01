import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { DigitalSignatureComponent } from './runtime';
import { DigitalSignatureDesignComponent, DigitalSignatureDesignModel } from './design';

// This example shows how to display a digital signature field, allowing
// an end user to sign with the mouse or finger on a tablet or phone for example.
// This example is leveraging several dependencies:
// https://www.npmjs.com/package/angular2-signaturepad
// npm install angular2-signaturepad --save
// Which leverages:
// https://www.npmjs.com/package/signature_pad
@NgModule()
export class DigitalSignatureRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500DigitalSignature',
      name: 'Digital Signature',
      icon: 'left-note_pencil',
      group: 'Test 21.05.00',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      component: DigitalSignatureComponent,
      // There are no input parameters in this example. The output parameter will be declared in the
      // design model file.
      properties: [],
      designComponent: DigitalSignatureDesignComponent,
      designComponentModel: DigitalSignatureDesignModel
    });
  }
}
