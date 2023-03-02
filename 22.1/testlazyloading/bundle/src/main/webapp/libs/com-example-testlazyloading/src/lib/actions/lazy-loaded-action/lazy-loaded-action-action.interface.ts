import { IViewActionDesignProperties } from '@helix/platform/view/api';

// This Interface will be used during runtime.
export interface ILazyLoadedActionActionProperties {
  message: string;
}

// This Interface will be used during design time.
export interface ILazyLoadedActionActionDesignProperties extends IViewActionDesignProperties{
  message: string;
}
