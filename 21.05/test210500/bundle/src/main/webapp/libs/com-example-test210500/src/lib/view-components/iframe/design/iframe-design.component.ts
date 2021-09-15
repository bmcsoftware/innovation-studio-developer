import { Component, Input } from '@angular/core';
import { IframeDesignModel } from './iframe-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-iframe-design',
  styleUrls: ['./iframe-design.scss'],
  templateUrl: './iframe-design.component.html'
})
export class IframeDesignComponent {
  @Input()
  model: IframeDesignModel;
}
