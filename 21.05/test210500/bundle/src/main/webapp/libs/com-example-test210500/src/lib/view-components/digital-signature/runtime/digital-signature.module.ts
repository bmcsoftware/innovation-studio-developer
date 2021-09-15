import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalSignatureComponent } from './digital-signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, SignaturePadModule, AdaptButtonModule],
  exports: [DigitalSignatureComponent],
  declarations: [DigitalSignatureComponent],
  entryComponents: [DigitalSignatureComponent]
})
export class DigitalSignatureModule {
}
