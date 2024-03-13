import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IGetDataExampleParameters } from '../design/get-data-example.interface';
import {
  RecordInstance,
  RX_RECORD_DEFINITION,
  RxRecordInstanceDataPageService,
  RxRecordInstanceService
} from '@helix/platform/record/api';
import { IDataPageParams, IDataPageResult, RxNotificationService } from '@helix/platform/shared/api';
import { isFunction, indexOf, get, values } from 'lodash';
import { GET_DATA_EXAMPLE_OPTIONS } from './get-data-example.types';
import { KeyValueObject, SelectedAdvancedFilter } from '@bmc-ux/adapt-angular';
import { RX_ASSOCIATION_DEFINITION, RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AdaptButtonModule, AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';
import { RxJsonViewerModule } from '@helix/platform/ui-kit';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-get-data-example',
  styleUrls: ['get-data-example.scss'],
  templateUrl: './get-data-example.component.html',
  standalone: true,
  imports: [CommonModule, AdaptButtonModule, RxJsonViewerModule, AdaptCodeViewerModule]
})
@RxViewComponent({
  name: 'comExampleTest210500GetDataExample'
})
export class GetDataExampleComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  getDataExample: string;
  isDisabled = false;

  // Input parameters.
  private componentInputParametersValues: IGetDataExampleParameters;

  recordInstanceId = GET_DATA_EXAMPLE_OPTIONS.recordInstanceId;
  resultGetRecordInstance = null;
  recordInstances: KeyValueObject[] = [];
  associatedRecordInstances: KeyValueObject[] = [];
  pictureContent: SafeUrl = null;
  fileName = '';

  constructor(private rxRecordInstanceService: RxRecordInstanceService,
              private rxNotificationService: RxNotificationService,
              private rxRecordInstanceDataPageService: RxRecordInstanceDataPageService,
              private rxAssociationInstanceDataPageService: RxAssociationInstanceDataPageService,
              private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    // We subscribe to the input parameter changes.
    this.config.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((config: IGetDataExampleParameters) => {
      this.componentInputParametersValues = config;
    });
  }

  // The goal here is to:
  // Get data from a record definition (by instanceId or by an expression),
  // Get a new record instance,
  // Create a new record instance,
  // Update an existing record instance,
  // Get data from an association,
  // Download an attachment and get its download url,
  // Get an attachment picture and display it in the web browser,
  //
  // On the grids:
  // Call the refresh method,
  // Get the selectedRow,
  // Set filter,

  // Here we get a specific record instance by its id and we display it in the UI using
  // the rx-json-viewer component.
  getRecordInstanceById(): void {
    this.isDisabled = true;
    this.resultGetRecordInstance = null;

    this.rxRecordInstanceService.get(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, this.recordInstanceId).subscribe((recordInstance: RecordInstance) => {
        this.resultGetRecordInstance = recordInstance.fieldInstances;
      },
      (error) => {
        this.rxNotificationService.addErrorMessage('Error fetching record instance ' + this.recordInstanceId + ' on record definition ' + GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName + '.');
      },
      () => {
        this.isDisabled = false;
      });
  }

  // Creating a new record instance and refreshing the grid.
  createNewRecordInstance(): void {
    this.isDisabled = true;

    this.rxRecordInstanceService.getNew(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName).subscribe((recordInstance: RecordInstance) => {
      // Setting some values.
      recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, 'Automated record');
      recordInstance.setFieldValue(GET_DATA_EXAMPLE_OPTIONS.fields.textFieldId, 'This is a new record ' + Date.now());

      // We have to use the create method when creating a new record instance.
      this.rxRecordInstanceService.create(recordInstance).subscribe(() => {
          this.rxNotificationService.addSuccessMessage('New Record Created.')
          this.refreshGrid();
        },
        () => {
          this.rxNotificationService.addErrorMessage('Error creating a new record.')
        },
        () => {
          this.isDisabled = false;
        })
    });
  }

  // Fetching a record instance, updating it and refreshing the grid.
  updateRecordInstance(useHarcodedRecordInstanceId: boolean = false): void {
    let recordInstanceId = this.recordInstanceId;

    if (!useHarcodedRecordInstanceId) {
      recordInstanceId = this.getSelectedRowInstanceId('Please select a row in the grid.');

      if (!recordInstanceId) {
        return;
      }
    }

    this.isDisabled = true;

    this.rxRecordInstanceService.get(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, recordInstanceId).subscribe((recordInstance: RecordInstance) => {
        recordInstance.setFieldValue(GET_DATA_EXAMPLE_OPTIONS.fields.textFieldId, 'Updated the ' + Date.now());

        this.rxRecordInstanceService.save(recordInstance).subscribe(() => {
            this.rxNotificationService.addSuccessMessage('Record updated successfully.')
            this.refreshGrid();
          },
          () => {
            this.rxNotificationService.addErrorMessage('Error updating the record instance.')
          });
      },
      () => {
        this.rxNotificationService.addErrorMessage('Error getting the record instance.')
      },
      () => {
        this.isDisabled = false;
      });
  }

  // Getting a list of record instances using datapage query.
  getRecordInstances(): void {
    const params: IDataPageParams = {
      // Record Definition to fetch data into.
      recorddefinition: GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName,
      // List of field Ids we want to fetch. This is an array of field Ids.
      propertySelection: values(GET_DATA_EXAMPLE_OPTIONS.fields).concat(values(RX_RECORD_DEFINITION.coreFieldIds)),
      // Page size (-1 = all).
      pageSize: -1,
      // Start Index (if we want to handle the pagination), 0 means we want to get
      // from the first record instance.
      startIndex: 0,
      // Query criteria. Here we want to fetch the record instances where
      // 'Status' = "New", so once using the field Ids and the status values:
      // '7' = "0"
      queryExpression: GET_DATA_EXAMPLE_OPTIONS.queryExpression
    };

    this.isDisabled = true;

    this.rxRecordInstanceDataPageService.post({params}).subscribe((results: IDataPageResult) => {
        this.recordInstances = results.data;
      },
      () => {
        this.rxNotificationService.addErrorMessage('Error fetching the record instances.');
      },
      () => {
        this.isDisabled = false;
      });
  }

  // Getting associated data.
  // For example here we fetch the countries associated to a restaurant.
  // Here we have an association "Restaurants" (nodeA) has "many to many" "Countries" (nodeB).
  // Since we select a restaurant we need to query its associated countries (nodeB).
  getAssociatedRecordInstances(): void {
    let restaurantInstanceId = '';

    const params = {
      // We want to get all possible records.
      pageSize: -1,
      // Starting from the first record.
      startIndex: 0,
      // Association to follow. nodeA (left part) is Restaurant, right part (nodeB) are countries.
      // Here we want the countries associated to a specific restaurant.
      associationDefinition: GET_DATA_EXAMPLE_OPTIONS.associationDefinitionName,
      // We want the data from the 'nodeB', here the countries.
      nodeToQuery: RX_ASSOCIATION_DEFINITION.roles.second.value,
      // The "parent" instanceId, here the nodeA (Restaurants).
      associatedRecordInstanceId: '',
      // We need only the default fields in this example (core fields).
      propertySelection: values(RX_RECORD_DEFINITION.coreFieldIds),
      useDefaultRoleNames: true
    };

    // Note:
    // It is not necessary to define the "source" record definition (here the restaurants)
    // we will devise it from the association definition name and the node to query.

    this.associatedRecordInstances = [];

    if (this.componentInputParametersValues.gridObjectAssociation && isFunction(this.componentInputParametersValues.gridObjectAssociation.getFirstSelectedRow)) {
      const selectedRow = this.componentInputParametersValues.gridObjectAssociation.getFirstSelectedRow();

      if(!selectedRow) {
        this.rxNotificationService.addWarningMessage('Please select a Restaurant in the restaurant grid.');

        return;
      }

      restaurantInstanceId = selectedRow.$ID$;
    }

    this.isDisabled = true;
    params.associatedRecordInstanceId = restaurantInstanceId;

    this.rxAssociationInstanceDataPageService.get({params}).subscribe((results: IDataPageResult) => {
        this.associatedRecordInstances = results.data;
      },
      () => {
        this.rxNotificationService.addErrorMessage('Error fetching associated data.');
      },
      () => {
        this.isDisabled = false;
      });
  }

  // Resetting all grid filters and setting a grid filter.
  setGridFilter(): void {
    if (this.componentInputParametersValues.gridObject && isFunction(this.componentInputParametersValues.gridObject.setFilter)) {
      // Resetting the grid filters.
      this.componentInputParametersValues.gridObject.setFilter(null);

      // Setting the grid filter. Here we want to display the records where the
      // 'Status' = "New"
      // So once converted with fieldIds and selection values:
      // '7' = "0".
      // The filter format is not really user friendly and is different than the one defined
      // in AngularJs implementation.
      // In the Angular implementation we have to prepare an SelectedAdvancedFilter[] object
      // Which is an array of AND conditions.
      // Each condition is an array of OR conditions that test equality, here:
      // <fieldId> = <value1> OR <fieldId> = <value2>
      // const filter: SelectedAdvancedFilter[] = [
      //   {
      //     filterOptionId: "<fieldId>",
      //     value: ["<value1>", "<value2>", ...]
      //     value: {
      //        filterValue: ["<value1>", "<value2>", ...],
      //        namedOptions: []
      //      }
      //   }
      // ];
      // If we had conditions on multiple fields for example:
      // <fieldId1> = <value1> AND (<fieldId2> = <value2> OR <fieldId2> = <value2>) we would have:
      // const filter: SelectedAdvancedFilter[] = [
      //   {
      //     filterOptionId: "<fieldId1>",
      //     value: {
      //        filterValue: ["<value1>"],
      //        namedOptions: []
      //      }
      //   },
      //   {
      //     filterOptionId: "<fieldId2>",
      //     value: {
      //        filterValue: ["<value2>", "<value3>"],
      //        namedOptions: []
      //      }
      //   }
      // ];
      //
      // So for example in our case we have the filter '7' = "0".
      // It would translate as:
      // const filter: SelectedAdvancedFilter[] = [
      //   {
      //     filterOptionId: "7",
      //     value: {
      //        filterValue: ['0'],
      //        namedOptions: []
      //      }
      //   }
      // ];

      const filter: SelectedAdvancedFilter[] = [
        {
          filterOptionId: '7',
          value: {
            filterValue: ['0'],
            namedOptions: []
          }
        }
      ];

      this.componentInputParametersValues.gridObject.setFilter(filter);
      this.componentInputParametersValues.gridObject.refresh().subscribe();
    }
  }

  // We download the attachment from the selected grid row.
  downloadAttachment(): void {
    let recordInstanceId = this.getSelectedRowInstanceId('Please select a row in the Record Instances grid to download its attachment');

    if (!recordInstanceId) {
      return;
    }

    this.isDisabled = true;

    // This method will try to download the attachment from the web browser.
    // we need first to get the record Instance to get the right filename.
    this.rxRecordInstanceService.get(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, recordInstanceId).subscribe((recordInstance: RecordInstance) => {
      const filename = recordInstance.getFieldValue(GET_DATA_EXAMPLE_OPTIONS.fields.attachmentFieldId);

      if(!filename) {
        this.rxNotificationService.addWarningMessage('It seems this record instance does not have any attachement on the given fieldId.');
      } else {
        console.log('The attachment url is ' + this.rxRecordInstanceService.getAttachmentDownloadUrl(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, GET_DATA_EXAMPLE_OPTIONS.fields.attachmentFieldId, recordInstanceId));
        this.rxRecordInstanceService.downloadAttachment(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, GET_DATA_EXAMPLE_OPTIONS.fields.attachmentFieldId, recordInstanceId, filename);
      }

      this.isDisabled = false;
    });
  }

  // We get the attachment from the selected grid row.
  getAttachment(): void {
    let recordInstanceId = this.getSelectedRowInstanceId('Please select a row in the Record Instances grid to download its attachment');

    if (!recordInstanceId) {
      return;
    }

    this.isDisabled = true;
    this.pictureContent = null;
    this.fileName = '';

    // This method will try to download the attachment from the web browser.
    // we need first to get the record Instance to get the right filename.
    this.rxRecordInstanceService.get(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, recordInstanceId).subscribe((recordInstance: RecordInstance) => {
      let extension = '';

      this.fileName = recordInstance.getFieldValue(GET_DATA_EXAMPLE_OPTIONS.fields.attachmentFieldId);

      if(!this.fileName) {
        this.rxNotificationService.addWarningMessage('It seems this record instance does not have any attachement on the given fieldId.');
      } else {
        // Dirty testing if the extension is a picture.
        extension = this.fileName.split('.').pop().toUpperCase();

        if (indexOf(GET_DATA_EXAMPLE_OPTIONS.pictureAllowedExtensions, extension) === -1) {
          this.rxNotificationService.addWarningMessage('The extension ' + extension + ' is not in the list of the allowed extension to be displayed in the web browser.');

          return;
        }

        this.rxRecordInstanceService.getAttachment(GET_DATA_EXAMPLE_OPTIONS.recordDefinitionName, GET_DATA_EXAMPLE_OPTIONS.fields.attachmentFieldId, recordInstanceId).subscribe((attachmentContent: Blob) => {
          // Creating an image object, reference:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
          if (attachmentContent) {
            const urlCreator = window.URL || window.webkitURL;

            this.pictureContent = this.domSanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(attachmentContent));
          }
        });
      }

      this.isDisabled = false;
    });
  }

  private getSelectedRowInstanceId(warningMessage): string {
    let recordInstanceId = null;

    if (this.componentInputParametersValues.gridObject && isFunction(this.componentInputParametersValues.gridObject.getFirstSelectedRow)) {
      const selectedRow = this.componentInputParametersValues.gridObject.getFirstSelectedRow();

      if (!selectedRow) {
        this.rxNotificationService.addWarningMessage(warningMessage);

        return;
      }

      recordInstanceId = selectedRow.$ID$;
    }

    return recordInstanceId;
  }

  refreshGrid(): void {
    if (this.componentInputParametersValues.gridObject && isFunction(this.componentInputParametersValues.gridObject.refresh)) {
      // Refresh is an Observable, so do not forget to subscribe to it.
      this.componentInputParametersValues.gridObject.refresh().subscribe();
    }
  }
}
