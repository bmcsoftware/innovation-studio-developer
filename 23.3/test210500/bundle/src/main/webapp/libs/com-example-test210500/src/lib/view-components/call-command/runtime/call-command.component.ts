import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ICallCommandParameters, ICallCommandPayload, ICallCommandResult } from '../design/call-command.interface';
import { RxCommandFactoryService, RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { CALL_COMMAND_OPTIONS } from './call-command.types';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'com-example-test210500-com-example-test210500-call-command',
  templateUrl: './call-command.component.html'
})
export class CallCommandComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  callCommand: string;
  commandResult = '';

  private componentData: ICallCommandParameters;

  constructor(private rxCurrentUserService: RxCurrentUserService,
              private rxCommandFactoryService: RxCommandFactoryService,
              private rxNotificationService: RxNotificationService) {
    super();
  }

  ngOnInit() {
    // Preparing the command payload and calling the command.
    const commandPayload: ICallCommandPayload = {
      inputId: this.rxCurrentUserService.get().userId,
      inputUserName: this.rxCurrentUserService.get().loginName
    };

    // The command is defined in this Java class:
    // src/main/java/com/example/bundle/Test210500GeneratePasswordCommand.java
    this.rxCommandFactoryService
      .forResourceType(CALL_COMMAND_OPTIONS.commandType)
      .execute(commandPayload).pipe(
        catchError((error) => {
          this.commandResult = 'Error calling the command.';
          this.rxNotificationService.addErrorMessage(this.commandResult);

          return throwError(error);
        })
    ).subscribe((result: ICallCommandResult) => {
      this.commandResult = 'The generated password for ' + result.userName + ' is ' + result.password + '.';
      this.rxNotificationService.addSuccessMessage(this.commandResult);
    });
  }
}
