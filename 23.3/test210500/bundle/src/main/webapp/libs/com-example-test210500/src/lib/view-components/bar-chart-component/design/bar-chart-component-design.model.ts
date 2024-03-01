import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IBarChartComponentParameters } from './bar-chart-component.interface';

const initialComponentProperties: IBarChartComponentParameters = {
};

export class BarChartComponentDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IBarChartComponentParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: []
    };
  }
}
