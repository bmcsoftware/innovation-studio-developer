import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPreferencesComponent } from './user-preferences.component';
// AdaptButtonModule is necessary to use the "adapt buttons" to match the BMC OOTB objects look & feel.
// AdaptColorPickerModule is necessary to use the Adapt color picker object.
// AdaptIconModule is necessary to use the Adapt icon object.
// AdaptPopoverModule is necessary for AdaptIconModule if we use popover properties in adapt icon
// like placement or adaptPopover to display a "tooltip" style message.
import { AdaptButtonModule, AdaptColorPickerModule, AdaptIconModule, AdaptPopoverModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { UserPreferencesService } from './user-preferences.service';

@NgModule({
  imports: [CommonModule, AdaptButtonModule, AdaptColorPickerModule, AdaptIconModule, AdaptPopoverModule, FormsModule],
  exports: [UserPreferencesComponent],
  providers: [UserPreferencesService],
  declarations: [UserPreferencesComponent],
  entryComponents: [UserPreferencesComponent]
})
export class UserPreferencesModule {
}
