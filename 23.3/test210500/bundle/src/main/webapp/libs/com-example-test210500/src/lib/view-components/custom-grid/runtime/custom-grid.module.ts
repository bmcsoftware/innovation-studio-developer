import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomGridComponent } from './custom-grid.component';
// This import is necessary as we use the RecordGridComponent to display data in a grid.
import { RecordGridModule } from '@helix/platform/view/components';
// This import is necessary as we display an Adapt button in the custom grid.
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, RecordGridModule, AdaptButtonModule],
  exports: [CustomGridComponent],
  declarations: [CustomGridComponent],
  entryComponents: [CustomGridComponent]
})
export class CustomGridModule {
}
