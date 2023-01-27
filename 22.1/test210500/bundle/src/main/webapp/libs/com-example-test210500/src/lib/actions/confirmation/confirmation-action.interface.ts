import { IViewActionDesignProperties } from '@helix/platform/view/api';

// This Interface will be used during runtime.
export interface IConfirmationActionProperties {
  title: string;
  message: string;
}

// This Interface will be used during design time.
export interface IConfirmationActionDesignProperties extends IViewActionDesignProperties{
  title: string;
  message: string;
}
