import { Component, Input } from '@angular/core';
import { CallCommandDesignModel } from './call-command-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-call-command-design',
  styleUrls: ['./call-command-design.scss'],
  templateUrl: './call-command-design.component.html'
})
export class CallCommandDesignComponent {
  @Input()
  model: CallCommandDesignModel;
}
