import {IViewActionDesignProperties} from '@helix/platform/view/api';

// [23.3.02] The design time and runtime interfaces are split in two different files.
export interface ILazyLoadedActionActionDesignProperties extends IViewActionDesignProperties {
  message: string;
}