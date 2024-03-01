import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifecycleDesignComponent } from './lifecycle-design.component';
import { AdaptWorkFlowModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, FormsModule, AdaptWorkFlowModule],
  declarations: [LifecycleDesignComponent],
  entryComponents: [LifecycleDesignComponent]
})
export class LifecycleDesignModule {
}
