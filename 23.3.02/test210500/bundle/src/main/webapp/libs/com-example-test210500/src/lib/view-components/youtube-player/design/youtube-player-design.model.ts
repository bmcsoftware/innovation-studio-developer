import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IYoutubePlayerParameters } from './youtube-player.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IYoutubePlayerParameters = {
  videoId: ''
};

export class YoutubePlayerDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IYoutubePlayerParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IYoutubePlayerParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Setting the input parameters details.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'videoId',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Youtube Video Id',
                tooltip: new Tooltip('You need to provide the video Id. For example for https://www.youtube.com/watch?v=dQw4w9WgXcQ it would be dQw4w9WgXcQ.'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation.
  // The model contains the input parameter values.
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IYoutubePlayerParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.videoId) {
      validationIssues.push(sandbox.createError('The video id is required.', 'videoId'));
    }

    return validationIssues;
  }
}
