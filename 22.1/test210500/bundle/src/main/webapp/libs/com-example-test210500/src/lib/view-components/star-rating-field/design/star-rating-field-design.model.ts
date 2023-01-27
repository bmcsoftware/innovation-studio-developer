import { BaseRecordEditorFieldDesign } from '@helix/platform/view/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { Observable, of } from 'rxjs';
import { IStarRatingFieldDesignTimeParameters } from './star-rating-field.interface';
import { Injector } from '@angular/core';
import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  IViewDesignerInspectorConfig
} from '@helix/platform/view/designer';
import { map, switchMap } from 'rxjs/operators';
import {
  ColorPickerFormControlComponent,
  ISelectFormControlOptions,
  SelectFormControlComponent
} from '@helix/platform/shared/components';
import { toUpper, values } from 'lodash';
import { IViewDesignerInspectorSectionConfig } from '@helix/platform/view/designer/public-interfaces/view-designer-inspector.types';
import { STAR_RATING_FIELD_SIZE_OPTIONS } from '../star-rating-field.types';

export class StarRatingFieldDesignModel extends BaseRecordEditorFieldDesign {
  // This is the list of record instance fields types that can be used for the Star Rating field.
  fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.integer, RX_RECORD_DEFINITION.resourceTypes.decimal, RX_RECORD_DEFINITION.resourceTypes.real];

  // Those componentProperties will be subscribed in the design component to get the latest values
  // or configuration.
  componentProperties$: Observable<IStarRatingFieldDesignTimeParameters> = this.sandbox.componentProperties$;

  constructor(public injector: Injector, public sandbox: IViewComponentDesignSandbox<IStarRatingFieldDesignTimeParameters>) {
    super(injector, sandbox);
  }

  // Setting default values and saved values to be displayed in the field properties.
  // This method is called automatically.
  // Warning: the Interface is different from the runtime one.
  static getInitialProperties(initialProperties?: IStarRatingFieldDesignTimeParameters): IStarRatingFieldDesignTimeParameters {
    return {
      // Custom field properties default values.
      size: '',
      labelColor: '#000000',
      // Common values shared across all fields.
      ...BaseRecordEditorFieldDesign.getInitialProperties(),
      // Values already saved in View Designer for this field (if any).
      ...initialProperties
    }
  }

  // This method is called automatically and will be used to set the view component
  // field properties, groups and list of fields.
  getInspectorConfig(): Observable<IViewDesignerInspectorConfig> {
    return super.getInspectorConfig()
      .pipe(
        map(
          (inspectorConfig: IViewDesignerInspectorConfig) => this.editInspectorConfig(inspectorConfig)
        )
      );
  };

  // Preparing the inspector object (the Field options displayed in the Field Properties).
  // We only need to focus on the specific field properties, not on those shared with
  // a base field like label, styles, required, hidden etc...
  private editInspectorConfig(inspectorConfig: IViewDesignerInspectorConfig) : IViewDesignerInspectorConfig {
    // We need to append the field specific properties to the inspector configuration. By default all parameters are under the "General" group.
    // We need to add more controls into the controls array or add to the existing Control.
    // Here is an example with the common property "fieldId":
      // {
      //   "inspectorSectionConfigs": [
      //   {
      //     "label": "General",
      //     "controls": [
      //       {
      //         "name": "fieldId",
      //         "options": {
      //           "label": "Field name",
      //           "required": true,
      //           "options": [
      //             {
      //               "name": "Rating",
      //               "id": "536870915"
      //             }
      //           ]
      //         }
      //       }
      //     ]
      //   }
      // ]
      // }

    // In this example we will add a new Control group 'Custom settings' in the inspectorSectionConfigs array.
    const customConfiguration: IViewDesignerInspectorSectionConfig = {
      label: 'Custom settings',
      controls: [
        {
          name: 'size',
          component: SelectFormControlComponent,
          options: {
            label: 'Size',
            // the list of options must be an array of id and name, such as:
            // [{id:'', name:''},...]
            // Both id and name must be Strings (ISelectOption[]).
            options: values(STAR_RATING_FIELD_SIZE_OPTIONS.sizeOptions),
            sortAlphabetically: false
          } as ISelectFormControlOptions
        },
        {
          name: 'labelColor',
          component: ColorPickerFormControlComponent,
          options: {
            label: 'Label Color'
          }
        }
      ]
    };

    inspectorConfig.inspectorSectionConfigs.push(customConfiguration);

    // If we wanted to add the custom properties in the "General" control we would do something like:
    // The first entry should be the "General" control group.
    // inspectorConfig.inspectorSectionConfigs[0].controls = inspectorConfig.inspectorSectionConfigs[0].controls.concat(customConfiguration.controls);

    return inspectorConfig;
  }

  // The validate method is called automatically in the case of a record field view component.
  // We add the custom validation to the existing validation list.
  // Here we do not have "required" custom parameters but we will display a warning if the label color is white
  // since it could lead to an invisible label at runtime.
  validate(componentProperties: IStarRatingFieldDesignTimeParameters): Observable<IViewComponentDesignValidationIssue[]> {
    return super.validate(componentProperties).pipe(
      switchMap((validation: IViewComponentDesignValidationIssue[]) => {
        const validationIssues: IViewComponentDesignValidationIssue[] = validation || [];

        if (toUpper(componentProperties.labelColor) === '#FFFFFF') {
          validationIssues.push(this.sandbox.createWarning('Setting the Label Color to white could lead to an invisible label.', 'labelColor'));
        }

        return of(validationIssues);
      })
    );
  }
}
