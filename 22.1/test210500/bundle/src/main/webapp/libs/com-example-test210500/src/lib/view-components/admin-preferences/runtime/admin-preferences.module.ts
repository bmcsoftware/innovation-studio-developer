import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPreferencesComponent } from './admin-preferences.component';
import { AdaptButtonModule, AdaptCodeViewerModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, AdaptCodeViewerModule, AdaptButtonModule, AdaptRxLabelModule],
  exports: [AdminPreferencesComponent],
  declarations: [AdminPreferencesComponent],
  entryComponents: [AdminPreferencesComponent]
})
export class AdminPreferencesModule {
}
