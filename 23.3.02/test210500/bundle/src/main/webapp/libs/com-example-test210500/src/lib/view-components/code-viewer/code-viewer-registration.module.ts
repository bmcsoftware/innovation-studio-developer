import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { CodeViewerComponent } from './runtime';
import { CodeViewerDesignComponent, CodeViewerDesignModel } from './design';

@NgModule()
export class CodeViewerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CodeViewer',
      name: 'Code Viewer',
      icon: 'file_code_o',
      group: 'Test 21.05.00',
      component: CodeViewerComponent,
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      properties: [
        {
          name: 'code',
          enableExpressionEvaluation: true
        },
        {
          name: 'language',
          enableExpressionEvaluation: true
        },
        {
          name: 'prettifyJson'
        }
      ],
      designComponent: CodeViewerDesignComponent,
      designComponentModel: CodeViewerDesignModel
    });
  }
}
