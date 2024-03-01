import { Component, Input, OnInit } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, Tooltip } from '@helix/platform/shared/api';
import { ILogParametersOptions } from './log-parameters.interface';
import { IViewComponentActionConfig } from '@helix/platform/view/runtime/event-manager/view-component-action-config.interface';
import { IOpenViewActionParams } from '@helix/platform/view/actions/open-view/open-view-action.types';
import { OpenViewActionModalSize, OpenViewActionType, RxViewActionService } from '@helix/platform/view/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeViewerService } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-log-parameters',
  templateUrl: './log-parameters.component.html',
  styleUrls: ['./log-parameters.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LogParametersComponent,
      multi: true
    },
    // When using the adapt-code-viewer component there is an error at runtime (not at debug).
    // Adapt Service cannot be injected in a Form Control Component (Inspector).
    // We need to "re" provide the service that the adapt-code-viewer consumes.
    // LMA:: TODO:: This seems to be a bug in Adapt.
    CodeViewerService
  ]
})
export class LogParametersComponent extends ValueAccessor<string> implements IFormControlComponent, OnInit {
  // This is required and contains the options defined in the design-model.ts input properties.
  // This way another input parameter could add values in this Component options.
  @Input()
  options: ILogParametersOptions;

  tooltip: Tooltip;
  inputParameters: any;

  inputParametersString = '';

  constructor(private rxViewActionService: RxViewActionService) {
    super();
  }

  ngOnInit() {
    // We subscribe to the monitored view component or action input parameters.
    // The view component or action must provide the inputProperties observable in this
    // component options.
    // You can see the View Component "test-debug-component" design.model.ts for an example.
    this.options.inputParameterAttributes$.subscribe((currentInputParameters) => {
      this.inputParameters = currentInputParameters;
      // The code viewer expects a string.
      this.inputParametersString = JSON.stringify(currentInputParameters, undefined, 2);
    });
  }

  // Clicking on the button will open a special view leveraging the
  // custom component code-viewer. The parameters will be displayed as Json.
  seeDetails(): void {
    const action: IViewComponentActionConfig = {
      name: 'rxOpenViewAction',
      parameters: {},
      guid: 'NA'
    };

    // Setting the parameters.
    const openViewParameters: IOpenViewActionParams = {
      viewDefinitionName: 'com.example.test210500:VC Code Viewer Modal',
      viewParams: {
        'code': this.inputParametersString,
        'language': 'json'
      },
      presentation: {
        type: OpenViewActionType.CenteredModal,
        modalSize: OpenViewActionModalSize.Small,
        title: 'Input Parameters'
      }
    };

    action.parameters = openViewParameters;

    this.rxViewActionService.execute(action.name, action.parameters).subscribe();
  }
}
