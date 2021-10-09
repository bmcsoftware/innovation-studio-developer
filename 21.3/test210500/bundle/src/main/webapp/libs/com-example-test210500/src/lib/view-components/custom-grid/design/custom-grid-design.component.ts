import { Component, Input } from '@angular/core';
import { CustomGridDesignModel } from './custom-grid-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-grid-design',
  styleUrls: ['./custom-grid-design.scss'],
  templateUrl: './custom-grid-design.component.html'
})
export class CustomGridDesignComponent {
  @Input()
  model: CustomGridDesignModel;
}
