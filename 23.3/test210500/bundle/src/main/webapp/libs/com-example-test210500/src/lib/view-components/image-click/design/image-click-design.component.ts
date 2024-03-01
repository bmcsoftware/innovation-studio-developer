import { Component, Input } from '@angular/core';
import { ImageClickDesignModel } from './image-click-design.model';

@Component({
  selector: 'com-example-test210500-image-click-design',
  styleUrls: ['./image-click-design.scss'],
  templateUrl: './image-click-design.component.html'
})
export class ImageClickDesignComponent {
  @Input()
  model: ImageClickDesignModel;
}
