import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { ILabelLazyLoadedParameters } from '../design/label-lazy-loaded.interface';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'com-example-testlazyloading-label-lazy-loaded',
  styleUrls: ['./label-lazy-loaded.scss'],
  templateUrl: './label-lazy-loaded.component.html',
  standalone: true,
  imports: [CommonModule]
})
@RxViewComponent({
  name: 'com-example-testlazyloading-label-lazy-loaded'
})
export class LabelLazyLoadedComponent extends BaseViewComponent implements OnInit,IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: ILabelLazyLoadedParameters;
  // Message that will be displayed in the View Component.
  message = '';

  ngOnInit() {
    // Subscribing to input parameter changes.
    this.config.subscribe((config: ILabelLazyLoadedParameters) => {
      this.inputParams = config;
    });

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
