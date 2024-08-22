import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { BaseViewComponent, IViewComponent, RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { RxViewComponent } from '@helix/platform/view/api';
import { IImageMultipleContainersParameters } from '../design/image-multiple-containers.interface';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { GetAssetPathService } from '../../../services/get-asset-path.service';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'com-example-test210500-image-multiple-containers',
  styleUrls: ['./image-multiple-containers.scss'],
  templateUrl: './image-multiple-containers.component.html',
  imports: [CommonModule, ViewDesignerCanvasModule, RuntimeViewCanvasModule]
})
@RxViewComponent({
  name: 'com-example-test210500-image-multiple-containers',
})
export class ImageMultipleContainersComponent extends BaseViewComponent implements OnInit,IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: IImageMultipleContainersParameters;
  assetRootPath = '';

  // Implementing set property and refresh apis.
  api = {
    // This will be called when an input parameter is set by a button "set property" action.
    setProperty: this.setProperty.bind(this)
  };

  constructor(private getAssetPathService: GetAssetPathService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.assetRootPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');

    // Input parameters.
    this.config.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((config: IImageMultipleContainersParameters) => {
      this.inputParams = config;
    });
  }

  // This method is triggered by a button "set property" action.
  setProperty(propertyPath: string, propertyValue: any): void | Observable<never>{
    switch (propertyPath) {
      case 'hidden': {
        this.inputParams.hidden = propertyValue;
        this.notifyPropertyChanged(propertyPath, propertyValue);
        break;
      }
      default: {
        return throwError(`Image Multiple Containers : property ${propertyPath} is not settable.`);
      }
    }
  }
}
