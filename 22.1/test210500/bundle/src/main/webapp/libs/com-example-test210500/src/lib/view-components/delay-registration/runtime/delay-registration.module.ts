import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelayRegistrationComponent } from './delay-registration.component';

@NgModule({
  imports: [CommonModule],
  exports: [DelayRegistrationComponent],
  declarations: [DelayRegistrationComponent],
  entryComponents: [DelayRegistrationComponent]
})
export class DelayRegistrationModule {
}
