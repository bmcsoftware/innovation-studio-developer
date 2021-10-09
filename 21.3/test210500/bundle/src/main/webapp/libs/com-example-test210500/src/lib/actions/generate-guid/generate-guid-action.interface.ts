import { IViewActionDesignProperties } from '@helix/platform/view/api';

export interface IGenerateGuidActionProperties {
  prefix: string;
}

// This Interface will be used in the design model.
export interface IGenerateGuidActionDesignProperties extends IViewActionDesignProperties{
  prefix: string;
}
