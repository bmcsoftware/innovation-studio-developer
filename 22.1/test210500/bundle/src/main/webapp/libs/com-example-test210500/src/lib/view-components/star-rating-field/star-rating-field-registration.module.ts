import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, RxViewComponentType, ViewComponentPropertyType } from '@helix/platform/view/api';
import { StarRatingFieldComponent, StarRatingFieldModule } from './runtime';
import { StarRatingFieldDesignComponent, StarRatingFieldDesignModel, StarRatingFieldDesignModule } from './design';
import { RX_BASE_FIELD_PROPERTIES } from '@helix/platform/view/components';

@NgModule({
  imports: [StarRatingFieldDesignModule, StarRatingFieldModule]
})
export class StarRatingFieldRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500StarRatingField',
      name: 'Star Rating (Field)',
      icon: 'star',
      // This is a view components that is considered as a record editor field
      // so we place it in a specific group, we allow it to be embedded in a record editor
      // using the property "canBeEmbeddedInRecordEditor" and we define in which component type
      // it can be inserted using "canBeInsertedInto", here in a record editor.
      // LMA:: TODO:: It seems 'RX_FIELD_COMPONENTS.stencilGroupName' is not available:
      // import { RX_FIELD_COMPONENTS } from '@helix/platform/view/components/field-components/field-components.constant';
      // Module not found: Error: Can't resolve '@helix/platform/view/components/field-components/field-components.constant'
      // in 'C:\dev\_angular\05\test210500\bundle\src\main\webapp\libs\com-example-test210500\src\lib\view-components\star-rating-field'
      group: 'Record editor inputs',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      canBeInsertedInto(componentTypes: string[]): boolean {
        return componentTypes.includes(RxViewComponentType.RecordEditor);
      },
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(StarRatingFieldComponent),
      // Some properties are inherited from the base record editor field design defined in "IBaseRecordEditorFieldProperties":
      //  label, model (value)
      //  fieldId: string;
      //  label: string;
      //  disabled: string;
      //  hidden: string;
      //  value?: string;
      //  styles?: string;
      // VERY IMPORTANT: Do NOT forget to concatenate the custom properties with the
      // common properties!
      // If RX_BASE_FIELD_PROPERTIES is not here an error will be triggered in "base-record-editor-field-component.class.ts"
      // LMA:: TODO:: Error: trapping in code:
      // in onConfigInitialized() because the config.recordDefinition does not contain the recordDefinition object
      // but its expression ${view.components.<guidRecordDefinition>.recordDefinition} as it was never evaluated.
      // recordInstance has the same problem.
      // So the next line returns undefined:
      // find(config.recordDefinition.fieldDefinitions) ...
      // And this one fails because this.fieldDefinition is undefined:
      // this.isRequired = this.fieldDefinition.fieldOption
      properties: RX_BASE_FIELD_PROPERTIES.concat([
        {
          name: 'size',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'labelColor',
          type: ViewComponentPropertyType.String
        }
      ]),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(StarRatingFieldDesignComponent),
      designComponentModel: StarRatingFieldDesignModel,
      bundleId: 'com.example.test210500'
      // The properties here are the same as in the star-rating view component,
      // please refer to this example for more details.
    });
  }
}
