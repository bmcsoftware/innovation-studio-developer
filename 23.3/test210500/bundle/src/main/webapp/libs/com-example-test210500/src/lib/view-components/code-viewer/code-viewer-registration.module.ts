import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { CodeViewerComponent, CodeViewerModule } from './runtime';
import { CodeViewerDesignComponent, CodeViewerDesignModel, CodeViewerDesignModule } from './design';

@NgModule({
  imports: [CodeViewerDesignModule, CodeViewerModule]
})
export class CodeViewerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CodeViewer',
      name: 'Code Viewer',
      icon: 'file_code_o',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(CodeViewerComponent),
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
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(CodeViewerDesignComponent),
      designComponentModel: CodeViewerDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
