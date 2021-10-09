import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelDesignComponent } from './label-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LabelDesignComponent],
  entryComponents: [LabelDesignComponent]
})
export class LabelDesignModule {
}
