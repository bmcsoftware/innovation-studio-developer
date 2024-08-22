import { NgModule } from '@angular/core';
import { DynamicScriptLoaderServiceService } from '../services/dynamic-service-loader.service';
import { GetAssetPathService } from '../services/get-asset-path.service';

declare var alertMe3: any;

@NgModule()
export class ComExampleTest210500GlobalLoadModule {
  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
              private getAssetPathService: GetAssetPathService) {
    // LMA:: TODO:: Example simple module load scss / js at startup.
    // So this module could actually load the -asset.js that is created in the angular.json, so this way
    // all is declared in scripts and is loaded once.
    // Call it "global-load" module.
    const assetFolderPath = getAssetPathService.getAssetRootPath('com.example.test210500');

    // LMA:: Load also the /dist/com-example-test210500-asset-scripts.js, see its path what it is...

    console.log('hello world ComExampleTest210500GlobalLoadModule!');

    dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/alert-me3.js', 'alert-me3-js').then((result) => {
      alertMe3();
    });
  }
}
