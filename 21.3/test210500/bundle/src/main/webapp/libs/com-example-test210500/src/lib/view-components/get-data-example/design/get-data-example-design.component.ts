import { Component, Input } from '@angular/core';
import { GetDataExampleDesignModel } from './get-data-example-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-get-data-example-design',
  styleUrls: ['./get-data-example-design.scss'],
  templateUrl: './get-data-example-design.component.html'
})
export class GetDataExampleDesignComponent {
  @Input()
  model: GetDataExampleDesignModel;
}
