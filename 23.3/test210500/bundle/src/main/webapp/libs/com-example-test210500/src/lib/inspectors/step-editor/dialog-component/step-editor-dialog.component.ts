import { AfterViewInit, Component, Optional } from '@angular/core';
import { ActiveModalRef, RxSelectionChangeEvent, StepsMenuItem} from '@bmc-ux/adapt-angular';
import { STEP_EDITOR_DIALOG_ACTION } from './step-editor-dialog.types';
import { StepEditorDialogService } from './step-editor-dialog.service';
import { map as _map, omit, pull, forEach, last } from 'lodash';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IStepEditorDialog } from './step-editor-dialog.interface';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'com-example-test210500-com-example-test210500-step-editor-component',
  styleUrls: ['./step-editor-dialog.component.scss'],
  templateUrl: './step-editor-dialog.component.html',
  // This is needed because this is part of an "inspector" (form control component)
  // which is dynamically loaded.
  providers: [StepEditorDialogService]
})
export class StepEditorDialogComponent implements AfterViewInit {
  // The title is automatically set.
  title: string;
  message: string;
  stepList: IStepEditorDialog[] = [];
  selectedIcon: any;
  iconList: string[] = [];
  isLoading = true;

  // This subject and observable are used to signal the Save button if data (steps) have been modified.
  private isDirty = new BehaviorSubject<boolean>(false);

  isSaveButtonDisabled$ = this.isDirty.asObservable().pipe(map((isDirty) => !isDirty));

  constructor(@Optional() public activeModalRef: ActiveModalRef,
              private stepEditorDialogService: StepEditorDialogService) {
    const selectedStep: IStepEditorDialog = (this.activeModalRef ? this.activeModalRef.getData().selectedStep : null) as IStepEditorDialog;
    const stepList = (this.activeModalRef ? this.activeModalRef.getData().stepList : []) as StepsMenuItem[];

    // We need to do this as the this.activeModalRef.getData().stepList objects cannot be extended.
    forEach(stepList, (step: StepsMenuItem, index: number) => {
      const stepDialog: IStepEditorDialog = {
        isOpen: false,
        shortIcon: '',
        ...step
      };

      // This is used when the user asked to edit a specific step.
      if (selectedStep && step === selectedStep) {
        stepDialog.isOpen = true;
      } else if (!selectedStep) {
        stepDialog.isOpen = index === 0;
      }

      stepDialog.shortIcon = stepDialog.icon ? last(stepDialog.icon.split(STEP_EDITOR_DIALOG_ACTION.adaptIconPrefix)) : '';
      this.stepList.push(stepDialog);
    });

    // Getting the Adapt icon list:
    this.iconList = this.stepEditorDialogService.getAllAvailableIcons() || [];
  }

  ngAfterViewInit(): void {
    // This is done to avoid an Angular error when running in development mode (valueChanged).
    setTimeout(() => {
      this.isLoading = false;
    });
  }

  // Passing back the steps to the step-editor component after
  // removing the unnecessary attributes.
  saveValues(): void {
    this.activeModalRef.close(_map(this.stepList, (step) => {
      return omit(step,['isOpen', 'shortIcon']);
    }));
  }

  cancel(): void {
    this.activeModalRef.dismiss(STEP_EDITOR_DIALOG_ACTION.cancelReasons.onClick);
  }

  // Selecting an icon from the adapt select field.
  // We do not use [(ngModel)] as the Adapt select field expect as
  // model value an array of the selected value, which makes it very
  // hard to use in ngFor loops.
  // So we trap when the value changes and we update the step value accordingly.
  onIconSelected($event: RxSelectionChangeEvent, index: number) {
    this.stepList[index].shortIcon = $event.options[0];
    this.stepList[index].icon = STEP_EDITOR_DIALOG_ACTION.adaptIconPrefix + this.stepList[index].shortIcon;
  }

  // Moving a Step up or down.
  moveStep(fromIndex: number, toIndex: number): void {
    moveItemInArray(this.stepList, fromIndex, toIndex);
    this.markAsDirty();
  }

  removeStep(testStep: IStepEditorDialog) {
    pull(this.stepList, testStep);
    this.markAsDirty();
  }

  // This is called when a Step is dropped using drag & drop.
  onSelectedStepListDrop($event: CdkDragDrop<any>) {
    this.moveStep($event.previousIndex, $event.currentIndex);
    this.markAsDirty();
  }

  // New step. We close all others and open the last one.
  // It is added at the end.
  addStep(): void {
    forEach(this.stepList, (step) => {
      step.isOpen = false;
    });

    this.stepList.push({
      // The default icon (None...) does not have any icon.
      icon: STEP_EDITOR_DIALOG_ACTION.adaptIconPrefix + STEP_EDITOR_DIALOG_ACTION.defaultIcon,
      shortIcon: STEP_EDITOR_DIALOG_ACTION.defaultIcon,
      label: 'New step',
      shortLabel: '',
      isOpen: true
    })

    this.markAsDirty();
  }

  // Marking the "form" as dirty, actually just signaling the save button
  // data have been modified.
  private markAsDirty(): void {
    this.isDirty.next(true);
  }

  // called by different () events to tell the icon, label or sub-label
  // have been modified.
  onValueChanged() {
    this.markAsDirty();
  }
}
