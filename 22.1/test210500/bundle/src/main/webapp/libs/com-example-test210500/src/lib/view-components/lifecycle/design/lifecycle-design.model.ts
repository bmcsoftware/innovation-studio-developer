import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IDefinitionPickerComponentOptions,
  IExpressionFormControlOptions,
  ISelectFormControlOptions,
  ISwitcherFormControlOptions,
  RxDefinitionPickerComponent,
  RxDefinitionPickerType,
  SelectFormControlComponent,
  SwitchFormControlComponent
} from '@helix/platform/shared/components';
import { ILifeCycleOption, ILifecycleParameters } from './lifecycle.interface';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { distinctUntilChanged, map, skip, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import {
  IFieldDefinition,
  IRecordDefinition,
  RX_RECORD_DEFINITION,
  RxRecordDefinitionCacheService
} from '@helix/platform/record/api';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { find, forEach, map as _map, startsWith } from 'lodash';

const initialComponentProperties: ILifecycleParameters = {
  recordDefinitionName: '',
  selectionFieldId: '',
  selectionValue: ''
};

export class LifecycleDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<ILifecycleParameters> {
  private currentSelectionFields: RxSelectOption[] = [];

  // We need to declare the services outside the constructor to avoid compilation errors,
  // we need to use the injector.
  private rxModalService = this.injector.get<RxModalService>(RxModalService);
  private rxRecordDefinitionCacheService = this.injector.get<RxRecordDefinitionCacheService>(RxRecordDefinitionCacheService);

  // We will subscribe to the record definition changes to update the selection field and the selection values.
  private recordDefinitionName$ = this.sandbox.getComponentPropertyValue('recordDefinitionName');
  // We will subscribe to the selected fieldId as we need to reset the currently selected selection values.
  private selectionFieldId$ = this.sandbox.getComponentPropertyValue('selectionFieldId');

  // Fetching the selection fields from the given record definition.
  private selectionFields$ = this.recordDefinitionName$.pipe(
    switchMap((recordDefinitionName: string) => {
      return recordDefinitionName ? this.getSelectionFields(recordDefinitionName) : of([])
    })
  );

  // Fetching all selection values for a specified fieldId.
  private statusList$ = this.selectionFieldId$.pipe(
    distinctUntilChanged(),
    withLatestFrom(this.sandbox.componentProperties$),
    switchMap(([selectionFieldId, properties]: [string, ILifecycleParameters]) => {
      return selectionFieldId ? this.getSelectionFieldIdValues(selectionFieldId, properties) : of([]);
    })
  );

  // This method will be called automatically. Since in our use case we want to display the fields
  // from a specific record definition we use this method. We could also use the constructor as seen
  // in some other view components.
  rxInit(): void {
    // Initial inspector configuration
    this.sandbox.componentProperties$.pipe(take(1)).subscribe((componentProperties: ILifecycleParameters) => {
      this.sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
    });

    // This is called when the record definition name changes, we need to reset
    // the field list and the selection values.
    this.recordDefinitionName$.pipe(
      skip(1),
      withLatestFrom(this.sandbox.componentProperties$),
      takeUntil(this.sandbox.destroyed$)
    ).subscribe(([recordDefinitionName, properties]: [string, ILifecycleParameters]) => {
      const newProperties: ILifecycleParameters = {
        ...properties,
        selectionFieldId: '',
        recordDefinitionName
      }

      // LMA:: TODO:: It seems there is no setComponentProperties for view components
      // like we have for actions, so the dynamic parameters remain in the json and
      // we cannot clean them up :(
      // We need to remove the special properties (one per status).
      // As this is not possible for the moment we set all the values to null.
      // As a reminder since those are dynamic values they are stored in the definition as:
      // statusList.<selectionValue> = "true", for example:
      // statusList.0 = "false"
      forEach(newProperties, (value: string, key: string) => {
        if (startsWith(key, 'statusList.')) {
          newProperties[key] = null;
        }
      });

      this.currentSelectionFields = [];

      // Updating the component properties with the reset values and updating the inspector.
      this.sandbox.updateComponentProperties(newProperties);
      this.sandbox.updateInspectorConfig(this.setInspectorConfig(newProperties));
    });

    // Resetting the selection values when the user selects a new selection field.
    this.selectionFieldId$.pipe(
      skip(1),
      withLatestFrom(this.sandbox.componentProperties$),
      takeUntil(this.sandbox.destroyed$)
    ).subscribe(([selectionFieldId, properties]: [string, ILifecycleParameters]) => {
      const newProperties: ILifecycleParameters = {
        ...properties,
        selectionFieldId
      }

      // LMA:: TODO:: It seems there is no setComponentProperties for view components
      // like we have for actions, so the dynamic parameters remain in the json and
      // we cannot clean them up :(
      // We need to remove the special properties (one per status).
      // As this is not possible for the moment we set all the values to null.
      // As a reminder since those are dynamic values they are stored in the definition as:
      // statusList.<selectionValue> = "true", for example:
      // statusList.0 = "false"
      forEach(newProperties, (value: string, key: string) => {
        if (startsWith(key, 'statusList.')) {
          newProperties[key] = null;
        }
      });

      // Updating the component properties with the reset values and updating the inspector.
      this.sandbox.updateComponentProperties(newProperties);
      this.sandbox.updateInspectorConfig(this.setInspectorConfig(newProperties, this.currentSelectionFields));
    });

    // Once the user selects the record definition name we need to update the Inspector with the current
    // input parameter values and the list of available selection fields for this record definition.
    this.selectionFields$.pipe(
      withLatestFrom(this.sandbox.componentProperties$),
      takeUntil(this.sandbox.destroyed$)
    ).subscribe(([selectionFieldIds, properties]: [RxSelectOption[], ILifecycleParameters]) => {
      this.currentSelectionFields = selectionFieldIds;
      this.sandbox.updateInspectorConfig(this.setInspectorConfig(properties, selectionFieldIds));
    });

    // Once the user selects the selection field list we need to fetch the selection values
    // and update the inspector accordingly.
    this.statusList$.pipe(
      withLatestFrom(this.sandbox.componentProperties$),
      takeUntil(this.sandbox.destroyed$)
    ).subscribe(([statusList, properties]: [ILifeCycleOption[], ILifecycleParameters]) => {
      this.sandbox.updateInspectorConfig(this.setInspectorConfig(properties, this.currentSelectionFields, statusList));
    });

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [ILifecycleParameters]) => {
          return this.validate(this.sandbox, componentProperties);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Setting default values and saved values to be displayed in the field properties.
  // This method is called automatically.
  static getInitialProperties(initialProperties?: ILifecycleParameters): ILifecycleParameters {
    // We need to check the dynamic fields as well. Since they are switches we need to cast them
    // to boolean as they are stored as string in the view definition;
    const newProperties = {...initialProperties};

    forEach(initialProperties, (value: any, key: string) => {
      if (startsWith(key, 'statusList.')) {
        newProperties[key] = value === 'true';
      }
    });

    return {
      // Custom field properties default values.
      recordDefinitionName: '',
      selectionFieldId: '',
      // Values already saved in View Designer for this field (if any).
      ...newProperties
    }
  }

  // Creating the inspector object. It will display the different input parameters and the dynamic fields.
  // The dynamic fields are the selection values, which depend from the selection field.
  private setInspectorConfig(model: ILifecycleParameters, selectionFields: RxSelectOption[] = [], statusList: ILifeCycleOption[] = []) {
    const me = this;

    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'recordDefinitionName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'Record Definition Name',
                definitionType: RxDefinitionPickerType.RegularRecord,
                required: true,
                beforeValueChange(previousValue: string, newValue: string): Promise<boolean> {
                  if (Boolean(previousValue)) {
                    return me.rxModalService.confirm({
                      title: 'Warning',
                      modalStyle: RX_MODAL.modalStyles.warning,
                      message: 'Field Id and currently selected statuses will be cleared. Do you want to continue?'
                    });
                  } else {
                    return Promise.resolve(true);
                  }
                }
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'selectionFieldId',
              component: SelectFormControlComponent,
              options: {
                label: 'Selection Field',
                options: selectionFields,
                required: true,
                beforeValueChange(previousValue: string, newValue: string): Promise<boolean> {
                  if (Boolean(previousValue)) {
                    return me.rxModalService.confirm({
                      title: 'Warning',
                      modalStyle: RX_MODAL.modalStyles.warning,
                      message: 'Currently selected statuses will be cleared. Do you want to continue?'
                    });
                  } else {
                    return Promise.resolve(true);
                  }
                }
              } as ISelectFormControlOptions
            },
            {
              name: 'selectionValue',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Selection value',
                isRequired: true,
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators()
              } as IExpressionFormControlOptions
            }
          ]
        },
        {
          label: 'Lifecycle values',
          controls: [
            // Those values are those from the selection field (for example 0: new).
            // Those are dynamic input parameters.
            // As a reminder they are stored in the definition as:
            // statusList.<selectionValue> = "true", for example:
            // statusList.0 = "false"
            // You can look at the "fruit-picker" action for more details.
            // We build an array of input parameters (IFormControlBuilderConfig).
            ...(model.selectionFieldId ? _map(statusList, (status: ILifeCycleOption) => {
              return {
                name: `statusList.${status.id}`,
                component: SwitchFormControlComponent,
                options: {
                  label: status.name
                } as ISwitcherFormControlOptions
              }
            }) : [])
          ]
        }
      ]
    };
  }

  // Fetching the list of selection fields for the given record definition.
  // We exclude the system field "Notifier Listening".
  private getSelectionFields(recordDefinitionName: string): Observable<RxSelectOption[]> {
    return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName).pipe(
      map((recordDefinition: IRecordDefinition) => {
        return recordDefinition.fieldDefinitions
          .filter((definition: IFieldDefinition) => {
            return definition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection && definition.id !== RX_RECORD_DEFINITION.coreFieldIds.notifierListening
          })
          .map(({id, name}) => ({
            id: id.toString(),
            name
          }))
      }));
  }

  // Fetching the selection values for a given selection field.
  private getSelectionFieldIdValues(selectionFieldId: string, properties: ILifecycleParameters): Observable<RxSelectOption[]> {
    return this.rxRecordDefinitionCacheService.getRecordDefinition(properties.recordDefinitionName).pipe(
      map((recordDefinition: IRecordDefinition) => {
        const selectionField: IFieldDefinition = find(recordDefinition.fieldDefinitions, {id: Number(selectionFieldId)});

        return _map(selectionField.optionNamesById, (name: string, id: string) => {
          return {
            id,
            name
          }
        });
      })
    );
  }

  // Validations
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: ILifecycleParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.recordDefinitionName) {
      validationIssues.push(sandbox.createError('A value is required for record definition.', 'recordDefinitionName'));
    }

    if (!model.selectionFieldId) {
      validationIssues.push(sandbox.createError('A value is required for the selection field.', 'selectionFieldId'));
    }

    if (!model.selectionValue) {
      validationIssues.push(sandbox.createError('A value is required for the selection value.', 'selectionValue'));
    }

    // We need at least one selection value checked.
    if (model.selectionFieldId) {
      let isOneSelectionValueSelected = false;

      forEach(model, (value: any, key: string) => {
        if (startsWith(key, 'statusList.')) {
          if (model[key] === true || model[key] === 'true') {
            isOneSelectionValueSelected = true;
          }
        }
      });

      if (!isOneSelectionValueSelected) {
        // We just focus on the properties tab rather on one of the selection values property.
        validationIssues.push(sandbox.createError('At least one selection value must be checked.', 'selectionValue'));
      }
    }

    return validationIssues;
  }
}
