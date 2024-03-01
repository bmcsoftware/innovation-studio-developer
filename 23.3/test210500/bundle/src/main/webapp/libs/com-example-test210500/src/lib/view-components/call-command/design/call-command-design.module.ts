import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CallCommandDesignComponent } from './call-command-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CallCommandDesignComponent],
  entryComponents: [CallCommandDesignComponent]
})
export class CallCommandDesignModule {
}
