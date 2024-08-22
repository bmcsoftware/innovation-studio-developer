import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IWizardParameters } from '../design/wizard-design.interface';
import { AdaptStepsComponent, StepsMenuItem } from '@bmc-ux/adapt-angular';
import { RxLogService } from '@helix/platform/shared/api';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { isEqual, isUndefined, isNull, isNumber, isNaN } from 'lodash';
import { CommonModule } from '@angular/common';
import { AdaptStepsModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-wizard',
  templateUrl: './wizard.component.html',
  standalone: true,
  imports: [CommonModule, AdaptStepsModule, FormsModule]
})
@RxViewComponent({
  name: 'comExampleTest210500Wizard'
})
export class WizardComponent extends BaseViewComponent implements OnInit, IViewComponent {
  @ViewChild('adaptStepObject')
  adaptStepObject: AdaptStepsComponent;

  guid: string;
  config: Observable<any>;
  wizard: string;
  componentData: IWizardParameters;

  protected stepListLoaded$: ReplaySubject<boolean> = new ReplaySubject(1);

  // Adapt Step component configuration.
  stepList: StepsMenuItem[] = [];
  isLoadingConfiguration = false;
  activeIndex = 0;

  // Overriding default apis.
  api = {
    setProperty: this.setProperty.bind(this)
  };

  constructor(private changeDetectorRef: ChangeDetectorRef, private rxLogService: RxLogService) {
    super();
  }

  ngOnInit() {
    // In the beginning we subscribe to the full configuration until we have the step list.
    // Then we will stop subscribing to the whole configuration object to only focus on one
    // input parameter (currentStep).
    this.config.pipe(
      distinctUntilChanged(isEqual),
      takeUntil(this.stepListLoaded$),
      takeUntil(this.destroyed$)
    ).subscribe((config: IWizardParameters) => {
      this.isLoadingConfiguration = true;
      this.componentData = config;

      // The step list are stored as a string even if defined as array of objects.
      this.stepList = this.componentData.stepList ? JSON.parse(String(this.componentData.stepList)) : [];
      this.activeIndex = this.setStep(this.componentData.currentStep);

      // LMA:: TODO:: This is a workaround due to an adapt step component defect
      // where the steps are still collapsed.
      // We also need to set [readonly]="false" in the html.
      // We also need this when the step values are changed to redraw the step component.
      setTimeout(() => {
        this.isLoadingConfiguration = false;
        this.changeDetectorRef.detectChanges();
        this.adaptStepObject.clickStep(this.activeIndex);
        this.notifyPropertyChanged('currentSelectedStep', this.activeIndex);

        // We stop the subscription of the full config object.
        this.stepListLoaded$.next(true);

        // We now only subscribe to the currentStep, we do not care about the stepList anymore.
        this.config.pipe(
          pluck('currentStep'),
          takeUntil(this.destroyed$),
          distinctUntilChanged()
        ).subscribe((step: string | number) => {
          this.activeIndex = this.setStep(step);
          this.adaptStepObject.clickStep(this.activeIndex);
          this.notifyPropertyChanged('currentSelectedStep', this.activeIndex);
        })
      });
    });

    // This method is used to broadcast a value to outside the view component, here we broadcast the
    // api changes we overrode.
    this.notifyPropertyChanged('api', this.api);
  }

  // Setting the step, it needs to be between 0 and the maximum amount of steps.
  setStep(currentStep: string | number): number {
    let step = 0;

    if (isUndefined(currentStep) || isNull(currentStep)) {
      return 0;
    }

    step = Number(currentStep);

    if (!isNumber(step) || isNaN(step)) {
      step = 0;
    } else {
      step = Math.min(Math.abs(step), this.stepList.length - 1);
    }

    return step;
  }

  // This method is triggered by a button "set property" action.
  setProperty(propertyPath: string, propertyValue: any): void {
    switch (propertyPath) {
      case 'currentStep': {
        this.activeIndex = Number(propertyValue);
        this.adaptStepObject.clickStep(this.activeIndex);
        this.notifyPropertyChanged('currentSelectedStep', this.activeIndex);
        break;
      }
      default: {
        this.rxLogService.warning(`Standalone Field: property ${propertyPath} is not settable, value was ${propertyValue}.`);
      }
    }
  }

  // Called by the Adapt component when the user clicks on a step.
  onActiveIndexChange(stepIndex: number): void {
    this.notifyPropertyChanged('currentSelectedStep', stepIndex);
  }
}
