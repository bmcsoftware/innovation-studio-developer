import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ImageClickComponent } from './runtime';
import { ImageClickDesignComponent, ImageClickDesignModel } from './design';
import { IViewComponentDescriptor } from '@helix/platform/view/api/registries/view-component-descriptor.types';

@NgModule()
export class ImageClickRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-test210500-image-click',
      name: 'Image Click',
      group: 'Test 21.05.00',
      icon: 'image_square',
      component: ImageClickComponent,
      designComponent: ImageClickDesignComponent,
      designComponentModel: ImageClickDesignModel,
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
