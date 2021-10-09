import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDataExampleComponent } from './get-data-example.component';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxJsonViewerModule } from '@helix/platform/ui-kit';

@NgModule({
  imports: [CommonModule, AdaptButtonModule, RxJsonViewerModule],
  exports: [GetDataExampleComponent],
  declarations: [GetDataExampleComponent],
  entryComponents: [GetDataExampleComponent]
})
export class GetDataExampleModule {
}
