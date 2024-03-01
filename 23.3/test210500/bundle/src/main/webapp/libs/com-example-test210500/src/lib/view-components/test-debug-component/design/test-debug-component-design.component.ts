import { Component, Input } from '@angular/core';
import { TestDebugComponentDesignModel } from './test-debug-component-design.model';
import {LogParametersModule} from "../../../inspectors/log-parameters/log-parameters.module";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-test-debug-component-design',
  styleUrls: ['./test-debug-component-design.scss'],
  templateUrl: './test-debug-component-design.component.html',
  standalone: true,
  imports: [AdaptCodeViewerModule, CommonModule, FormsModule, LogParametersModule]
})
export class TestDebugComponentDesignComponent {
  @Input()
  model: TestDebugComponentDesignModel;
}
