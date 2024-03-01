import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIconsComponent } from './list-icons.component';
import { AdaptAlertModule, AdaptRxSearchModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { IconPipe } from './list-icons.pipe';
import { IconFilterTrackingService } from './list-icon.service';

// We are using the Adapt search component to perform the search.
// For this we need to import the AdaptRxSearchModule.
// Since we are using ngModel to track the value we also need to import
// Angular FormsModule.
@NgModule({
  imports: [CommonModule, AdaptRxSearchModule, FormsModule, AdaptAlertModule],
  exports: [ListIconsComponent],
  providers: [IconFilterTrackingService],
  declarations: [ListIconsComponent, IconPipe],
  entryComponents: [ListIconsComponent]
})
export class ListIconsModule {
}
