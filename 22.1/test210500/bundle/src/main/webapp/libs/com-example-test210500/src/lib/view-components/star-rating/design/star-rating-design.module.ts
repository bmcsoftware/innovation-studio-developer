import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingDesignComponent } from './star-rating-design.component';
// Necessary since we are displaying the rx-rating component at design time.
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, FormsModule, AdaptRxRatingModule],
  declarations: [StarRatingDesignComponent],
  entryComponents: [StarRatingDesignComponent]
})
export class StarRatingDesignModule {
}
