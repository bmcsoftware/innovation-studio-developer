import { Component, Input } from '@angular/core';
import { ActionButtonStyle, ContainerDesignComponent, IActionButtonProperties } from '@helix/platform/view/components';
import {
  IViewComponentDropData,
  IViewComponentDropPredicateData,
  ViewDesignerCanvasModule
} from '@helix/platform/view/designer';
import { RxViewComponentType } from '@helix/platform/view/api';

// This component is necessary because we have multiple outlets in this example.
// It extends the Platform component "ContainerDesignComponent".
// This component is then consumed in the design component itself rather than directly
// "rx-canvas-outlet".
// This component needs to be standalone to be imported in the design component.
@Component({
  standalone: true,
  selector: 'com-example-test210500-multiple-image-container-outlet',
  templateUrl: './image-multiple-container-outlet.component.html',
  styleUrls: ['./image-multiple-container-outlet.scss'],
  imports: [
    ViewDesignerCanvasModule
  ]
})
export class ImageMultipleContainerOutletComponent extends ContainerDesignComponent {
  // We pass the name of the outlet in the "outletName" Component Input.
  // Here it will be "OUTLET_TOP" or "OUTLET_BOTTOM".
  @Input()
  outletName: string;

  constructor() {
    super();
  }

  // We catch the Component being dropped and we can modify its properties here.
  onBeforeViewComponentDrop(data: IViewComponentDropData): void {
    // We want to change the buttons style when they are directly dragged & dropped in the Image container.
    // Here we change the style to secondary as a demo.
    // Note:
    // This code will not be executed if the Button is dropped in a Button Bar.
    console.log('In onBeforeViewComponentDrop for' + data.draggedViewComponentDescriptor.type);

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
    const isOk = data.draggedViewComponentDescriptor.type === RxViewComponentType.ActionButton ||
      data.draggedViewComponentDescriptor.type === RxViewComponentType.ButtonBar ||
      data.draggedViewComponentDescriptor.type === RxViewComponentType.RichText

    console.log(data.draggedViewComponentDescriptor.type + ' = ' + isOk);

    return isOk;
  }
}
