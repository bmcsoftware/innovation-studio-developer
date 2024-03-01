import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestDebugComponentDesignComponent } from './test-debug-component-design.component';
import { LogParametersModule } from '../../../inspectors/log-parameters/log-parameters.module';
import { AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [AdaptCodeViewerModule, CommonModule, FormsModule, LogParametersModule],
  declarations: [TestDebugComponentDesignComponent],
  entryComponents: [TestDebugComponentDesignComponent]
})
export class TestDebugComponentDesignModule {
}
