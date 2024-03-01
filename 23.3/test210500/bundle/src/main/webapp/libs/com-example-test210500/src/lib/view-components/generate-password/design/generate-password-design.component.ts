import { Component, Input } from '@angular/core';
import { GeneratePasswordDesignModel } from './generate-password-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-generate-password-design',
  styleUrls: ['./generate-password-design.scss'],
  templateUrl: './generate-password-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GeneratePasswordDesignComponent {
  @Input()
  model: GeneratePasswordDesignModel;
}
