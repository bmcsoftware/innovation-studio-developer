import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifecycleComponent } from './lifecycle.component';
import { AdaptWorkFlowModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, AdaptWorkFlowModule],
  exports: [LifecycleComponent],
  declarations: [LifecycleComponent],
  entryComponents: [LifecycleComponent]
})
export class LifecycleModule {
}
