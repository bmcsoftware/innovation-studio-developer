import { IViewActionDesignProperties } from '@helix/platform/view/api';
import { IViewComponentDesignData } from '@helix/platform/view/designer';

export interface IImageClickParameters {
  title: String;
  // Declaring the actions.
  actions: IViewComponentDesignData<IViewActionDesignProperties>[];
}
