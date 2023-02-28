import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ImageClickComponent, ImageClickModule } from './runtime';
import { ImageClickDesignComponent, ImageClickDesignModel, ImageClickDesignModule } from './design';
import { IViewComponentDescriptor } from '@helix/platform/view/api/registries/view-component-descriptor.types';

@NgModule({
  imports: [ImageClickDesignModule, ImageClickModule]
})
export class ImageClickRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-image-click',
      name: 'Image Click',
      group: 'Test 21.05.00',
      icon: 'image_square',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageClickComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ImageClickDesignComponent),
      designComponentModel: ImageClickDesignModel,
      bundleId: 'com.example.test210500',
      // This parameter is necessary so the actions can be added to this view component.
      // The View Component will behave now as a "Container".
      // If this parameter is not set, an error will be triggered when trying to save the view.
      isContainerComponent: true,
      // This parameter will allow the view component to be inserted in a Record Editor.
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      // Note:
      // It is not necessary to declare the "actions" in the list of input parameters.
      properties: [
        {
          name: 'title',
          enableExpressionEvaluation: true
        }
      ]
    } as IViewComponentDescriptor);
  }
}
