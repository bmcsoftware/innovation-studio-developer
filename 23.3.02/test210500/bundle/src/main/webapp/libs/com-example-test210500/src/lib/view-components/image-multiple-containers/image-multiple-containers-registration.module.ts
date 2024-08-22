import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { ImageMultipleContainersComponent } from './runtime/image-multiple-containers.component';
import { ImageMultipleContainersDesignComponent } from './design/image-multiple-containers-design.component';
import { ImageMultipleContainersDesignModel } from './design/image-multiple-containers-design.model';

@NgModule()
export class ImageMultipleContainersRegistrationModule {
  constructor(rxViewComponentRegistryService: RxViewComponentRegistryService) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-image-multiple-containers',
      name: 'Image Multiple Containers',
      group: 'Test 21.05.00',
      icon: 'image_square',
      component: ImageMultipleContainersComponent,
      designComponent: ImageMultipleContainersDesignComponent,
      designComponentModel: ImageMultipleContainersDesignModel,
      // This property is necessary in order to contain other components (for example buttons).
      isContainerComponent: true,
      // Outlets are used to store the other components (here we will contain button bar and buttons).
      outlets: [
        {
          name: 'OUTLET_TOP'
        },
        {
          name: 'OUTLET_BOTTOM'
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
