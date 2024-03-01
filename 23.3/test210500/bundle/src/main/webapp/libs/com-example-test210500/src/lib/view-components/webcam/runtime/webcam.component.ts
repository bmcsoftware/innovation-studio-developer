import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Alert } from '@bmc-ux/adapt-angular';

// We are leveraging the ngx-webcam library:
// https://github.com/basst314/ngx-webcam
// https://github.com/basst314/ngx-webcam-demo
//
// Important note:
// If the website hosting this example has an IP address this component will not work properly as described in this GitHib issue:
// https://github.com/zxing-js/library/issues/225
// https://stackoverflow.com/questions/34197653/getusermedia-in-chrome-47-without-using-https/34198101#34198101
// This is due to web browser security enhancements that require SSL.
// If you want to test this example locally you might want to test your bundle in debug mode since localhost is as exception
// or on a system implementing SSL.
// If you have a system with an IP address there is a workaround you can try, it is to map localhost to the IP address.
// For example setting in your hosts file:
// <theWebsiteIp> localhost
@Component({
  selector: 'com-example-test210500-com-example-test210500-webcam',
  styleUrls: ['webcam.scss'],
  templateUrl: './webcam.component.html'
})
export class WebcamComponent extends BaseViewComponent implements IViewComponent, OnInit {
  guid: string;
  config: Observable<any>;
  webcam: string;
  lastCapture: string = null;
  isInitialized = true;

  alertContent = '';

  // We cannot set the configuration to null or the Adapt component will complain.
  alertConfiguration: Alert = {
    variant: 'warning',
    title: 'Camera initialization error',
    content: ''
  };

  // Overriding default apis so we can implement refresh (when the view component is refreshed a button refresh action).
  private api = {
    // We will use it to signal the view component to trigger a webcam capture.
    refresh: this.refresh.bind(this)
  };

  // This subject will be used to trigger a capture.
  private captureTrigger$ = new Subject<void>();

  ngOnInit() {
    super.ngOnInit();

    // We implement the refresh method.
    this.notifyPropertyChanged('api', this.api);
  }

  // We will use the refresh set property to signal the view component to trigger a webcam capture.
  refresh(): Observable<any> {
    this.captureTrigger$.next();

    return EMPTY;
  }

  // Method called by the Webcam component when a capture occurs.
  onCaptureImage(webcamImage: WebcamImage) {
    this.lastCapture = webcamImage.imageAsDataUrl;
    // Setting the view component output parameter with the picture as base 64 and broadcasting the value.
    this.notifyPropertyChanged('pictureBase64', webcamImage.imageAsBase64);
  }

  // Webcam initialization error.
  onInitError(error: WebcamInitError): void {
    let errorMessage = '';

    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      errorMessage = 'You did not allow access to the camera.';
    } else {
      errorMessage = error.message;
    }

    if (error.message && (error.message.includes('enumerateDevices()') || error.message.includes('UserMedia'))) {
      errorMessage = `If the website hosting this example has an IP address this component will not work properly as described in this GitHib issue:<br>
                        <a href="https://github.com/zxing-js/library/issues/225" target="_blank">Github</a><br>
                        <a href="https://stackoverflow.com/questions/34197653/getusermedia-in-chrome-47-without-using-https/34198101#34198101" target="_blank">Stack Overflow</a><br>
                        This is due to web browser security enhancements that require SSL.<br>
                        If you want to test this example locally you might want to test your bundle in debug mode since localhost is as exception<br>
                        or on a system implementing SSL.<br>
                        If you have a system with an IP address there is a workaround you can try, it is to map localhost to the IP address.<br>
                        For example setting in your hosts file:<br>
                        <theWebsiteIp> localhost`;
    }

    this.alertContent = errorMessage;
    this.isInitialized = false;
  }

  // Clicking on the picture will trigger the capture.
  onImageClick($event: void) {
    this.captureTrigger$.next();
  }

  // The webcam component subscribes to this observable.
  // When the captureTrigger$ is activated a capture request
  // will be sent to the webcam component.
  onCaptureRequested(): Observable<void> {
    return this.captureTrigger$.asObservable();
  }
}
