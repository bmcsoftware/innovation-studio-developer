import { Injectable } from '@angular/core';
import { IRxApplicationInitializer, RxCurrentUserService, RxLogService } from '@helix/platform/shared/api';
import { DynamicScriptLoaderServiceService } from './services/dynamic-service-loader.service';
import { GetAssetPathService } from './services/get-asset-path.service';
import { RxApplicationInitializer } from '@helix/platform/shared/api';

// In the initializer, we will call the pure javascript script:
// /assets/scripts/alert-me-initializer.js
declare var alertMeInitializer: any;

@Injectable()
@RxApplicationInitializer({
  applicationId: 'com.example.test210500',
})
export class ComExampleTest210500Initializer implements IRxApplicationInitializer {
  constructor(private rxLogService: RxLogService,
              private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
              private getAssetPathService: GetAssetPathService,
              private rxCurrentUserService: RxCurrentUserService) {
  }

  // The initializer will be called by the Platform at the very start of the bundle "execution", aka
  // when the application "com.example.test210500" will be served / launched at runtime.
  // The Platform will call the initializer initialize() method, for example accessing:
  // http://<server>.com:8008/helix/index.html#/com.example.test210500/view/com.example.test210500:TOC
  //
  // The Platform will not call the initializer in design time (Innovation Studio).
  initialize(): void {
    // Loading the script "scripts/alert-me-initializer.js" and calling its method "alertMeInitializer()":
    const assetFolderPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');

    this.dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/alert-me-initializer.js', 'alert-me-initializer.js').then((result) => {
      alertMeInitializer(this.rxCurrentUserService.getName());
    });

    this.rxLogService.log('Hi, I am being called in the bundle initializer code :)');
  }
}
