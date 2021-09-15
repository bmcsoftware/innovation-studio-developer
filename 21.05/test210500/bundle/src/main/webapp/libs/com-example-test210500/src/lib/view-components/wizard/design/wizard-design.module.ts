import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardDesignComponent } from './wizard-design.component';
// Those modules are necessary since we use the Adapt Step component
// and use form controls (model).
import { FormsModule } from '@angular/forms';
import { AdaptStepsModule } from '@bmc-ux/adapt-angular';
// This module is required as we consume the Inspector StepEditorComponent
// which is a form control Component (Step Editor).
import { StepEditorModule } from '../../../inspectors/step-editor/step-editor.module';

@NgModule({
  imports: [CommonModule, FormsModule, AdaptStepsModule, StepEditorModule],
  declarations: [WizardDesignComponent],
  entryComponents: [WizardDesignComponent]
})
export class WizardDesignModule {
}
