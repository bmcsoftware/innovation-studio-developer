import { Component, Input } from '@angular/core';
import { LabelDesignModel } from './label-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-label-design',
  templateUrl: './label-design.component.html'
})
export class LabelDesignComponent {
  @Input()
  model: LabelDesignModel;
}
