import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import {
  IRecordGridConfig,
  IRecordGridDataPageParams,
  RecordGridComponent,
  RowSelectionMode
} from '@helix/platform/view/components';
import { DataCellTemplateParams } from '@bmc-ux/adapt-table';
import { ICustomGridParameters } from '../../custom-grid/design/custom-grid.interface';
import { IDataPageResult, RxNotificationService } from '@helix/platform/shared/api';
import { IRecordDefinition, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { CUSTOM_DATAPAGEQUERY_OPTIONS } from './custom-datapagequery.types';
import { IRowDataItem } from '@helix/platform/view/api';
import { CustomDatapagequeryDataPageService } from './custom-datapagequery-data-page.service';

@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-datapagequery',
  templateUrl: './custom-datapagequery.component.html'
})
export class CustomDatapagequeryComponent extends BaseViewComponent implements OnInit, IViewComponent {
  // Necessary to access the grid apis.
  @ViewChild('fruitsRecordGrid', {static: true})
  fruitsRecordGrid: RecordGridComponent;

  // Will be used for the price cell template.
  @ViewChild('priceTemplate', {static: true})
  priceTemplate: TemplateRef<DataCellTemplateParams>;

  guid: string;
  config: Observable<any>;
  customDatapagequery: string;

  componentData: ICustomGridParameters;
  fruitsRecordGridConfig$: Observable<IRecordGridConfig>;

  constructor(private rxNotificationService: RxNotificationService, private customDatapagequeryDataPageService: CustomDatapagequeryDataPageService) {
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
    this.fruitsRecordGrid.pageComponent = CustomDatapagequeryComponent;

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
      // The calls getRecordDefinition() and getData() are required since
      // we are using a custom datapage query to retrieve the data.
      // We need to define the columns types as they were record field definition
      // and implement the getData() call to consume the custom datapage query.
      getRecordDefinition: () => of(this.getRecordDefinition()),
      getData: (queryParams: IRecordGridDataPageParams) => this.getData(queryParams),
      enableRowSelection: RowSelectionMode.Single,
      columns: [
        {
          index: 0,
          title: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.fruit.label,
          // Here the fieldIds are actually labels as the datapagequery returns
          // key value pairs with <label>: <value>.
          fieldId: `${CUSTOM_DATAPAGEQUERY_OPTIONS.fields.fruit.fieldId}`,
          // We only allow filter, golbal search and filter for this column.
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
          title: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.price.label,
          fieldId: `${CUSTOM_DATAPAGEQUERY_OPTIONS.fields.price.fieldId}`,
          cellTemplate: this.priceTemplate,
          sortable: false,
          filterable: false
        },
        {
          index: 2,
          title: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.displayId.label,
          fieldId: `${CUSTOM_DATAPAGEQUERY_OPTIONS.fields.displayId.fieldId}`,
          sortable: false,
          filterable: false
        },
        {
          index: 3,
          title: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.guid.label,
          fieldId: `${CUSTOM_DATAPAGEQUERY_OPTIONS.fields.guid.fieldId}`,
          sortable: false,
          filterable: false
        }
      ],
      // This field is VERY important as will be used by the grid system to know what is
      // the "unique" key identifier to identify each row. This should be an unique value
      // for each row. Here we will use the "guid" value for this.
      // If you do not set this field then when selecting a row in the grid you might
      // see several rows selected as the grid might identify several rows are identical.
      recordIdField: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.guid.fieldId,
      styles: 'flex-fill'
    });
  }

  // We intercept the call that fetches the data to call the custom datapage query.
  private getData(queryParams: IRecordGridDataPageParams): Observable<IDataPageResult> {
    // In this example we only allow the column "fruit" to be filterable and sortable.
    // This also means that the main search will only work for the "fruit" column.
    // This will end up with a sort being:
    // sortBy: ["-fruit"] or sortBy: ["fruit"]
    // And the queryExpression on the format:
    // <filterExpression> AND <searchExpression>, for example if there is a filter
    // on fruit with the text "ap" and we use the main search with "le" we would have
    // automatically in the queryExpression:
    // "('fruit' = \"ap\") AND ('fruit' LIKE \"%le%\")"
    // We will have to take those cases into account in the custom datapage query.

    // Consuming the custom datapage query:
    return this.customDatapagequeryDataPageService.get({
      params: queryParams
    });
  }

  // This is necessary as we are using a custom datapage query so we need to define the columns
  // using the equivalent RecordDefinition resourceType.
  private getRecordDefinition(): IRecordDefinition {
    return {
      fieldDefinitions: [
        {
          id: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.fruit.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        {
          id: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.price.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        {
          id: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.displayId.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        },
        {
          id: CUSTOM_DATAPAGEQUERY_OPTIONS.fields.guid.fieldId,
          resourceType: RX_RECORD_DEFINITION.resourceTypes.character
        }
      ]
    };
  }

  // Ordering the first selected fruit.
  private orderFruit(): void {
    const selectedRow = this.fruitsRecordGrid.api.getFirstSelectedRow();

    if (selectedRow) {
      this.rxNotificationService.addSuccessMessage(`Fruit ${selectedRow[CUSTOM_DATAPAGEQUERY_OPTIONS.fields.fruit.fieldId]} ordered successfully.`)
    }
  }

  // Ordering the fruit the user clicked on.
  private orderThisFruit(lastActionRow: IRowDataItem): void {
    if (lastActionRow) {
      this.rxNotificationService.addSuccessMessage(`Fruit ${lastActionRow[CUSTOM_DATAPAGEQUERY_OPTIONS.fields.fruit.fieldId]} ordered successfully.`)
    }
  }

  // Called when clicking on the button in the "Order fruit" column.
  orderFruitFromPriceField(dataItem: IRowDataItem) {
    this.orderThisFruit(dataItem);
  }
}
