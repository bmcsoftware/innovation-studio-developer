import { IViewActionDesignProperties } from '@helix/platform/view/api';

// This Interface will be used during runtime.
export interface IConfirmationOotbActionProperties {
  title: string;
  message: string;
}

// This Interface will be used during design time.
export interface IConfirmationOotbActionDesignProperties extends IViewActionDesignProperties{
  title: string;
  message: string;
}
