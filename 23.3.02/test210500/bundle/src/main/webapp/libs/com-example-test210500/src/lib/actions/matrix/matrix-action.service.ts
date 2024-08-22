import { Injectable } from '@angular/core';
import {
  IViewActionService,
  OpenViewActionModalSize,
  OpenViewActionType,
  RxViewActionService
} from '@helix/platform/view/api';
import { IMatrixActionProperties } from './matrix-action.interface';
import { get } from 'lodash';
import { EMPTY, Observable, throwError } from 'rxjs';
// We are using the dynamic script loader to load the different p5.js library and
// relevant classes.
import { DynamicScriptLoaderServiceService } from '../../services/dynamic-service-loader.service';
import { MATRIX_OPTIONS } from './matrix-action.types';
import { IViewComponentActionConfig } from '@helix/platform/view/runtime/event-manager/view-component-action-config.interface';
import { IOpenViewActionParams } from '@helix/platform/view/actions/open-view/open-view-action.types';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxViewAction } from '@helix/platform/view/api';

// In this example we want to load javascripts scripts that are in the assets folder:
// p5.js for the drawing,
// matrix.js for the screensaver main code,
// All of them are in the folder bundle/src/main/webapp/libs/com-example-test210500/src/lib/assets/scripts/.
//
// We also show how to call the Action service to:
// Open a view passing an input parameter and getting back the output parameter.

@Injectable()
@RxViewAction({
  name: 'comExampleTest210500ActionMatrix',
})
export class MatrixActionService implements IViewActionService<IMatrixActionProperties, never> {
  // We will use the dynamic script loader service to dynamically load the scripts p5.js and matrix.js.
  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
              private rxViewActionService: RxViewActionService,
              private rxNotificationService: RxNotificationService) {
  }

  // Method executed at runtime automatically.
  // In this example we display matrix type screensaver.
  execute(params: IMatrixActionProperties): Observable<never> {
    if (!document.getElementById('whiterabbit')) {
      // We want to use the cache buster because the matrix.js script will not run correctly if loaded from
      // web browser cache.
      this.dynamicScriptLoaderServiceService.setCacheBuster(true);

      this.dynamicScriptLoaderServiceService.load(MATRIX_OPTIONS.libraries.p5, MATRIX_OPTIONS.libraries.matrix).then(data => {
        this.addARabbit();
        this.playWhiteRabbit();
        console.log('Scripts loaded successfully!');
      }).catch(error => console.log(error));

      return EMPTY;
    } else {
      // Throwing an error null will stop the other actions from executing.
      return throwError(null);
    }
  }

  // Drawing a little White Rabbit.
  private addARabbit(): void {
    const whiteRabbit = document.createElement('div');
    const body = document.body;

    whiteRabbit.innerHTML = '&#128007;';
    whiteRabbit.id = 'whiterabbit';

    // Clicking on the rabbit will callback a method from this Action.
    whiteRabbit.onclick = ($event) => {
      this.onRabbitClick($event);
    };

    // The css class is defined in the _global-styles.scss file.
    whiteRabbit.classList.add('com-example-test210500-matrix-white-rabbit');
    body.appendChild(whiteRabbit);
  }

  // Inserting White Rabbit from Jefferson Airplane :)
  // Note:
  // The youtube video will not play if launched from a website with an
  // IP address, this is Youtube policy.
  private playWhiteRabbit(): void {
    const body = document.body;
    const audioDiv = document.createElement('div');

    audioDiv.style.display = 'none';
    audioDiv.innerHTML = `<iframe title='YouTube video player' type=\"text/html\" width='640'
    height='390' src='https://www.youtube.com/embed/WANNqr-vcx0?autoplay=1&loop=1' frameborder='0'
    allow="autoplay; fullscreen"></iframe>`;

    body.appendChild(audioDiv);
  }

  // When we click on the rabbit we want to execute one action,
  // here we call the "open view" action on a sample view from this bundle that expects:
  // one input parameter,
  // and:
  // returns an output parameter,
  onRabbitClick($event): void {
    const action: IViewComponentActionConfig = {
      name: 'rxOpenViewAction',
      parameters: {},
      guid: 'NA'
    };

    // Setting the parameters.
    const openViewParameters: IOpenViewActionParams = {
      viewDefinitionName: 'com.example.test210500:Sample view with input and output parameters',
      viewParams: {
        'my input parameter': 'You clicked on the Rabbit!'
      },
      presentation: {
        type: OpenViewActionType.CenteredModal,
        modalSize: OpenViewActionModalSize.Large,
        title: 'This is a view with input and output parameters'
      }
    };

    action.parameters = openViewParameters;

    this.rxViewActionService.execute(action.name, action.parameters).subscribe((result) => {
      const outputParameterValue = get(result, 'my output parameter');

      this.rxNotificationService.addSuccessMessage('The action output parameter value is ' + outputParameterValue);
    });
  }
}
