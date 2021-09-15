import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ICustomGridParameters } from '../design/custom-grid.interface';
import {
  IRecordGridConfig,
  IRecordGridDataPageParams,
  RecordGridComponent,
  RowSelectionMode
} from '@helix/platform/view/components';
import { IDataPageResult,RxNotificationService } from '@helix/platform/shared/api';
import { IRecordDefinition, RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { CUSTOM_GRID_OPTIONS } from './custom-grid.types';
import { IRowDataItem } from '@helix/platform/view/api';
import { ColumnConfig, DataCellTemplateParams } from '@bmc-ux/adapt-table';

// This example shows how to leveral the OOTB BMC RecordGridComponent
// to display record definition data, as well as adding custom columns.
// Note:
// In this example the refresh method is not implemented, you can refer to the other
// example to see how to implement it.
// To refresh the grid in the custom-grid.component.ts it would be:
// this.fruitsRecordGrid.api.refresh
// The different output parameters (firstSelectedRow, row count etc...) would need to
// be manually reimplemented as well but you could use each time the grid apis to get those
// such as (you can use Intellisense on this.fruitsRecordGrid.api to see the different available methods):
// this.fruitsRecordGrid.api.getSelectedRowCount()
// this.fruitsRecordGrid.api.getFirstSelectedRow()
// this.fruitsRecordGrid.api.getSelectedRows()
@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-grid',
  styleUrls: ['./custom-grid.scss'],
  templateUrl: './custom-grid.component.html'
})
export class CustomGridComponent extends BaseViewComponent implements OnInit, IViewComponent {
  // Necessary to access the grid apis.
  @ViewChild('fruitsRecordGrid', {static: true})
  fruitsRecordGrid: RecordGridComponent;

  // will be used for the cell templates.
  // Guid.
  @ViewChild('guidTemplate', {static: true})
  guidTemplate: TemplateRef<DataCellTemplateParams>;

  // Display Id
  @ViewChild('displayIdTemplate', {static: true})
  displayIdTemplate: TemplateRef<DataCellTemplateParams>;

  // Custom column ("second" guid, aka order button)
  @ViewChild('customColumnBasedOnExistingField', {static: true})
  customColumnBasedOnExistingField: TemplateRef<DataCellTemplateParams>;

  // Custom column on non existing field, animal.
  @ViewChild('nonExistingColumnTemplate', {static: true})
  nonExistingColumnTemplate: TemplateRef<DataCellTemplateParams>;

  guid: string;
  config: Observable<any>;
  customGrid: string;

  componentData: ICustomGridParameters;
  fruitsRecordGridConfig$: Observable<IRecordGridConfig>;

  constructor(private rxNotificationService: RxNotificationService, private rxRecordInstanceDataPageService: RxRecordInstanceDataPageService) {
    super();
  }

  ngOnInit() {
    // There are no input parameters in this view component, so we do not need to subscribe to the
    // config Observable that usually contains the Input Parameters.
    // this.config.subscribe((config: ICustomGridParameters) => {
    //   this.componentData = config;
    // });

    // LMA:: TODO:: Due to a lack of implementation in the UI we have
    // to force the component in the RecordGridComponent object.
    // The compiler will complain without the @ts-ignore as we are setting
    // a private member.
    // @ts-ignore
    this.fruitsRecordGrid.pageComponent = CustomGridComponent;

    // Creating the grid configuration.
    this.fruitsRecordGridConfig$ = of({
      // Actions buttons will be display in the grid when at least one row is selected.
      actionButtons: [
        {
          label: 'Order',
          iconCls: 'dollar',
          style: 'primary',
          disabled: () => this.fruitsRecordGrid.api.getSelectedRowCount() !== 1,
          // Actions executed on click.
          actions: [
            {
              name: () => {
                this.orderFruit()
              }
            }
          ]
        }
      ],
      recordDefinitionName: CUSTOM_GRID_OPTIONS.recordDefinitionName,
      // Note:
      // The calls getRecordDefinition() and getData() are optional if
      // you are consuming the record definition records. In our case we will
      // create custom columns so we need to define the columns, their definition as fields
      // and intercept the getData() call to remove the non existing fields from the query.
      getRecordDefinition: () => of(this.getRecordDefinition()),
      getData: (queryParams: IRecordGridDataPageParams) => this.getData(queryParams),
      enableRowSelection: RowSelectionMode.Single,
      columns: [
        {
          index: 0,
          title: CUSTOM_GRID_OPTIONS.fields.fruit.label,
          // The fieldId in the configuration must be a string.
          fieldId: `${CUSTOM_GRID_OPTIONS.fields.fruit.fieldId}`,
          clickable: true,
          sortable: true,
          filterable: true,
          // Actions happening when clicking on this column value.
          actions: [
            {
              // The previousActionResult would be useful if there were multiple chained actions.
              // It would contain the previous action result.
              // The lastActionRow contains the row information the user clicked in.
              // It can be different from the selected row.
              name: (previousActionResult: any, lastActionRow: IRowDataItem) => this.orderThisFruit(lastActionRow)
            }
          ]
        },
        {
          index: 1,
          title: CUSTOM_GRID_OPTIONS.fields.displayId.label,
          fieldId: `${CUSTOM_GRID_OPTIONS.fields.displayId.fieldId}`,
          sortable: true,
          cellTemplate: this.displayIdTemplate,
        },
        {
          index: 2,
          title: CUSTOM_GRID_OPTIONS.fields.guid.label,
          fieldId: `${CUSTOM_GRID_OPTIONS.fields.guid.fieldId}`,
          cellTemplate: this.guidTemplate,
          sortable: true
        },
        // Here as a trick we will display custom values but rather than changing
        // the id as the column below we will just piggyback an existing field (guid)
        // and just change the value at runtime in the template to our own.
        // You cannot search or filter on the custom columns as the data only existing at runtime.
        {
          index: 3,
          title: 'Order fruit',
          fieldId: `${CUSTOM_GRID_OPTIONS.fields.guid.fieldId}`,
          cellTemplate: this.customColumnBasedOnExistingField,
          sortable: false,
          filterable: false
        },
        // This is a custom column but we have to use a trick.
        // We will use a fieldId that does not exist for this column as Id
        // and during get(data) we will need to make sure to remove this fake column
        // from the list of column to fetch.
        // You cannot search or filter on the custom columns as the data only existing at runtime.
        // LMA:: TODO:: Add flag to tell UI it's a custom field and should not be fetched
        // / added to propertySelection?
        {
          index: 4,
          title: 'Animal',
          fieldId: CUSTOM_GRID_OPTIONS.nonExistingColumn,
          cellTemplate: this.nonExistingColumnTemplate,
          filterable: false,
          sortable: false
        }
      ],
      styles: 'flex-fill'
    });
  }

