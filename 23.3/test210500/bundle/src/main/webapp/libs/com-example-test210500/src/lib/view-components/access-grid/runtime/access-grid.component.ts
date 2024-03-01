import { AfterViewInit, Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IAccessGridParameters } from '../design/access-grid.interface';
import { RxLogService } from '@helix/platform/shared/api';
import {pluck, take, takeUntil} from 'rxjs/operators';
import {IRxRecordGridApi, RxViewComponent} from '@helix/platform/view/api';
import { CommonModule } from '@angular/common';
import { AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-access-grid',
  templateUrl: './access-grid.component.html',
  standalone: true,
  imports: [CommonModule, AdaptCodeViewerModule]
})
@RxViewComponent({
  name: 'comExampleTest210500AccessGrid'
})
export class AccessGridComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  componentData: IAccessGridParameters;
  currentRowsJson = '';
  private recordGridComponent: IRxRecordGridApi;

  // Overriding default apis so we can implement:
  // setProperty (when a value is set through a button set property action),
  private api = {
    setProperty: this.setProperty.bind(this)
  };

  constructor(private rxLogService: RxLogService) {
    super();
  }

  ngOnInit() {
    // Initial configuration
    this.config.pipe(
      take(1)
    ).subscribe((config: IAccessGridParameters) => {
      this.componentData = config;
      // We cannot get anymore the BMC grid component in the DOM as we did in the 22.1 example since Angular
      // does not support this anymore in production mode.
      // We have to workaround it using the OOTB record grid object.
      // The grid view component is stored in "gridViewComponent" and has been evaluated.
      this.recordGridComponent = this.componentData.gridViewComponent;

      // This method is used to broadcast a value to outside the view component.
      // Here we broadcast the api changes we overrode.
      this.notifyPropertyChanged('api', this.api);
    });

    this.config.pipe(
      takeUntil(this.destroyed$),
      pluck('lastRefreshTime')
    ).subscribe((lastRefreshTime: string) => {
      this.componentData.lastRefreshTime = lastRefreshTime;

      if (this.componentData.lastRefreshTime) {
        // As a test we will select the first row if no row has been set using the setProperty.
        if (this.componentData.rowIndex === null || this.componentData.rowIndex === '') {
          this.componentData.rowIndex = '0';
        }

        setTimeout(() => {
          // We send the grid data in the output parameter as a stringified Json.
          this.currentRowsJson = JSON.stringify(this.componentData.gridViewComponent.getVisibleRows(), undefined, 2);
          this.notifyPropertyChanged('gridData', this.currentRowsJson);

          // The grid last refresh time will tell us that data have been loaded.
          // However, this does not mean the grid has been "updated" yet, so as a workaround
          // we need to wait a bit.
          this.selectRow(this.componentData.rowIndex);
        }, 500);
      }
    });
  }

  // Selects a specific row in the grid.
  private selectRow(rowIndex: string): void {
    const index = Number(rowIndex);

    if (index < this.recordGridComponent.getVisibleRows().length) {
      if (this.recordGridComponent.getSelectedRows()) {
        // In order to unselect rows, we need to pass an empty array.
        this.recordGridComponent.setSelectedRows([]);
      }

      // In order to select one row, we need to actually pass the row object itself
      // not an index. Moreover, the value must be an array of rows.
      // In this example it will be an array of one row.
      this.recordGridComponent.setSelectedRows([this.recordGridComponent.getVisibleRows()[index]])
    }
  }

  // This method is triggered by a button "set property" action to select one row in the grid.
  setProperty(propertyPath: string, propertyValue: any): void {
    switch (propertyPath) {
      case 'rowIndex': {
        this.selectRow(propertyValue);
        break;
      }
      default: {
        this.rxLogService.warning(`Standalone Field: property ${propertyPath} is not settable, value was ${propertyValue}.`);
      }
    }
  }
}
