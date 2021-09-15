import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingFieldDesignComponent } from './star-rating-field-design.component';
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, FormsModule, AdaptRxRatingModule],
  declarations: [StarRatingFieldDesignComponent],
  entryComponents: [StarRatingFieldDesignComponent]
})
export class StarRatingFieldDesignModule {
}
