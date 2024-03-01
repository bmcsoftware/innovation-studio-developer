import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPreferencesDesignComponent } from './user-preferences-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [UserPreferencesDesignComponent],
  entryComponents: [UserPreferencesDesignComponent]
})
export class UserPreferencesDesignModule {
}
