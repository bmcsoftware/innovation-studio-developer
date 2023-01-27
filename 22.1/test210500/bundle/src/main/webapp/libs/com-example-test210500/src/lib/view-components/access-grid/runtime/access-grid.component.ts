import { AfterViewInit, Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IAccessGridParameters } from '../design/access-grid.interface';
import { forEach } from 'lodash';
import { RecordGridComponent } from '@helix/platform/view/components';
import { GetComponentService } from '../../../services/get-component.service';
import { RxLogService } from '@helix/platform/shared/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'com-example-test210500-com-example-test210500-access-grid',
  templateUrl: './access-grid.component.html'
})
export class AccessGridComponent extends BaseViewComponent implements OnInit, IViewComponent, AfterViewInit {
  guid: string;
  config: Observable<any>;
  accessGrid: string;

  componentData: IAccessGridParameters;
  currentRowsJson = '';

  private recordGridComponent: RecordGridComponent;
  // LMA:: TODO:: #dataLoaded
  // private isFirstLoad = true;

  private currentRows = [];

  // Overriding default apis so we can implement:
  // setProperty (when a value is set through a button set property action),
  private api = {
    setProperty: this.setProperty.bind(this)
  };

  constructor(private getComponentService: GetComponentService, private rxLogService: RxLogService) {
    super();
  }

  ngOnInit() {
    this.config.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((config: IAccessGridParameters) => {
      this.componentData = config;

      // This method is used to broadcast a value to outside the view component.
      // Here we broadcast the api changes we overrode.
      this.notifyPropertyChanged('api', this.api);
    });
  }

  // Trying to get the BMC grid component in the DOM since the grid view
  // component does not expose the necessary apis to get its data or
  // select a row for example.
  // Since there can be multiple grids in the system, we use a trick and add a custom
  // css class in the grid in view designer and we will look for this custom class in
  // all grids we find.
  // LMA:: TODO:: Right now there is a bug where the custom class is not added in the DOM
  // so we have to loop.
  // When the bug is fixed we'll be able to look for the class directly.
  private detectGridComponent(className: string): void {
    const allGridsElements = document.querySelectorAll('rx-record-grid');

    forEach(Array.from(allGridsElements), (grid) => {
      // LMA:: TODO:: This is kinda inefficient, see the bug mentioned above.
      const gridComponent: RecordGridComponent = this.getComponentService.getComponentByNativeElement(grid);

      if (gridComponent.customCssClasses.includes(className)) {
        this.recordGridComponent = gridComponent;
      }
    });

    if (!this.recordGridComponent) {
      // LMA:: TODO:: We should put a retry counter here and give up at some point.
      setTimeout(() => {
        this.detectGridComponent(className);
      }, 100);
    } else {
      // Subscribing to Adapt value Observable. It will return the values actually displayed in the grid.
      // This happens after load, refresh, sort or filter.
      // LMA:: TODO:: #dataLoaded
      // It seems there is a bug in recordGridComponent.dataLoaded so we use the Adapt observable
      // instead...
      this.recordGridComponent.adaptTable.tableService.valueSource$.subscribe((dataRows) => {
        this.currentRows = dataRows;

        // We send the grid data in the output parameter as a stringified Json.
        this.currentRowsJson = JSON.stringify(this.currentRows, undefined, 2);
        this.notifyPropertyChanged('gridData', this.currentRowsJson);
      });

      // LMA:: TODO:: #dataLoaded
      // We subscribe to the grid component value (list of values) just as an example on
      // how we can tap into the grid own objects.
      // For example here we could tap into the grid configuration:
      // this.recordGridComponent.config.subscribe(
      // Here we tap into the flag that indicates that the data has been loaded.
      // LMA:: TODO:: It seems there is a bug where the first time the view is displayed
      // we receive an event but there is no data yet.
      // this.recordGridComponent.dataLoaded.pipe(
      //   takeUntil(this.destroyed$)
      // ).subscribe((value) => {
      //   console.log('something changed...');
      //   this.getData();
      //   this.isFirstLoad = false;
      // });
    }
  }

  ngAfterViewInit(): void {
    this.detectGridComponent(this.componentData.gridCssClassTag);
  }

  // LMA:: TODO:: #dataLoaded
  // getData(): any[] {
  //   let dataRows = [];
  //
  //   if (this.recordGridComponent) {
  //     dataRows = this.recordGridComponent.adaptTable.value || [];
  //
  //     this.currentRowsJson = JSON.stringify(this.recordGridComponent.adaptTable.value, undefined, 2);
  //
  //     // LMA:: TODO:: It seems there is a bug where the first time the view is displayed
  //     // we receive an event but there is no data yet.
  //     if (this.isFirstLoad && !dataRows.length) {
  //       setTimeout(() => {
  //         this.getData();
  //       }, 200);
  //     }
  //   }
  //
  //   // Setting the output parameter.
  //   this.notifyPropertyChanged('gridData', this.currentRowsJson);
  //
  //   return dataRows;
  // }

  // Select a specific row in the grid.
  private selectRow(rowIndex: string): void {
    // LMA:: TODO:: #dataLoaded
    // Getting the latest data.
    // const rowData = this.getData();
    const index = Number(rowIndex);

    // LMA:: TODO:: #dataLoaded
    // if (index < rowData.length) {
    if (index < this.currentRows.length) {
      // It seems there is no easy way to unselect the selected lines, the trick is
      // to get all currently selected rows and "remove" them from the selection list.
      const selectedRows = this.recordGridComponent.adaptTable.getRowSelectionArray();

      if (selectedRows) {
        this.recordGridComponent.adaptTable.removeFromRowSelection(selectedRows);
      }

      // In order to select one row, we need to actually pass the row object itself
      // not an index. Moreover the value must be an array of rows.
      // In this example it will be an array of one row.
      // LMA:: TODO:: #dataLoaded
      // this.recordGridComponent.adaptTable.addToRowSelection([rowData[index]])
      this.recordGridComponent.adaptTable.addToRowSelection([this.currentRows[index]])
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
