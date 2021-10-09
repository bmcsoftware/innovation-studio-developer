import { Component, Input } from '@angular/core';
import { LmameDesignModel } from './lmame-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-lmame-design',
  templateUrl: './lmame-design.component.html'
})
export class LmameDesignComponent {
  @Input()
  model: LmameDesignModel;
}
