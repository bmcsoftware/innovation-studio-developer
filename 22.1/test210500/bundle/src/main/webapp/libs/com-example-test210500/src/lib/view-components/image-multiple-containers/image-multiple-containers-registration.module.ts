import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { ImageMultipleContainersComponent, ImageMultipleContainersModule } from './runtime';
import { ImageMultipleContainersDesignComponent, ImageMultipleContainersDesignModel, ImageMultipleContainersDesignModule } from './design';

@NgModule({
  imports: [ImageMultipleContainersDesignModule, ImageMultipleContainersModule]
})
export class ImageMultipleContainersRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-image-multiple-containers',
      name: 'Image Multiple Containers',
      icon: 'image_square',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageMultipleContainersComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageMultipleContainersDesignComponent),
      designComponentModel: ImageMultipleContainersDesignModel,
      bundleId: 'com.example.test210500',
      // This property is necessary in order to contain other components (for example buttons).
      // isContainerComponent: true,
      // Two outlets are used to store the other components (here we will contain button bar and buttons).
      options: {
        canBeEmbeddedInRecordEditor: true
      },
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
