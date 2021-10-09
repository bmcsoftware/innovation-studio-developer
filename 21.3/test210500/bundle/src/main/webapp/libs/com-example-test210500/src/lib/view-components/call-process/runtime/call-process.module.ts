import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallProcessComponent } from './call-process.component';

@NgModule({
  imports: [CommonModule],
  exports: [CallProcessComponent],
  declarations: [CallProcessComponent],
  entryComponents: [CallProcessComponent]
})
export class CallProcessModule {
}
