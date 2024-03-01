import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ITestDebugComponentParameters } from '../design/test-debug-component.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { GRADIENT_COMPONENT_OPTIONS } from '../../../inspectors/gradient/gradient.types';
import { GradientService } from '../../../inspectors/gradient/gradient.service';
import { takeUntil } from 'rxjs/operators';

// This View Component will just display the defined gradient and the different input parameters.
@Component({
  selector: 'com-example-test210500-com-example-test210500-test-debug-component',
  styleUrls: ['./test-debug-component.scss'],
  templateUrl: './test-debug-component.component.html'
})
export class TestDebugComponentComponent extends BaseViewComponent implements OnInit, IViewComponent, AfterViewInit {
  // We get the div to use it later to draw the gradient.
  @ViewChild('gradientDivElement', {static: false})
  gradientDivElement: ElementRef;

  guid: string;
  config: Observable<any>;
  testDebugComponent: string;
  tooltip = new Tooltip('Here are all the input parameters values as defined in View Designer.');

  // Input parameters.
  componentData: ITestDebugComponentParameters;
  componentDataString = '';

  private gradientLeftValue = GRADIENT_COMPONENT_OPTIONS.defaultValues.left;
  private gradientRightValue = GRADIENT_COMPONENT_OPTIONS.defaultValues.right;

  constructor(private gradientService: GradientService) {
    super();
  }

  ngOnInit() {
    // We subscribe to any input parameter change.
    this.config.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((config: ITestDebugComponentParameters) => {
      this.componentData = config;
      // Adapt code viewer requires a string.
      this.componentDataString = JSON.stringify(this.componentData, undefined, 2);

      // The gradient has the structure 'leftValue|rightValue', such as:
      // '#000000|#FFFFFF'
      this.gradientLeftValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, this.componentData.gradient);
      this.gradientRightValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, this.componentData.gradient);
      this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
    });
  }

  ngAfterViewInit(): void {
    // The gradient has the structure 'leftValue|rightValue', such as:
    // '#000000|#FFFFFF'
    this.gradientLeftValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, this.componentData.gradient);
    this.gradientRightValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, this.componentData.gradient);
    this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
  }
}
