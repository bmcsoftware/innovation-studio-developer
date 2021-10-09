import { Component, Input } from '@angular/core';
import { CallProcessDesignModel } from './call-process-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-call-process-design',
  styleUrls: ['./call-process-design.scss'],
  templateUrl: './call-process-design.component.html'
})
export class CallProcessDesignComponent {
  @Input()
  model: CallProcessDesignModel;
}
