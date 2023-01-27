import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenBladeComponent } from './open-blade.component';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, AdaptButtonModule],
  exports: [OpenBladeComponent],
  declarations: [OpenBladeComponent],
  entryComponents: [OpenBladeComponent]
})
export class OpenBladeModule {
}
