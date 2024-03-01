import { Component, Input } from '@angular/core';
import { CustomDatapagequeryDesignModel } from './custom-datapagequery-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-datapagequery-design',
  styleUrls: ['./custom-datapagequery-design.scss'],
  templateUrl: './custom-datapagequery-design.component.html'
})
export class CustomDatapagequeryDesignComponent {
  @Input()
  model:CustomDatapagequeryDesignModel;
}
