import { Component, Input } from '@angular/core';
import { ImageMultipleContainersDesignModel } from './image-multiple-containers-design.model';

@Component({
  selector: 'com-example-test210500-image-multiple-containers-design',
  styleUrls: ['./image-multiple-containers-design.scss'],
  templateUrl: './image-multiple-containers-design.component.html'
})
export class ImageMultipleContainersDesignComponent {
  @Input()
  model: ImageMultipleContainersDesignModel;
}
