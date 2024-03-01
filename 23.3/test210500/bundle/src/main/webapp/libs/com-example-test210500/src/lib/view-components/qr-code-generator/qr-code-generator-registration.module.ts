import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { QrCodeGeneratorComponent } from './runtime';
import { QrCodeGeneratorDesignComponent, QrCodeGeneratorDesignModel } from './design';

// This view component allows you to create a QR Code with a label and / or a picture in its center.
// We are using this npm library:
// https://github.com/werthdavid/ngx-kjua
@NgModule()
export class QrCodeGeneratorRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500QrCodeGenerator',
      name: 'QR Code (Create)',
      icon: 'left-qrcode',
      group: 'Test 21.05.00',
      component: QrCodeGeneratorComponent,
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      properties: [
        {
          name: 'content',
          enableExpressionEvaluation: true
        },
        {
          name: 'color',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'backgroundColor',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'useLabel',
          enableExpressionEvaluation: true
        },
        {
          name: 'label',
          enableExpressionEvaluation: true
        },
        {
          name: 'fontName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'fontColor',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'fontSize',
          type: ViewComponentPropertyType.Number
        },
        {
          name: 'usePicture',
          enableExpressionEvaluation: true
        },
        {
          name: 'pictureBase64',
          enableExpressionEvaluation: true
        },
        {
          name: 'imageAsCode',
          type: ViewComponentPropertyType.Boolean
        },
        {
          name: 'cssClasses',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'imageSize',
          type: ViewComponentPropertyType.Number
        }
      ],
      designComponent: QrCodeGeneratorDesignComponent,
      designComponentModel: QrCodeGeneratorDesignModel
    });
  }
}
