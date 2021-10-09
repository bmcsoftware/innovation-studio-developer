import { Component, Input } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { without } from 'lodash';
import { AdaptModalService, ModalDialog, StepsMenuItem } from '@bmc-ux/adapt-angular';
import { StepEditorDialogComponent } from './dialog-component/step-editor-dialog.component';

// This view component shows how to create a custom "inspector" to be used in
// an input parameter component property, here the Wizard component.
// Here we are trying to create a step editor.
// The value are stored as an array of Steps.
//
// This component leverages several Adapt components.
// If you wish to leverage this Component in a view component or Action design model do not
// forget to import its module in the view component or action design module.
@Component({
  selector: 'com-example-test210500-com-example-test210500-stepEditor',
  templateUrl: './step-editor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StepEditorComponent,
      multi: true
    }
  ]
})
export class StepEditorComponent extends ValueAccessor<StepsMenuItem[]> implements IFormControlComponent, IFormFocusable {
  // This is required and contains the options defined in the design-model.ts input properties.
  // This way another input parameter could add values in this Component options.
  @Input()
  options: any;

  numberOfSteps = 0;
  stepList: StepsMenuItem[] = [];

  constructor(private adaptModalService: AdaptModalService) {
    super();
  }

  onWriteValue(value: StepsMenuItem[]) {
    // We expect an array of StepsMenuItem objects.
    this.stepList = value;
  }

  openStepEditor(selectedStep?: StepsMenuItem): void {
    // Opening an Adapt Modal Dialog window to edit / add / remove steps.
    const modalDialogConfig: ModalDialog = {
      isDialog: true,
      // Display a backdrop.
      hideBackdrop: false,
      // Allows to dismiss the dialog window using the Escape key.
      blockKeyboard: false,
      content: StepEditorDialogComponent,
      title: 'Wizard step editor',
      data: {
        selectedStep,
        stepList: this.stepList
      }
    };

    // AdaptModalService.open is a promise, returning it as an Observable.
    this.adaptModalService.open(modalDialogConfig).then((stepConfiguration) => {
      this.stepList = stepConfiguration;
      this.value = stepConfiguration;
    }).catch(() => {
      // Cancel.
    });
  }

  focus(data?: {actionIndex: number}): void {
    if (data?.actionIndex >= 0) {
      this.openStepEditor(this.stepList[data.actionIndex]);
    } else {
      this.openStepEditor();
    }
  }

  editStep(step: StepsMenuItem) {
    this.openStepEditor(step);
  }

  removeStep(step: StepsMenuItem) {
    this.value = without(this.value, step);
  }
}
