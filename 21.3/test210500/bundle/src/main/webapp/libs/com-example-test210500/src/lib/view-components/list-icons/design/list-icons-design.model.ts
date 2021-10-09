import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IListIconsParameters } from './list-icons.interface';

// There are no input parameters in this view component.
export class ListIconsDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IListIconsParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);
  }
}
