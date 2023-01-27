import { Component, Input } from '@angular/core';
import { WebcamDesignModel } from './webcam-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-webcam-design',
  styleUrls: ['./webcam-design.scss'],
  templateUrl: './webcam-design.component.html'
})
export class WebcamDesignComponent {
  @Input()
  model: WebcamDesignModel;
}
