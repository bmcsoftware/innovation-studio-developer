import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneratePasswordDesignComponent } from './generate-password-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GeneratePasswordDesignComponent],
  entryComponents: [GeneratePasswordDesignComponent]
})
export class GeneratePasswordDesignModule {
}
