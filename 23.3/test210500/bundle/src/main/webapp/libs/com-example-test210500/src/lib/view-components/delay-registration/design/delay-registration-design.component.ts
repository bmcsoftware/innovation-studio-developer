import { Component, Input } from '@angular/core';
import { DelayRegistrationDesignModel } from './delay-registration-design.model';

@Component({
  selector: 'com-example-test210500-delay-registration-design',
  styleUrls: ['./delay-registration-design.scss'],
  templateUrl: './delay-registration-design.component.html'
})
export class DelayRegistrationDesignComponent {
  @Input()
  model: DelayRegistrationDesignModel;
}
