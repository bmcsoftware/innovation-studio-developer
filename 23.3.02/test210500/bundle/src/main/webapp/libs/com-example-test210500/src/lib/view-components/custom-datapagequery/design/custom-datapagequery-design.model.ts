import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { ICustomDatapagequeryParameters } from './custom-datapagequery.interface';

const initialComponentProperties: ICustomDatapagequeryParameters = {};

export class CustomDatapagequeryDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<ICustomDatapagequeryParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
  }

  // There are no input parameters in this example.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: []
    };
  }
}
