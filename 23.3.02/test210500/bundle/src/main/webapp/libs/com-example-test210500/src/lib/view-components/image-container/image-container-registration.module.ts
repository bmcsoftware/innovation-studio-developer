import { NgModule } from '@angular/core';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { ImageContainerComponent } from './runtime/image-container.component';
import { ImageContainerDesignComponent } from './design/image-container-design.component';
import { ImageContainerDesignModel } from './design/image-container-design.model';

@NgModule()
export class ImageContainerRegistrationModule {
  constructor(rxViewComponentRegistryService: RxViewComponentRegistryService) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-image-container',
      name: 'Image Container',
      group: 'Test 21.05.00',
      icon: 'image_square',
      component: ImageContainerComponent,
      designComponent: ImageContainerDesignComponent,
      designComponentModel: ImageContainerDesignModel,
      // This property is necessary in order to contain other components (for example buttons).
      isContainerComponent: true,
      // Outlets are used to store the other components (here we will contain button bar and buttons).
      outlets: [
        {
          name: RX_VIEW_DEFINITION.defaultOutletName
        }
      ],
      properties: [
        {
          name: 'styles',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'hidden',
          enableExpressionEvaluation: true
        }
      ]
    });
  }
}
