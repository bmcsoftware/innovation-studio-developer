import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { IDelayRegistrationParameters } from '../design/delay-registration.interface';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'com-example-test210500-delay-registration',
  styleUrls: ['./delay-registration.scss'],
  templateUrl: './delay-registration.component.html',
  standalone: true,
  imports: [CommonModule]
})
@RxViewComponent({
  name: 'com-example-test210500-delay-registration',
})
export class DelayRegistrationComponent extends BaseViewComponent implements OnInit,IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: IDelayRegistrationParameters;
  message = '';

  ngOnInit() {
    // Subscribing to input parameter changes.
    // In this example we only "listen" to one specific Input Parameter (message)
    // and not the full configuration object.
    // The code will be triggered again only if the value is different.
    // This is done using standard rxJs operators.
    this.config.pipe(
      // Input parameter.
      pluck('message'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((message: string) => {
      this.message = message;
    });
  }
}
