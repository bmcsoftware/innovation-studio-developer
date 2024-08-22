import { Component, Input } from '@angular/core';
import { WebcamDesignModel } from './webcam-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-webcam-design',
  styleUrls: ['./webcam-design.scss'],
  templateUrl: './webcam-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WebcamDesignComponent {
  @Input()
  model: WebcamDesignModel;
}
