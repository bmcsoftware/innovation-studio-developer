import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { WizardDesignModel } from './wizard-design.model';
import { AdaptStepsComponent, StepsMenuItem } from '@bmc-ux/adapt-angular';
import { WIZARD_DESIGN_OPTIONS } from './wizard-design.types';
import { cloneDeep } from 'lodash';
import { CommonModule } from '@angular/common';
// Those modules are necessary since we use the Adapt Step component
// and use form controls (model).
import { FormsModule } from '@angular/forms';
import { AdaptStepsModule } from '@bmc-ux/adapt-angular';
// This module is required as we consume the Inspector StepEditorComponent
// which is a form control Component (Step Editor).
import { StepEditorModule } from '../../../inspectors/step-editor/step-editor.module';

@Component({
  selector: 'com-example-test210500-com-example-test210500-wizard-design',
  styleUrls: ['./wizard-design.scss'],
  templateUrl: './wizard-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, AdaptStepsModule, StepEditorModule]
})
export class WizardDesignComponent implements OnInit {
  @ViewChild('adaptStepObject')
  adaptStepObject: AdaptStepsComponent;

  @Input()
  model: WizardDesignModel;

  // Adapt Step component configuration.
  stepList: StepsMenuItem[] = [];
  isLoadingConfiguration = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // We subscribe to the steps defined in the step editor and we will update the Adapt step component
    // at design time accordingly.
    this.model.modelSandbox.getComponentPropertyValue('stepList').subscribe((stepList: StepsMenuItem[]) => {
      this.isLoadingConfiguration = true;
      // The cloneDeep is necessary to avoid an error where the step object cannot be
      // extended anymore.
      this.stepList = cloneDeep(stepList);

      // If no steps are defined yet we display dummy values.
      if (!this.stepList.length) {
        this.stepList = WIZARD_DESIGN_OPTIONS.defaultSteps;
      }

      // LMA:: TODO:: This is a workaround due to an adapt step component defect
      // where the steps are still collapsed.
      // We also need to set [readonly]="false" in the html.
      // We also need this when the step values are changed to redraw the step component.
        setTimeout(() => {
          this.isLoadingConfiguration = false;
          this.changeDetectorRef.detectChanges();
          // Selecting the first step in the step component.
          this.adaptStepObject.clickStep(0);
        });
    });
  }
}
