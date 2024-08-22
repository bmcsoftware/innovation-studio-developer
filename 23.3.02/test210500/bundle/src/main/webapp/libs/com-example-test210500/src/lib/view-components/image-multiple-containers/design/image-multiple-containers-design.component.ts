import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ImageMultipleContainersDesignModel } from './image-multiple-containers-design.model';
import {
  ImageMultipleContainerOutletComponent
} from './image-multiple-containers-outlet/image-multiple-container-outlet.component';

@Component({
  standalone: true,
  selector: 'com-example-test210500-image-multiple-containers-design',
  styleUrls: ['./image-multiple-containers-design.scss'],
  templateUrl: './image-multiple-containers-design.component.html',
  imports: [CommonModule, FormsModule, ImageMultipleContainerOutletComponent],
})
export class ImageMultipleContainersDesignComponent {
  @Input()
  model: ImageMultipleContainersDesignModel;
}
