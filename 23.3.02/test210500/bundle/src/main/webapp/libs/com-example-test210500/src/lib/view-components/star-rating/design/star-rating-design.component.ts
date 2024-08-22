import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { StarRatingDesignModel } from './star-rating-design.model';
import { IStarRatingParameters } from './star-rating.interface';
import { combineLatest } from 'rxjs';
import { STAR_RATING_SIZE_OPTIONS } from '../star-rating.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Necessary since we are displaying the rx-rating component at design time.
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating-design',
  templateUrl: './star-rating-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, AdaptRxRatingModule]
})
export class StarRatingDesignComponent implements OnInit {
  @Input()
  model: StarRatingDesignModel;

  // Component Input Parameters.
  starRatingParameters: IStarRatingParameters;

  // rx-rating Adapt component parameters.
  selectedSize = STAR_RATING_SIZE_OPTIONS.defaultSize;
  isReadonly = false;
  labelStyle = {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // We subscribe to the component input parameters to receive their values when modified
    // in the inspectors so we can update the view component layout (number of stars).
    combineLatest([this.model.modelSandbox.componentProperties$])
      .subscribe(([componentProperties]) => {
        this.starRatingParameters = componentProperties as IStarRatingParameters;
        // Adapt expects an enum value for the size (RxRatingSize), though the options return a String
        // so we need to cast it into a Number.
        this.selectedSize = this.starRatingParameters.size ? Number(this.starRatingParameters.size) : this.selectedSize;

        if (this.starRatingParameters.labelColor) {
          this.labelStyle = {
            color: this.starRatingParameters.labelColor
          };
        }

        // We need to trigger the change detection because rx-rating component does not update.
        this.changeDetectorRef.detectChanges();
      });

    // We can also subscribe to one specific input parameter if we do not want to update it later.
    // this.model.modelSandbox.getComponentPropertyValue('defaultNumberOfStars').subscribe(defaultNumberOfStars => {
    //   // We need to trigger the change detection because of the rx-rating component which does not update.
    //   this.defaultNumberOfStars = defaultNumberOfStars;
    //   this.changeDetectorRef.detectChanges();
    // });
  }

  // Updating the input component "defaultNumberOfStars" property directly from the view component.
  onRateChange(value: number) {
    this.starRatingParameters = {
      ...this.starRatingParameters,
      defaultNumberOfStars: value
    };

    this.model.modelSandbox.updateComponentProperties(this.starRatingParameters);
  }
}
