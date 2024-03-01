import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating.component';
// Necessary since we use the rx-rating component.
import { AdaptRxRatingModule} from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AdaptRxRatingModule, FormsModule],
  exports: [StarRatingComponent],
  declarations: [StarRatingComponent],
  entryComponents: [StarRatingComponent]
})
export class StarRatingModule {
}
