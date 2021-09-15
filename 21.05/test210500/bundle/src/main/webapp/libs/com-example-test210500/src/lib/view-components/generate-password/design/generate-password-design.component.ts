import { Component, Input } from '@angular/core';
import { GeneratePasswordDesignModel } from './generate-password-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-generate-password-design',
  styleUrls: ['./generate-password-design.scss'],
  templateUrl: './generate-password-design.component.html'
})
export class GeneratePasswordDesignComponent {
  @Input()
  model: GeneratePasswordDesignModel;
}
