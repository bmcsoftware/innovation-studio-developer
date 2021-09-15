import { IBaseRecordEditorFieldComponentConfig, IBaseRecordEditorFieldProperties } from '@helix/platform/view/components';

// As this view component is a field in a record editor, we need to extend "IBaseRecordEditorFieldProperties".
// We only add here the properties that are specific to this field.
// The parameters need to be marked as optional (<name>?:<type>) to avoid an error
// in the design.model.ts when subscribing to the this.sandbox.componentProperties$.
// This is for Design Time.
export interface IStarRatingFieldDesignTimeParameters extends IBaseRecordEditorFieldProperties {
  size?: string;
  labelColor?: string;
}

// This is for Runtime, the interface extended is different from the one for the runtime.
export interface IStarRatingFieldRuntimeParameters extends IBaseRecordEditorFieldComponentConfig {
  size?: string;
  labelColor?: string;
}
