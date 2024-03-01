import { Injectable } from '@angular/core';
import { IViewActionService } from '@helix/platform/view/api';
import { INotificationActionProperties } from './notification-action.interface';
import { EMPTY, Observable } from 'rxjs';
import { RxNotificationService } from '@helix/platform/shared/api';
import { NOTIFICATION_OPTIONS } from './notification-action.types';
import { RxViewAction } from '@helix/platform/view/api';

@Injectable()
@RxViewAction({
  name: 'comExampleTest210500ActionNotification',
})
export class NotificationActionService implements IViewActionService<INotificationActionProperties, never> {
  // We will use the OOTB RxNotificationService to display our message.
  constructor(private rxNotificationService: RxNotificationService) {
  }

  // Method executed at runtime automatically.
  // params will contain the different Input parameter values.
  // This method must return an Observable.
  // In this example the Action does not return any output parameter that
  // could be consumed by other actions.
  execute(params: INotificationActionProperties): Observable<never> {
    const type = params.type || NOTIFICATION_OPTIONS.defaultType;
    // We should not use null as a message.
    const message = params.message || '';

    switch (type) {
      case NOTIFICATION_OPTIONS.notificationType.success.id:
        this.rxNotificationService.addSuccessMessage(message);
        break;
      case NOTIFICATION_OPTIONS.notificationType.info.id:
        this.rxNotificationService.addInfoMessage(message);
        break;
      case NOTIFICATION_OPTIONS.notificationType.warning.id:
        this.rxNotificationService.addWarningMessage(message);
        break;
      case NOTIFICATION_OPTIONS.notificationType.error.id:
        this.rxNotificationService.addErrorMessage(message);
        break;
      default:
        this.rxNotificationService.addInfoMessage(message);
        break;
    }

    return EMPTY;
  }
}
