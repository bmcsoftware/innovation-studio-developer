import { AfterViewInit, Component, Input } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, Tooltip } from '@helix/platform/shared/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// Here this component leverages several Adapt components (adapt-rx-control-label, adapt-slider)
// which require the relevant Adapt modules to be imported (AdaptSliderModule, AdaptRxLabelModule).
// Since we use ngModel in the html we also have to import the module FormsModule.
// Those modules are imported where they are used (for example in a view component module.ts).
// This Component in itself is declared in the view component design model ts file for example.
@Component({
  selector: 'com-example-test210500-com-example-test210500-slider',
  templateUrl: './slider.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SliderComponent,
      multi: true
    }
  ]
})
export class SliderComponent extends ValueAccessor<string> implements IFormControlComponent, AfterViewInit {
  // This is required and contains the options defined in the design-model.ts input properties.
  // This way another input parameter could add values in this Component options.
  @Input()
  options: any;

  tooltip: Tooltip;
  minValue = 0;
  maxValue = 100;

  // We do not need to implement any accessor here, the slider value is directly linked to this.value:
  // [(ngModel)]="value"

  ngAfterViewInit() {
    // Creating the tooltip object, if necessary.
    if (this.options.tooltip) {
      setTimeout(() => {
        this.tooltip = {
          content: this.options.tooltip.content,
          popoverMode: this.options.tooltip.popoverMode,
          placement: this.options.tooltip.placement,
          iconName: this.options.tooltip.iconName,
          maxWidth: 300
        };
      });
    }
  }
}
