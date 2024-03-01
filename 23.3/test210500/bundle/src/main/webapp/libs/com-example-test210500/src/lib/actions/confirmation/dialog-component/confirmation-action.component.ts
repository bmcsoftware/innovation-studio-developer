import { Component, Optional } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { CONFIRMATION_ACTION } from '../confirmation-action.types';

@Component({
  selector: 'com-example-test210500-com-example-test210500-confirmation-action-component',
  styleUrls: ['./confirmation-action.component.scss'],
  templateUrl: './confirmation-action.component.html'
})
export class ConfirmationActionComponent {
  // The title is automatically set.
  title: string;
  message: string;
  confirmationText = 'John Wick';

  constructor(@Optional() public activeModalRef:ActiveModalRef) {
    this.message = this.activeModalRef ? this.activeModalRef.getData() : '';
  }

  confirm(): void {
    this.activeModalRef.close(this.confirmationText);
  }

  cancel(): void {
    this.activeModalRef.dismiss(CONFIRMATION_ACTION.cancelReasons.onClick);
  }
}
