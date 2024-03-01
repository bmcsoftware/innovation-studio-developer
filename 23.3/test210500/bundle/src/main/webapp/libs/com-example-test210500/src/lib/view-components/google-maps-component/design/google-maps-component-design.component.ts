import { Component, Input } from '@angular/core';
import { GoogleMapsComponentDesignModel } from './google-maps-component-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-google-maps-component-design',
  styleUrls: ['./google-maps-component-design.scss'],
  templateUrl: './google-maps-component-design.component.html'
})
export class GoogleMapsComponentDesignComponent {
  @Input()
  model: GoogleMapsComponentDesignModel;
}
