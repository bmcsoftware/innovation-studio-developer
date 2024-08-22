import { Component, Input } from '@angular/core';
import { DelayRegistrationDesignModel } from './delay-registration-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-delay-registration-design',
  styleUrls: ['./delay-registration-design.scss'],
  templateUrl: './delay-registration-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DelayRegistrationDesignComponent {
  @Input()
  model: DelayRegistrationDesignModel;
}
