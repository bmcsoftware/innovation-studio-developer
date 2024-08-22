import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IUserPreferencesParameters } from './user-preferences.interface';

// LMA:: TODO:: Add default configuration object (?) Use the one with one input parameter.
const initialComponentProperties: IUserPreferencesParameters = {
};

// LMA:: TODO:: Change implement and extend in schematics.
export class UserPreferencesDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IUserPreferencesParameters> {
  // LMA:: TODO:: Change constructor in schematics.
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
  }

  // LMA:: TODO:: Change method name in schematics.
  // Use the one with one input parameter.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: []
    };
  }
}
