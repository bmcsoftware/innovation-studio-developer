import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDebugComponentComponent } from './test-debug-component.component';
import { DisplayGradientModule } from '../../display-gradient/runtime';
import { AdaptCodeViewerModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, DisplayGradientModule, AdaptRxLabelModule, AdaptCodeViewerModule],
  exports: [TestDebugComponentComponent],
  declarations: [TestDebugComponentComponent],
  entryComponents: [TestDebugComponentComponent]
})
export class TestDebugComponentModule {
}
