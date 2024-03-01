import { Component, Input } from '@angular/core';
import { ImageClickDesignModel } from './image-click-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-image-click-design',
  styleUrls: ['./image-click-design.scss'],
  templateUrl: './image-click-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ImageClickDesignComponent {
  @Input()
  model: ImageClickDesignModel;
}
