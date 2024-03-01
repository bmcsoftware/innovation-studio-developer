import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IAdminPreferencesParameters } from './admin-preferences.interface';

// There are no input parameters in this example.
const initialComponentProperties: IAdminPreferencesParameters = {
};

export class AdminPreferencesDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IAdminPreferencesParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: []
        }
      ]
    };
  }
}
