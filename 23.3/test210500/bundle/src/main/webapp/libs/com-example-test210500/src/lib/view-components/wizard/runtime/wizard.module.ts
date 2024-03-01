import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { AdaptStepsModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AdaptStepsModule, FormsModule],
  exports: [WizardComponent],
  declarations: [WizardComponent],
  entryComponents: [WizardComponent]
})
export class WizardModule {
}
