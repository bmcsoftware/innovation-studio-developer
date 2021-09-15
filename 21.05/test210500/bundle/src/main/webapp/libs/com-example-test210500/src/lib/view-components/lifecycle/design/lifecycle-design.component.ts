import { Component, Input } from '@angular/core';
import { LifecycleDesignModel } from './lifecycle-design.model';
import { LIFECYCLE_OPTIONS } from './lifecycle-design.types';

@Component({
  selector: 'com-example-test210500-com-example-test210500-lifecycle-design',
  templateUrl: './lifecycle-design.component.html'
})
export class LifecycleDesignComponent {
  @Input()
  model: LifecycleDesignModel;

  // Displaying some default values during design time.
  size = LIFECYCLE_OPTIONS.defaultSize;
  defaultSteps = LIFECYCLE_OPTIONS.defaultSteps;
  progress = LIFECYCLE_OPTIONS.defaultProgression;
}
