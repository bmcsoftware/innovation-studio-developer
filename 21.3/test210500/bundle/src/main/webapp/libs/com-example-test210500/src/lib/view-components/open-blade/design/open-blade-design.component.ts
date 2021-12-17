import { Component, Input } from '@angular/core';
import { OpenBladeDesignModel } from './open-blade-design.model';

@Component({
  selector: 'com-example-test210500-open-blade-design',
  styleUrls: ['./open-blade-design.scss'],
  templateUrl: './open-blade-design.component.html'
})
export class OpenBladeDesignComponent {
  @Input()
  model: OpenBladeDesignModel;
}
