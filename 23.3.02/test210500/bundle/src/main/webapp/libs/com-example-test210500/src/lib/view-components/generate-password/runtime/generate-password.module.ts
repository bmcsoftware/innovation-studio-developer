import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratePasswordComponent } from './generate-password.component';

@NgModule({
  imports: [CommonModule],
  exports: [GeneratePasswordComponent],
  declarations: [GeneratePasswordComponent],
  entryComponents: [GeneratePasswordComponent]
})
export class GeneratePasswordModule {
}
