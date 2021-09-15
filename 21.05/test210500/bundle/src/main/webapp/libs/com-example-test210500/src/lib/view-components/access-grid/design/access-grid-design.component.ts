import { Component, Input } from '@angular/core';
import { AccessGridDesignModel } from './access-grid-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-access-grid-design',
  styleUrls: ['./access-grid-design.scss'],
  templateUrl: './access-grid-design.component.html'
})
export class AccessGridDesignComponent {
  @Input()
  model: AccessGridDesignModel;
}
