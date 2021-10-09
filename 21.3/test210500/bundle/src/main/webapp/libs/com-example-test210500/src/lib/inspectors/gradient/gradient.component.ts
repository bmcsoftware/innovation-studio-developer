import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, Tooltip } from '@helix/platform/shared/api';
import { GRADIENT_COMPONENT_OPTIONS } from './gradient.types';
import { GradientService } from './gradient.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// This view component shows how to create a custom "inspector" to be used in
// an input parameter component property.
// Here we are trying to create a gradient.
// The value is stored as 'leftValue|rightValue', such as:
// '#000000|#FFFFFF
//
// Here this component leverages several Adapt components (adapt-rx-control-label, adapt-color-picker)
// which require the relevant Adapt modules to be imported (AdaptColorPickerModule, AdaptRxLabelModule).
// Since we use ngModel in the html we also have to import the module FormsModule.
// Those modules are imported in the fruit-picker-action.module.ts.
// This Component in itself is declared in the fruit-picker-action model.
@Component({
  selector: 'com-example-test210500-com-example-test210500-gradient',
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GradientComponent,
      multi: true
    },
    // We have to provide the GradientService else we will have an injector error
    // when using the GradientComponent as an Inspector.
    // This is because the Component is dynamically created using createComponent()
    // which seems to ignore the component module which contains the provider.
    // LMA:: TODO:: See form-widget.component.ts, resolveComponentFactory and createComponent.
    GradientService
  ]
})
export class GradientComponent extends ValueAccessor<string> implements IFormControlComponent, AfterViewInit {
  // We get the preview div to use it later to preview the gradient.
  @ViewChild('gradientDivElement', {static: false}) gradientDivElement: ElementRef;

  // This is required and contains the options defined in the design-model.ts input properties.
  // This way another input parameter could add values in this Component options.
  @Input()
  options: any;

  private gradientValue: string;

  tooltip: Tooltip;

  constructor(private gradientService: GradientService) {
    super();
  }

  // Accessor method called automatically when getting the value of "gradientLeftValue".
  // It is used by the Adapt Color picker displaying the left side of the gradient.
  // [(ngModel)]="gradientLeftValue"
  get gradientLeftValue(): string {
    return this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, this.gradientValue);
  }

  // Accessor method called automatically when setting the value of "gradientLeftValue".
  // It is done by the Adapt Color picker displaying the left side of the gradient.
  // [(ngModel)]="gradientLeftValue"
  set gradientLeftValue(leftSideGradientValue: string) {
    if (leftSideGradientValue !== this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, this.value)) {
      this.value = leftSideGradientValue + '|' + this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, this.value);
    }
  }

  // Accessor method called automatically when getting the value of "gradientRightValue".
  // It is used by the Adapt Color picker displaying the right side of the gradient.
  // [(ngModel)]="gradientRightValue"
  get gradientRightValue(): string {
    return this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, this.gradientValue);
  }

  // Accessor method called automatically when setting the value of "gradientRightValue".
  // It is done by the Adapt Color picker displaying the right side of the gradient.
  // [(ngModel)]="gradientRightValue"
  set gradientRightValue(rightSideGradientValue: string) {
    if (rightSideGradientValue !== this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, this.value)) {
      this.value = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, this.value) + '|' + rightSideGradientValue;
    }
  }

  // This method is called when the value is initialized or after set, for example when the component
  // is loaded / initialized or new values are set by the color pickers.
  // Here we have a gradient stored as two colors with a | as separator:
  // '#000000|#FFFFFF'
  // value is the value which stores the gradient in the configuration. It is set in the set accessors.
  onWriteValue(value: string) {
    this.gradientValue = value ? value : GRADIENT_COMPONENT_OPTIONS.defaultValues.left + '|' + GRADIENT_COMPONENT_OPTIONS.defaultValues.right;

    // Applying the gradient to the div sample.
    this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
  }

  ngAfterViewInit() {
    // Applying the gradient to the div sample.
    this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);

    // Creating the tooltip object, if necessary.
    if (this.options.tooltip) {
      setTimeout(() => {
        this.tooltip = {
          content: this.options.tooltip.content,
          popoverMode: this.options.tooltip.popoverMode,
          placement: this.options.tooltip.placement,
          iconName: this.options.tooltip.iconName
        };
      });
    }
  }
}
