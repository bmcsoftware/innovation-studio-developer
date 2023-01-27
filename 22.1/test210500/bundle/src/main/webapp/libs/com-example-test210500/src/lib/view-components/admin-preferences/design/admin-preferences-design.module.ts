import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminPreferencesDesignComponent } from './admin-preferences-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AdminPreferencesDesignComponent],
  entryComponents: [AdminPreferencesDesignComponent]
})
export class AdminPreferencesDesignModule {
}