  // We intercept the call that fetches the data to remove the non existing field to be
  // fetched from the backend.
  private getData(queryParams: IRecordGridDataPageParams): Observable<IDataPageResult> {
    // We have to remove the non existing column from the list of columns to fetch.
    const params: IRecordGridDataPageParams = {...queryParams};
    const index = params.propertySelection.indexOf(CUSTOM_GRID_OPTIONS.nonExistingColumn);

    if (index !== -1) {
      params.propertySelection.splice(index, 1);
    }

    // This is necessary.
    // LMA:: TODO:: Why?
    delete params.searchText;

    // return data;
    return this.rxRecordInstanceDataPageService.get({params});
  }

  // This is necessary if we declare custom columns and we need to define the columns
  // using the equivalent RecordDefinition resourceType.
  private getRecordDefinition(): IRecordDefinition {
    return {
      fieldDefinitions: [
        {
          id: CUSTOM_GRID_OPTIONS.fields.fruit.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        {
          id: CUSTOM_GRID_OPTIONS.fields.displayId.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        {
          id: CUSTOM_GRID_OPTIONS.fields.guid.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        // Here as a trick we will display custom values but rather than changing
        // the id as the column below we will just piggyback an existing field
        // and just change the value at runtime in the template to our own.
        {
          id: CUSTOM_GRID_OPTIONS.fields.guid.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        // This is a custom column but we have to use a trick.
        // We will use a fieldId that does not exist for this column as Id
        // and during get(data) we will need to make sure to remove this fake column
        // from the list of column to fetch.
        {
          id: CUSTOM_GRID_OPTIONS.nonExistingColumn,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        }
      ]
    };
  }

  // We are ordering the first selected fruit.
  private orderFruit(): void {
    const selectedRow = this.fruitsRecordGrid.api.getFirstSelectedRow();

    if (selectedRow) {
      this.rxNotificationService.addSuccessMessage(`Fruit ${selectedRow[CUSTOM_GRID_OPTIONS.fields.fruit.fieldId]} ordered successfully.`)
    }
  }

  // We are ordering the fruit the user clicked on.
  private orderThisFruit(lastActionRow: IRowDataItem): void {
    if (lastActionRow) {
      this.rxNotificationService.addSuccessMessage(`Fruit ${lastActionRow[CUSTOM_GRID_OPTIONS.fields.fruit.fieldId]} ordered successfully.`)
    }
  }

  // Returning the data to display in the custom "animal" column.
  // dataItem contains the current row data.
  // column contains the column definition.
  // In this example we will take the fruit name and try to match it
  // to its animal :)
  getAnimalFromFruit(dataItem: IRowDataItem, column: ColumnConfig) {
    return CUSTOM_GRID_OPTIONS.animalMatching[dataItem[CUSTOM_GRID_OPTIONS.fields.fruit.fieldId]] || CUSTOM_GRID_OPTIONS.defaultAnimal;
  }

  // Returning the data to display in the custom "Order Fruit" column.
  customDataItem(dataItem: IRowDataItem) {
    return 'Order ' + dataItem[CUSTOM_GRID_OPTIONS.fields.fruit.fieldId];
  }

  // Called when clicking on the button in the "Order fruit" column.
  orderFruitFromCustomField(dataItem: IRowDataItem) {
    this.orderThisFruit(dataItem);
  }
}
