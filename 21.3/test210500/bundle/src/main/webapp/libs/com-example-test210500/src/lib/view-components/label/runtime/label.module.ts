import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { LabelPipe } from './label.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [LabelComponent, LabelPipe],
  declarations: [LabelComponent, LabelPipe],
  entryComponents: [LabelComponent]
})
export class LabelModule {
}
