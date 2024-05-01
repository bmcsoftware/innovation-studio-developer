import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageContainerDesignModel } from './image-container-design.model';
import {
  IViewComponentDropData,
  IViewComponentDropPredicateData,
  ViewDesignerCanvasModule
} from '@helix/platform/view/designer';
import { RxViewComponentType } from '@helix/platform/view/api';
import { ActionButtonStyle, IActionButtonProperties } from '@helix/platform/view/components';

@Component({
  standalone: true,
  selector: 'com-example-test210500-image-container-design',
  styleUrls: ['./image-container-design.scss'],
  templateUrl: './image-container-design.component.html',
  imports: [CommonModule, FormsModule, ViewDesignerCanvasModule],
})
export class ImageContainerDesignComponent {
  @Input()
  model: ImageContainerDesignModel;

  // We catch the Component being dropped and we can modify its properties here.
  onBeforeViewComponentDrop(data: IViewComponentDropData): void {
    // We want to change the buttons style when they are directly dragged & dropped in the Image container.
    // Here we change the style to secondary as a demo.
    // Note:
    // This code will not be executed if the Button is dropped in a Button Bar.
    if (data.draggedViewComponentDescriptor.type === RxViewComponentType.ActionButton) {
      data.initialPropertiesByName = {
        ...data.initialPropertiesByName,
        style: ActionButtonStyle.Secondary
      } as IActionButtonProperties;
    }
  }

  // We test if the Component being dragged is allowed to be embedded in our container.
  // Here we only allow Button Bars, Action buttons and Rich Text fields.
  actionButtonDropPredicate(data: IViewComponentDropPredicateData): boolean {
    return data.draggedViewComponentDescriptor.type === RxViewComponentType.ActionButton ||
      data.draggedViewComponentDescriptor.type === RxViewComponentType.ButtonBar ||
      data.draggedViewComponentDescriptor.type === RxViewComponentType.RichText;
  }
}
