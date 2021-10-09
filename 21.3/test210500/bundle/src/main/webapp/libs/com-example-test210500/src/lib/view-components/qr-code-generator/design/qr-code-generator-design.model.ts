import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  validateCssClassName,
  validateCssClassNames,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel, RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import {
  ColorPickerFormControlComponent,
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  ISelectFormControlOptions,
  ISwitcherFormControlOptions,
  ITagAutocompleteValue,
  ITagsFormControlOptions,
  SelectFormControlComponent,
  SwitchFormControlComponent,
  TagsFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IQrCodeGeneratorParameters } from './qr-code-generator.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, pluck, skip } from 'rxjs/operators';
import { QR_CODE_GENERATOR_OPTIONS } from './qr-code-generator.types';
import { ISliderOptions } from '../../../inspectors/slider/slider.interface';
import { SliderComponent } from '../../../inspectors/slider/slider.component';

const initialComponentProperties: IQrCodeGeneratorParameters = {
  backgroundColor: '',
  color: '',
  content: '',
  fontColor: '',
  fontName: '',
  imageAsCode: false,
  label: '',
  pictureBase64: '',
  useLabel: false,
  usePicture: false,
  cssClasses: '',
  fontSize: 0,
  imageSize: 0
};

// OOTB css supported classes.
const supportedCssClasses = RX_VIEW_DEFINITION.styles.map(
  (style): ITagAutocompleteValue => ({text: style.name, data: {value: style.id}})
);

