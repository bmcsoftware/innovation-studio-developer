import { Component, Input } from '@angular/core';
import { FloatingPanelDesignModel } from './floating-panel-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-floating-panel-design',
  styleUrls: ['./floating-panel-design.scss'],
  templateUrl: './floating-panel-design.component.html'
})
export class FloatingPanelDesignComponent {
  @Input()
  model: FloatingPanelDesignModel;
}
