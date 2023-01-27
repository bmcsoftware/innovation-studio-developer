import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IAdaptWorkflowStep, ILifecycleParameters, ISelectionOptions } from '../design/lifecycle.interface';
import { LIFECYCLE_OPTIONS } from '../design/lifecycle-design.types';
import { distinctUntilChanged, map, pluck, take, takeUntil } from 'rxjs/operators';
import { IFieldDefinition, IRecordDefinition, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { find, findIndex, forEach } from 'lodash';
import { AdaptProgressModel, AdaptProgressType } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-lifecycle',
  templateUrl: './lifecycle.component.html'
})
export class LifecycleComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  lifecycle: string;

  private componentData: ILifecycleParameters;

  size = LIFECYCLE_OPTIONS.defaultSize;
  workflowSteps: IAdaptWorkflowStep[] = [];
  workflowProgress: AdaptProgressModel[] = [];
  isConfigurationInProgress = true;
  activeIndex = 0;

  private selectionFields: ISelectionOptions[] = [];

  constructor(private rxRecordDefinitionCacheService: RxRecordDefinitionCacheService) {
    super();
  }

  ngOnInit() {
    // We want to get the full configuration only once to draw the Adapt lifecycle component.
    this.config.pipe(
      take(1)
    ).subscribe((config: ILifecycleParameters) => {
      this.componentData = config;
      this.isConfigurationInProgress = true;

      // Getting the field selection labels and values for the Adapt component.
      this.buildWorkflowSteps(this.componentData.recordDefinitionName, this.componentData.selectionFieldId).subscribe((selectionFields: ISelectionOptions[]) => {
        this.selectionFields = selectionFields;

        // Building the Adapt element necessary for the step names and the progress bar.
        forEach(selectionFields, (selectionOption: ISelectionOptions) => {
          // Steps (label)
          this.workflowSteps.push({
            label: selectionOption.name,
            icon: '',
            variant: ''
          });

          // Progress bar.
          this.workflowProgress.push({
            type: AdaptProgressType.success,
            value: 0
          });
        });

        this.isConfigurationInProgress = false;
        this.selectStep(Number(this.componentData.selectionValue));
      })
    });

    // Subscribing to selection value changes.
    this.config.pipe(
      pluck('selectionValue'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((selectionValue: string) => {
      this.selectStep(Number(selectionValue));
    });
  }

  // We try to find the selection value in the list of the allowed statuses.
  // If we do find it, we set the current and previous steps as "success" and
  // the next ones as "warning".
  // Note:
  // If a selection value is not found nothing happens. One enhancement could be to find the closest
  // selection value but this is out of scope in this example.
  private selectStep(selectionValue: number): void {
    if (selectionValue >= 0) {
      const currentSelectionValueIndex = findIndex(this.selectionFields, {id: String(selectionValue)});

      if (currentSelectionValueIndex !== -1) {
        // Setting the progress bar.
        for (let index = 0; index < this.selectionFields.length; index++) {
          if (index < currentSelectionValueIndex) {
            this.workflowProgress[index].value = 100;
            this.workflowProgress[index].completed = true;
          } else {
            this.workflowProgress[index].value = 0;
            this.workflowProgress[index].completed = false;
          }

          // Setting the label styles and icons.
          if (index <= currentSelectionValueIndex) {
            this.workflowSteps[index].icon = 'check_circle';
            this.workflowSteps[index].variant = 'success';
          } else {
            this.workflowSteps[index].icon = 'exclamation_circle';
            this.workflowSteps[index].variant = '';
          }

          this.activeIndex = currentSelectionValueIndex;
        }
      }
    }
  }

  // Getting the different selection values for the given selection field.
  private buildWorkflowSteps(recordDefinitionName: string, selectionFieldId: string): Observable<ISelectionOptions[]> {
    return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName).pipe(
      map((recordDefinition: IRecordDefinition) => {
        const selectionFields: ISelectionOptions[] = [];
        const selectionField: IFieldDefinition = find(recordDefinition.fieldDefinitions, {id: Number(selectionFieldId)});

        // We only display the fields that the Business Analyst chose in View Designer.
        forEach(selectionField.optionNamesById, (label: string, key: string) => {
          if (this.componentData.statusList[Number(key)] === 'true') {
            selectionFields.push({
              id: key,
              name: label
            });
          }
        });

        return selectionFields;
      })
    );
  }
}
