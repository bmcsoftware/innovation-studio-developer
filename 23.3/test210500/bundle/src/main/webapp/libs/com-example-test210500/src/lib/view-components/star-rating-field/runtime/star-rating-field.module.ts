import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingFieldComponent } from './star-rating-field.component';
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';

@NgModule({
  imports: [CommonModule, AdaptRxRatingModule, FormsModule, ReadOnlyFieldModule],
  exports: [StarRatingFieldComponent],
  declarations: [StarRatingFieldComponent],
  entryComponents: [StarRatingFieldComponent]
})
export class StarRatingFieldModule {
}
