import { Component, Input } from '@angular/core';
import { LifecycleDesignModel } from './lifecycle-design.model';
import { LIFECYCLE_OPTIONS } from './lifecycle-design.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptWorkFlowModule } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-lifecycle-design',
  templateUrl: './lifecycle-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, AdaptWorkFlowModule]
})
export class LifecycleDesignComponent {
  @Input()
  model: LifecycleDesignModel;

  // Displaying some default values during design time.
  size = LIFECYCLE_OPTIONS.defaultSize;
  defaultSteps = LIFECYCLE_OPTIONS.defaultSteps;
  progress = LIFECYCLE_OPTIONS.defaultProgression;
}
