import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IGoogleMapsComponentParameters } from '../design/google-maps-component.interface';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { Alert, BusyConfig, LoaderType } from '@bmc-ux/adapt-angular'
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';

@Component({
  selector: 'com-example-test210500-com-example-test210500-google-maps-component',
  templateUrl: './google-maps-component.component.html'
})
export class GoogleMapsComponentComponent extends BaseViewComponent implements OnInit, IViewComponent {
  @ViewChild(GoogleMap, {static: false})
  map: GoogleMap;

  @ViewChild(MapInfoWindow, {static: false})
  info: MapInfoWindow;

  guid: string;
  config: Observable<any>;
  googleMapsComponent: string;
  areResourcesLoaded = false;

  // Adapt Busy configuration.
  observer: Observer<any>;
  busyConfigSection: BusyConfig = {};

  private defaultBusyConfig: BusyConfig = {
    message: 'Loading the address.',
    busy: null,
    backdrop: true,
    overlayClass: '',
    sticky: true,
    delay: 0,
    minDuration: 200,
    loaderType: LoaderType.SECTION,
    offsetTop: '0px'
  };

  // Google Map options:
  // The geocoder object will contain the google geocoder object but we cannot initialize it
  // right away as the Google scripts have not been loaded yet. They will be in the ngOnInit();
  geocoder = null;
  zoom = 18;
  center: google.maps.LatLngLiteral;
  markers = [];
  infoContent = '';

  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid'
  };

  // Configuration for Adapt Alert
  // We are using Adapt Alert to show that the Google Maps Api key is missing.
  // LMA:: TODO:: Localize texts.
  alertConfiguration: Alert = {
    variant: 'warning',
    title: 'Missing Google Maps Api Key: ',
    // content: 'The Google Maps api key is missing, the Google Map component will function in "development mode" and geolocalization will not work.'
    content: this.translateService.instant('com.example.test210500.view-components.google-maps-component.missing-api-key')
  };

  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
              private rxNotificationService: RxNotificationService,
              private translateService: TranslateService) {
    super();
  }

  componentData: IGoogleMapsComponentParameters;

  ngOnInit() {
    // We need to load several resources in order for the google map api to load correctly:
    // <script src="https://maps.googleapis.com/maps/api/js?key=yourkey "></script>
    // <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
    // <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    const promises: any[] = [];

    this.config.pipe(
      distinctUntilChanged(isEqual),
      takeUntil(this.destroyed$)
    ).subscribe((config: IGoogleMapsComponentParameters) => {
      this.componentData = config;

      if (this.areResourcesLoaded) {
        this.localizeAddress(this.componentData.address, this.componentData.addressName);
      } else {
        // Displaying a loader indicator as long as the scripts are not loaded.
        this.triggerBusyIndicator();

        promises.push(this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://maps.googleapis.com/maps/api/js?key=' + this.componentData.apiKey, 'google-maps-api-key'));
        promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap', 'google-maps-font'));
        promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/icon?family=Material+Icons', 'google-maps-icons'));

        Promise.all(promises).then((result) => {
          // Clearing the busy indicator.
          this.completeBusyIndicatorObserver();
          this.areResourcesLoaded = true;
          this.localizeAddress(this.componentData.address, this.componentData.addressName);
        });
      }
    });
  }

  // Geolocalizing the address using Google Maps geolocator apis.
  private localizeAddress(address: string, addressName: string): void {
    const me = this;

    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder;
    }

    if (address) {
      this.triggerBusyIndicator();

      this.geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const coordinates: google.maps.GeocoderResult = results[0];

          me.center = {
            lat: coordinates.geometry.location.lat(),
            lng: coordinates.geometry.location.lng()
          };

          me.rxNotificationService.addSuccessMessage('Address has been successfully located.');
          me.addMarker(coordinates, addressName, address);
          me.completeBusyIndicatorObserver();
        } else {
          me.completeBusyIndicatorObserver();
          me.rxNotificationService.addWarningMessage('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  private addMarker(coordinates: google.maps.GeocoderResult, addressName: string, address: string): void {
    this.markers = [];

    this.markers.push({
      position: {
        lat: coordinates.geometry.location.lat(),
        lng: coordinates.geometry.location.lng()
      },
      label: {
        color: 'blue',
        text: addressName
      },
      title: addressName,
      info: address,
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    });
  }

  // Used for the busy indicator, we set an observer and will complete it
  // when we want to.
  private waitingAddressResolution(observer: Observer<any>): void {
    this.observer = observer;
  }

  // Triggering the busy indicator. For this we need to set the configuration
  // again with a new Observable.
  private triggerBusyIndicator() {
    // Setting the busy indicator configuration again using the
    // default configuration.
    this.busyConfigSection = {
      ...this.defaultBusyConfig,
      ...{
        busy: new Observable(this.waitingAddressResolution.bind(this)).subscribe()
      }
    };
  }

  // Completing the observer used for the busy indicator.
  private completeBusyIndicatorObserver(): void {
    // Setting the observer to next / complete will "free" the busy indicator.
    // The setTimeout is necessary so the busy indicator is displayed properly
    // and respects the minDuration.
    setTimeout(() => {
      this.observer.next('');
      this.observer.complete();
    });
  }
}
