import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  ISelectFormControlOptions,
  SelectFormControlComponent
} from '@helix/platform/shared/components';
import { values } from 'lodash';
import { NOTIFICATION_OPTIONS } from './notification-action.types';
import { NotificationActionService } from './notification-action.service';

@NgModule({
  providers: [NotificationActionService]
})
export class NotificationActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private notificationActionService: NotificationActionService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500ActionNotification',
      label: 'Notification',
      // Service that will be executed at runtime.
      service: this.notificationActionService,
      // Input parameters. The output parameters are not defined in this file.
      // The input parameters should match those defined in the interface.
      // In this example we do not leverage a design model file.
      // The input parameters are directly defined in this file.
      parameters: [
        {
          // We want to display this input parameter as a dropdown
          // with a list of values to define the list of notification type
          // like success, info etc...
          name: 'type',
          editor: SelectFormControlComponent,
          // If editorOptions is defined then the properties 'label' and 'isRequired'
          // from the parameter are overriden by the values in editorOptions
          // label and required.
          editorOptions: {
            label: 'Type',
            required: true,
            // the list of options must be an array of id and name, such as:
            // [{id:'', name:''},...]
            // Both id and name must be Strings (ISelectOption[]).
            options: values(NOTIFICATION_OPTIONS.notificationType),
            sortAlphabetically: false
          } as ISelectFormControlOptions
        },
        {
          name: 'message',
          label: 'Message',
          // This setting indicates that this message can be localized.
          // This means that when used in a view, the view definition will hold
          // a guid for this message.
          // When downloading the bundle localization strings you will be able to
          // translate the message to a different locale and upload the localization
          // back into the bundle.
          // At runtime the UI will automatically display the value in the right locale
          // or the one set in the view designer by default.
          localizable: true,
          enableExpressionEvaluation: true,
          isRequired: true,
          editor: ExpressionFormControlComponent
        }
      ]
    })
  }
}
