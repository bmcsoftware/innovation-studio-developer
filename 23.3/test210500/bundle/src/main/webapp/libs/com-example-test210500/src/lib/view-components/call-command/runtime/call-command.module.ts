import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCommandComponent } from './call-command.component';

@NgModule({
  imports: [CommonModule],
  exports: [CallCommandComponent],
  declarations: [CallCommandComponent],
  entryComponents: [CallCommandComponent]
})
export class CallCommandModule {
}
