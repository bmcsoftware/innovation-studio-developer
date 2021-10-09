import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IIframeParameters } from '../design/iframe.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IFRAME_OPTIONS } from '../design/iframe.types';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { isEqual} from 'lodash';

@Component({
  selector: 'com-example-test210500-com-example-test210500-iframe',
  templateUrl: './iframe.component.html'
})
export class IframeComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  iframe: string;
  sandboxOptions = null;
  iFrameUrl: SafeUrl;
  componentData: IIframeParameters;

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    // We subscribe to the change in the input parameters, but only when they values actually change.
    this.config.pipe(
      distinctUntilChanged(isEqual),
      takeUntil(this.destroyed$)
    ).subscribe((config: IIframeParameters) => {
      this.componentData = config;

      let url = this.componentData.url || '';

      // An Innovation Studio view url (or Chatbot) has the format:
      // /helix/index.html#/com.example.test210500/iview/com.example.test210500:VC Gradient
      // We check if we find the base url:
      // /helix/index.html#/
      // And if so we add the allow-from-domain after the index.html, such as:
      // /helix/index.html?allow-from-domain=://localhost:4200#/com.example.test210500/iview/com.example.test210500:VC%20Gradient
      if (this.componentData.addAllowFromDomain && url.includes(IFRAME_OPTIONS.innovationStudioBaseUrl)) {
        url = IFRAME_OPTIONS.innovationStudioBaseUrl.replace('#/', '?allow-from-domain=' + encodeURIComponent(window.location.origin) + '#/') + url.split(IFRAME_OPTIONS.innovationStudioBaseUrl)[1];
      }

      // We need to declare the url as safe due to Angular security.
      this.iFrameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      // Even if we had declared the sandbox options as string[] the values are stored in string
      // so we have to cheat a bit to create a string of values from the string[] which is stored as string...
      // '[\'value1\', \'value2\']' => ['value1', 'value2'] => 'value1, value2'.
      this.sandboxOptions = this.componentData.sandboxOptions ? JSON.parse(String(this.componentData.sandboxOptions)).join(' ') : '';
    });
  }
}
