import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DigitalSignatureDesignComponent } from './digital-signature-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DigitalSignatureDesignComponent],
  entryComponents: [DigitalSignatureDesignComponent]
})
export class DigitalSignatureDesignModule {
}
