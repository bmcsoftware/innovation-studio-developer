import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_VIEW_DEFINITION, RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { ImageContainerComponent, ImageContainerModule } from './runtime';
import { ImageContainerDesignComponent, ImageContainerDesignModel, ImageContainerDesignModule } from './design';

@NgModule({
  imports: [ImageContainerDesignModule, ImageContainerModule]
})
export class ImageContainerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-image-container',
      name: 'Image Container',
      icon: 'image_square',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageContainerComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageContainerDesignComponent),
      designComponentModel: ImageContainerDesignModel,
      bundleId: 'com.example.test210500',
      // This property is necessary in order to contain other components (for example buttons).
      // isContainerComponent: true,
      // Outlets are used to store the other components (here we will contain button bar and buttons).
      options: {
        canBeEmbeddedInRecordEditor: true
      },
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
