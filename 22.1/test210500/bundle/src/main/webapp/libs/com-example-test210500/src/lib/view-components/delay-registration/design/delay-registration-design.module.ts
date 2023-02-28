import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelayRegistrationDesignComponent } from './delay-registration-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DelayRegistrationDesignComponent],
  entryComponents: [DelayRegistrationDesignComponent]
})
export class DelayRegistrationDesignModule {
}
