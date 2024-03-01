import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ICodeViewerParameters } from '../design/code-viewer.interface';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';

// This View component will display code (typescript, html etc...) as highlighting code leveraging Adapt code viewer component.
@Component({
  selector: 'com-example-test210500-com-example-test210500-code-viewer',
  templateUrl: './code-viewer.component.html'
})
export class CodeViewerComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  codeViewer: string;

  // Input Parameters.
  componentData: ICodeViewerParameters;

  ngOnInit() {
    // We subscribe to the configuration changes to get the updated input parameters
    // but only if the configuration is different.
    // For this we leverage standard rxJs operators with the help of the isEqual lodash
    // operator.
    // We have to use isEqual as it is needed to compare nested objects.
    this.config.pipe(
      distinctUntilChanged(isEqual),
      takeUntil(this.destroyed$)
    ).subscribe((config: ICodeViewerParameters) => {
      this.componentData = config;

      // Sometimes the json is displayed as a single line, for example from a process output:
      // {"hostname":"192.168.159.133","success":true,"errorCodes":[],"errorMessage":"","challenge_ts":"2021-05-04T18:47:32","objectAsString":"HCaptchaAnswer{status=true, errorMessage='', success=true, challenge_ts='2021-05-04T18:47:32', hostname='192.168.159.133', errorCodes=[]}","status":true}
      // In this case the business analyst could decide to prettify the output to provide a better end user experience.
      // We will parse and restringify the json, but this time prettifying it to have:
      // {
      //   "hostname": "192.168.159.133",
      //   "success": true,
      //   "errorCodes": [],
      //   "errorMessage": "",
      //   "challenge_ts": "2021-05-04T18:47:32",
      //   "objectAsString": "HCaptchaAnswer{status=true, errorMessage='', success=true, challenge_ts='2021-05-04T18:47:32', hostname='192.168.159.133', errorCodes=[]}",
      //   "status": true
      // }
      if (config.prettifyJson && config.code && config.language.toUpperCase() === 'JSON') {
        this.componentData.code = JSON.stringify(JSON.parse(this.componentData.code), undefined, 2);
      }
    });
  }
}
