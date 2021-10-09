import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { DigitalSignatureComponent, DigitalSignatureModule } from './runtime';
import { DigitalSignatureDesignComponent, DigitalSignatureDesignModel, DigitalSignatureDesignModule } from './design';

// This example shows how to display a digital signature field, allowing
// an end user to sign with the mouse or finger on a tablet or phone for example.
// This example is leveraging several dependencies:
// https://www.npmjs.com/package/angular2-signaturepad
// npm install angular2-signaturepad --save
// Which leverages:
// https://www.npmjs.com/package/signature_pad
@NgModule({
  imports: [DigitalSignatureDesignModule, DigitalSignatureModule]
})
export class DigitalSignatureRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500DigitalSignature',
      name: 'Digital Signature',
      icon: 'left-note_pencil',
      group: 'Test 21.05.00',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(DigitalSignatureComponent),
      // There are no input parameters in this example. The output parameter will be declared in the
      // design model file.
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DigitalSignatureDesignComponent),
      designComponentModel: DigitalSignatureDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
