import { Component, Input } from '@angular/core';
import { LabelDesignModel } from './label-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-label-design',
  templateUrl: './label-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LabelDesignComponent {
  @Input()
  model: LabelDesignModel;
}
