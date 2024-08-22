import { Component, Input } from '@angular/core';
import { CustomGridDesignModel } from './custom-grid-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-grid-design',
  styleUrls: ['./custom-grid-design.scss'],
  templateUrl: './custom-grid-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomGridDesignComponent {
  @Input()
  model: CustomGridDesignModel;
}
