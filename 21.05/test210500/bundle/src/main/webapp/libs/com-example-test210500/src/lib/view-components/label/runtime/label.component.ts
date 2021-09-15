import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ILabelParameters } from '../design/label.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'com-example-test210500-com-example-test210500-label',
  templateUrl: './label.component.html'
})
export class LabelComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  label: string;
  componentData: ILabelParameters;

  ngOnInit() {
    // Subscribing to the input parameters changes until this component is destroyed.
    this.config.pipe(takeUntil(this.destroyed$)).subscribe((config: ILabelParameters) => {
      this.componentData = config;
    });
  }
}
