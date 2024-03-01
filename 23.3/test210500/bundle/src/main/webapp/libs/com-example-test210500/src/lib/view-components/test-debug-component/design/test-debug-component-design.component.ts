import { Component, Input } from '@angular/core';
import { TestDebugComponentDesignModel } from './test-debug-component-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-test-debug-component-design',
  styleUrls: ['./test-debug-component-design.scss'],
  templateUrl: './test-debug-component-design.component.html'
})
export class TestDebugComponentDesignComponent {
  @Input()
  model: TestDebugComponentDesignModel;
}
