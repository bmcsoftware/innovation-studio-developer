import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CallProcessDesignComponent } from './call-process-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CallProcessDesignComponent],
  entryComponents: [CallProcessDesignComponent]
})
export class CallProcessDesignModule {
}
