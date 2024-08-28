import { Component, Input, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { ILabelLazyLoadedProperties } from '../label-lazy-loaded.types';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'com-example-testlazyloading-label-lazy-loaded',
  styleUrls: ['./label-lazy-loaded.component.scss'],
  templateUrl: './label-lazy-loaded.component.html',
  standalone: true
})
@RxViewComponent({
  name: 'com-example-testlazyloading-label-lazy-loaded'
})
export class LabelLazyLoadedComponent extends BaseViewComponent implements OnInit, IViewComponent {
  @Input()
  config: Observable<ILabelLazyLoadedProperties>;

  api = {
    // This method will be called when a component property is set via the Set property view action.
    setProperty: this.setProperty.bind(this)
  };

  // Contains the view component instance id.
  guid: string;
  // Contains the view component instance parameters.
  protected state: ILabelLazyLoadedProperties;

  ngOnInit() {
    super.ngOnInit();

    // Make component API available to runtime view.
    this.notifyPropertyChanged('api', this.api);

    // Subscribe to configuration property changes.
    this.config.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((config: ILabelLazyLoadedProperties) => {
      // Setting isHidden property to true will remove the component from the DOM automatically.
      // There is no need to implement this logic manually in the View Component html.
      this.isHidden = Boolean(config.hidden);

      this.state = { ...config };
    });
  }

  private setProperty(propertyPath: string, propertyValue: any): void | Observable<never> {
    switch (propertyPath) {
      case 'hidden': {
        this.state.hidden = propertyValue;
        this.notifyPropertyChanged(propertyPath, propertyValue);
        break;
      }
      case 'message': {
        this.state.message = propertyValue;
        this.notifyPropertyChanged(propertyPath, propertyValue);
        break;
      }
      default: {
        return throwError(`Label Lazy Loaded : property ${propertyPath} is not settable.`);
      }
    }
  }
}
