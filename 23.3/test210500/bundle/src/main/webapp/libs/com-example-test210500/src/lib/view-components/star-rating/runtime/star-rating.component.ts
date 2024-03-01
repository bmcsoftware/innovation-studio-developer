import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { isEqual } from 'lodash';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IStarRatingParameters } from '../design/star-rating.interface';
import { RxLogService } from '@helix/platform/shared/api';
import { STAR_RATING_SIZE_OPTIONS } from '../star-rating.types';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
// Necessary since we use the rx-rating component.
import { AdaptRxRatingModule} from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating',
  templateUrl: './star-rating.component.html',
  standalone: true,
  imports: [CommonModule, AdaptRxRatingModule, FormsModule]
})
@RxViewComponent({
  name: 'comExampleTest210500StarRating'
})
export class StarRatingComponent extends BaseViewComponent implements OnInit, IViewComponent {
  // LMA:: Those values seems to come from the Schematics and some seem useless.
  guid: string;
  config: Observable<any>;
  starRating: string;

  componentInputParametersValues: IStarRatingParameters;

  // rx-rating Adapt options.
  selectedSize = STAR_RATING_SIZE_OPTIONS.defaultSize;
  labelStyle = {};

  // Overriding default apis.
  api = {
    setProperty: this.setProperty.bind(this),
    setFocus: this.setFocus.bind(this),
    // In this example we use the refresh method to set the view component to default values.
    refresh: this.refresh.bind(this)
  };

  // In this example we use the refresh method to set the view component to default values.
  refresh(): Observable<any> {
    this.componentInputParametersValues.numberOfStars = this.componentInputParametersValues.defaultNumberOfStars;
    this.notifyPropertyChanged('numberOfStarsSelected', this.componentInputParametersValues.numberOfStars);

    return EMPTY;
  }

  // This method is triggered by a button "set property" action.
  setProperty(propertyPath: string, propertyValue: any): void {
    switch (propertyPath) {
      case 'hidden': {
        this.componentInputParametersValues.hidden = propertyValue;
        break;
      }
      case 'disabled': {
        this.componentInputParametersValues.disabled = propertyValue;
        break;
      }
      case 'numberOfStars': {
        this.componentInputParametersValues.numberOfStars = propertyValue;
        this.notifyPropertyChanged('numberOfStarsSelected', this.componentInputParametersValues.numberOfStars);
        break;
      }
      default: {
        this.rxLogService.warning(`Standalone Field: property ${propertyPath} is not settable, value was ${propertyValue}.`);
      }
    }
  }

  setFocus(): Observable<any> {
    this.rxLogService.warning('Executing the view component focus method.');

    return EMPTY;
  }

  constructor(private rxLogService: RxLogService) {
    super();
  }

  ngOnInit() {
    // This ensures that when an input parameter value changes it is reflected in the view component.
    // Tor example if an input parameter is matched to an expression (a field from
    // a record editor).
    this.config.pipe(
      distinctUntilChanged(isEqual),
      takeUntil(this.destroyed$)
    ).subscribe((config: IStarRatingParameters) => {
      this.componentInputParametersValues = config;
      this.selectedSize = this.componentInputParametersValues.size ? Number(this.componentInputParametersValues.size) : this.selectedSize;

      if (this.componentInputParametersValues.labelColor) {
        this.labelStyle = {
          color: this.componentInputParametersValues.labelColor
        };
      }

      this.notifyPropertyChanged('numberOfStarsSelected', this.componentInputParametersValues.numberOfStars);
    });

    // This method is used to broadcast a value to outside the view component, here we broadcast the
    // api changes we overrode.
    this.notifyPropertyChanged('api', this.api);
  }

  // This is triggered by Adapt rx-rating when changing the value, we will broadcast the new value.
  onRateChange(value: number) {
    this.componentInputParametersValues.numberOfStars = value;

    // This method is used to broadcast a value to outside the view component, here we broadcast the
    // output parameter "numberOfStarsSelected" value.
    this.notifyPropertyChanged('numberOfStarsSelected', value);
  }
}