export class QrCodeGeneratorDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IQrCodeGeneratorParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // If the useLabel property change we have to add / remove some configuration fields.
    const useLabel$ = this.sandbox.componentProperties$.pipe(
      pluck('useLabel'),
      distinctUntilChanged()
    );

    // If the usePicture property change we have to add / remove some configuration fields.
    const usePicture$ = this.sandbox.componentProperties$.pipe(
      pluck('usePicture'),
      distinctUntilChanged()
    );

    // When one or the other switch changes (useLabel or usePicture) we want to update the inspector
    // configuration to add / remove the fields.
    const labelAndPicture$ = combineLatest([useLabel$,usePicture$]);

    // Resetting label input parameter values if necessary.
    useLabel$.pipe(
      skip(1)
    ).subscribe((useLabel) => {
      this.sandbox.updateComponentProperties({
        useLabel,
        // Here if the we want to use the label we reset the linked input parameters to their default values.
        // The fields themselves will be added later through the subscription of labelAndPicture$.
        ...(useLabel ?
          {
            label: useLabel ? QR_CODE_GENERATOR_OPTIONS.defaultValues.label : '',
            fontName: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontName,
            fontColor: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontColor,
            fontSize: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontSize
          }
          : {})
      })
    });

    // Resetting picture input parameter values if necessary.
    usePicture$.pipe(
      skip(1)
    ).subscribe((usePicture) => {
      this.sandbox.updateComponentProperties({
        usePicture,
        // Here if the we want to use the picture we reset the linked input parameters to their default values.
        // The fields themselves will be added later through the subscription of labelAndPicture$.
        ...(usePicture ?
          {
            pictureBase64: '',
            imageAsCode: false,
            imageSize: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontSize
          }
         : {})
      });
    });

    // Updating the input parameter list once the useLabel or usePicture are changed.
    labelAndPicture$.subscribe(([useLabel, usePicture]) => {
      // Setting the input parameters properties.
      this.sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties, useLabel, usePicture));
    });

    // Registering the view component validation based on the input parameter values.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [IQrCodeGeneratorParameters]) => {
          return this.validate(this.sandbox, componentProperties);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: IQrCodeGeneratorParameters): IQrCodeGeneratorParameters {
    return {
      backgroundColor: QR_CODE_GENERATOR_OPTIONS.defaultValues.backgroundColor,
      color: QR_CODE_GENERATOR_OPTIONS.defaultValues.color,
      content: '',
      fontColor: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontColor,
      fontName: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontName,
      fontSize: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontSize,
      imageSize: QR_CODE_GENERATOR_OPTIONS.defaultValues.fontSize,
      label: '',
      pictureBase64: '',
      cssClasses: '',
      ...initialProperties,
      //  We have to cast the boolean properties back to Boolean as it is stored as a string in the properties
      // even if declared as boolean in the registration module.
      // The BooleanFormControlComponent and SwitchFormControlComponent require a boolean value.
      useLabel: initialProperties && String(initialProperties.useLabel) === 'true',
      usePicture: initialProperties && String(initialProperties.usePicture) === 'true',
      imageAsCode: initialProperties && String(initialProperties.imageAsCode) === 'true'
    }
  }

  // Some properties depend if we want to display the label and / or the picture
  private setInspectorConfig(model, useLabel: boolean, usePicture: boolean) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'content',
              component: ExpressionFormControlComponent,
              options: {
                label: 'QR code content',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              name: 'color',
              component: ColorPickerFormControlComponent,
              options: {
                label: 'Color'
              }
            },
            {
              name: 'backgroundColor',
              component: ColorPickerFormControlComponent,
              options: {
                label: 'Background color'
              }
            },
            {
              name: 'cssStyles',
              component: TagsFormControlComponent,
              options: {
                label: 'CSS classes',
                placeholder: 'Add CSS classes',
                autocompleteValues: supportedCssClasses,
                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                errorCheck: validateCssClassName
              } as ITagsFormControlOptions
            }
          ]
        },
        {
          label: 'Label',
          controls: [
            {
              name: 'useLabel',
              component: SwitchFormControlComponent,
              options: {
                label: 'Use Label',
                tooltip: new Tooltip('The label will be displayed in the center of the Qr Code, on top of the picture (if any picture is set).')
              } as ISwitcherFormControlOptions
            },
            // If the label is selected we add four more options.
            ...(useLabel ? [
              {
                name: 'label',
                component: ExpressionFormControlComponent,
                options: {
                  label: 'Label',
                  dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                  operators: this.expressionConfigurator.getOperators(),
                  isRequired: true
                } as IExpressionFormControlOptions
              },
              {
                name: 'fontName',
                component: SelectFormControlComponent,
                options: {
                  label: 'Font name',
                  options: QR_CODE_GENERATOR_OPTIONS.fontList.map((font: string) => {
                    return {
                      id: font,
                      name: font
                    }
                  }),
                  sortAlphabetically: true,
                  isRequired: true
                } as ISelectFormControlOptions
              },
              {
                name: 'fontColor',
                component: ColorPickerFormControlComponent,
                options: {
                  label: 'Font Color'
                }
              },
              {
                name: 'fontSize',
                component: SliderComponent,
                options: {
                  label: 'Font Size',
                  minValue: 0,
                  maxValue: 100
                } as ISliderOptions
              }
            ] : [])
          ]
        },
        {
          label: 'Picture',
          controls: [
            // If the picture is selected we add three more options.
            {
              name: 'usePicture',
              component: SwitchFormControlComponent,
              options: {
                label: 'Use Picture',
                tooltip: new Tooltip('The picture will be displayed in the center of the Qr Code, behind of the label (if any label is set).')
              } as ISwitcherFormControlOptions
            },
            ...(usePicture ? [
              {
                name: 'pictureBase64',
                component: ExpressionFormControlComponent,
                options: {
                  label: 'picture In Base 64',
                  dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                  operators: this.expressionConfigurator.getOperators(),
                  isRequired: true
                } as IExpressionFormControlOptions
              },
              {
                name: 'imageAsCode',
                component: SwitchFormControlComponent,
                options: {
                  label: 'Display image as code',
                  tooltip: new Tooltip('The picture will be merged with the QR code.')
                } as ISwitcherFormControlOptions
              },
              {
                name: 'imageSize',
                component: SliderComponent,
                options: {
                  label: 'Image Size',
                  minValue: 0,
                  maxValue: 100
                } as ISliderOptions
              }
            ] : [])
          ]
        }
      ]
    };
  }

  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IQrCodeGeneratorParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.content) {
      validationIssues.push(sandbox.createError('Content is required.', 'content'));
    }

    validationIssues = validationIssues.concat(validateCssClassNames(model.cssClasses));

    return validationIssues;
  }
}
