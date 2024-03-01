import { Component, Input, OnInit } from '@angular/core';
import { StarRatingFieldDesignModel } from './star-rating-field-design.model';
import { STAR_RATING_SIZE_OPTIONS } from '../../star-rating/star-rating.types';
import { combineLatest } from 'rxjs';
import { IStarRatingFieldDesignTimeParameters } from './star-rating-field.interface';

@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating-field-design',
  templateUrl: './star-rating-field-design.component.html'
})
export class StarRatingFieldDesignComponent implements OnInit {
  @Input()
  model: StarRatingFieldDesignModel;

  // Component Input Parameters (the interface is different than the on used in Design Time).
  starRatingFieldParameters: IStarRatingFieldDesignTimeParameters;

  // rx-rating Adapt component parameters.
  selectedSize = STAR_RATING_SIZE_OPTIONS.defaultSize;
  isReadonly = false;
  labelStyle = {};
  value = 5;

  ngOnInit(): void {
    // Subscribing to the field properties changes.
    // We subscribe to the component input parameters to receive their values when modified
    // in the inspectors so we can update the view component layout (style or size for example).
    combineLatest([this.model.componentProperties$])
      .subscribe(([componentProperties]) => {
        this.starRatingFieldParameters = componentProperties as IStarRatingFieldDesignTimeParameters;
        // Adapt rx-rating component expects an enum value for the size (RxRatingSize),
        // though the options return a String so we need to cast it into a Number.
        this.selectedSize = this.starRatingFieldParameters.size ? Number(this.starRatingFieldParameters.size) : this.selectedSize;

        if (this.starRatingFieldParameters.labelColor) {
          this.labelStyle = {
            color: this.starRatingFieldParameters.labelColor
          };
        }
      });
  }
}
