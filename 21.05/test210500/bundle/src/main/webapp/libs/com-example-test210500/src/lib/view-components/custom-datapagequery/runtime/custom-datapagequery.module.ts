import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatapagequeryComponent } from './custom-datapagequery.component';
// The RecordGridModule is necessary since we use the BMC OOTB grid.
import { RecordGridModule } from '@helix/platform/view/components';
// This module is necessary since we are using an Adapt button in the grid.
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
// Custom datapage query declaration.
import { CustomDatapagequeryDataPageService } from './custom-datapagequery-data-page.service';

@NgModule({
  imports: [CommonModule, RecordGridModule, AdaptButtonModule],
  // Custom datapage query declaration.
  providers: [CustomDatapagequeryDataPageService],
  exports: [CustomDatapagequeryComponent],
  declarations: [CustomDatapagequeryComponent],
  entryComponents: [CustomDatapagequeryComponent]
})
export class CustomDatapagequeryModule {
}
