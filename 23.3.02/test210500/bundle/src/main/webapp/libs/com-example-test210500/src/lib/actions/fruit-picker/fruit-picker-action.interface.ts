import { IViewActionDesignProperties } from '@helix/platform/view/api';

// This Interface will be used during runtime.
// The custom attributes are dynamic so are not defined here.
export interface IFruitPickerActionProperties {
  fruit: string;
  fruitAttributes: IFruitAttributes;
}

// This Interface will be used during design time.
// The custom attributes are dynamic so are not defined here.
export interface IFruitPickerActionDesignProperties extends IViewActionDesignProperties{
  fruit: string;
}

// This interface will be used across all fruit types but the parameters will depend
// on the selected fruit.
// Some attributes are required and some are not.
export interface IFruitAttributes {
  color: string;
  isGrowingOnTrees: string;
  length?: string;
  width?: string;
  vendor?: string;
  needsToBeCooked?: string;
  isForDessertOnly?: string;
}

export interface IFruitDefinition {
  name: string;
  necessaryAttributes: IFruitAttributeDetail[];
}

export interface IFruitAttributeDetail {
  name: string;
  label?: string;
  tooltip?: string;
  type: string;
  isRequired: boolean;
}

// For rest we expect to send all attributes.
export interface IFruitRestApiPayload {
  fruit: string;
  fruitAttributes: IFruitRestAttributes;
}

export interface IFruitRestAttributes {
  color: string;
  isGrowingOnTrees: string;
  length: string;
  width: string;
  vendor: string;
  needsToBeCooked: string;
  isForDessertOnly: string;
}
