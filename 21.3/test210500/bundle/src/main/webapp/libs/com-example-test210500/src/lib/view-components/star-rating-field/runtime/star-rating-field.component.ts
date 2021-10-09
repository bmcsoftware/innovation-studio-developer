import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '@helix/platform/view/components';
import { NgModel } from '@angular/forms';
import { IStarRatingFieldRuntimeParameters } from '../design/star-rating-field.interface';
import { STAR_RATING_SIZE_OPTIONS} from '../../star-rating/star-rating.types';
import { takeUntil } from 'rxjs/operators';
import { isNull } from 'lodash';

@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating-field',
  templateUrl: './star-rating-field.component.html'
})
export class StarRatingFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent, OnInit, AfterViewInit {
  @ViewChild('starRatingFieldComponent', {read: NgModel})
  ngModel: NgModel;

  // Warning: the Interface is different from the design time one.
  starRatingFieldRuntimeParameters: IStarRatingFieldRuntimeParameters;

  // rx-rating Adapt component parameters.
  selectedSize = STAR_RATING_SIZE_OPTIONS.defaultSize;
  labelStyle = {};

  ngOnInit() {
    super.ngOnInit();
  }

  constructor(injector: Injector) {
    super(injector);
  }

  // Saving the value when the user selects stars.
  // this.setFieldValue() will save the value in the
  // record Instance, this method is inherited from BaseRecordEditorFieldComponent.
  onRateChange(value: number): void {
    if (isNull(value)) {
      this.setFieldValue(0);
    } else {
      this.setFieldValue(value);
    }
  }

  // This method is called automatically when the view component is loaded.
  // config will contain the values.
  onConfigInitialized(config: IStarRatingFieldRuntimeParameters): void {
    this.starRatingFieldRuntimeParameters = config;
    super.onConfigInitialized(config);

    // Setting the view component custom properties from (size and labelColor)
    // saved from the View Designer properties.
    this.selectedSize = config.size ? Number(config.size) : this.selectedSize;

    if (config.labelColor) {
      this.labelStyle = {
        color: config.labelColor
      };
    }
  }

  // This method is called automatically when the view component values
  // are updated, for example if the view component value depends from another
  // field (expression).
  onConfigUpdated(config: IStarRatingFieldRuntimeParameters) {
    super.onConfigUpdated(config);

    this.starRatingFieldRuntimeParameters = config;
  }

  ngAfterViewInit(): void {
    // The formControl object is inherited from BaseRecordEditorFieldComponent.
    // ngModel is mapped to field #starRatingFieldComponent that does not exist in Read state.
    if (!this.inReadState) {
      this.formControl.touched$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((touched) => {
          return touched? this.ngModel.control.markAsTouched() : this.ngModel.control.markAsUntouched();
        });
    }
  }
}
