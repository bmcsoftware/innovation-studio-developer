import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessGridComponent } from './access-grid.component';
import { AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';
// This service is necessary to get a Component instance from a Native Element.
import { GetComponentService } from '../../../services/get-component.service';

@NgModule({
  imports: [CommonModule, AdaptCodeViewerModule],
  exports: [AccessGridComponent],
  providers: [GetComponentService],
  declarations: [AccessGridComponent],
  entryComponents: [AccessGridComponent]
})
export class AccessGridModule {
}
