import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';
import { GetAssetPathService } from '../../../services/get-asset-path.service';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';

// In this example we want to trigger a javascript method from a pure javascript file
// which is in bundle/src/main/webapp/libs/com-example-test210500/src/lib/assets/scripts/lma3.js.
// As this is pure Javascript code and is not typed, Angular does not know this method
// so we need to cheat and declare the method as "any".
// Please check "dynamic-service-loader.service.ts" for more details on how to load a pure javascript library.
declare var alertMe3: any;

@Component({
  selector: 'com-example-test210500-com-example-test210500-lmame',
  styleUrls: ['lmame.component.scss'],
  templateUrl: './lmame.component.html'
})
export class LmameComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  lmame: string;
  hello: string;
  assetRootPath: string;

  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
              private getAssetPathService: GetAssetPathService) {
    super();
    // The asset root path will depend if we are running the code in Production or development (ng serve).
    this.assetRootPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');
  }

  ngOnInit() {
    // In this example we only "listen" to one specific Input Parameter (lmame)
    // and not the full configuration object.
    // The code will be triggered again only if the value is different.
    // This is done using standard rxJs operators.
    this.config.pipe(
      // Input parameter.
      pluck('lmame'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((lmame: string) => {
      this.lmame = lmame;
    });

    // As described earlier we want to call the method alertMe3 which is in a pure javascript file.
    // We need to load this javascript file first.
    // For that we coded this loader that will check if the script is loaded and if not will load it.
    // When loaded you can access the method.
    // Please check "dynamic-service-loader.service.ts" for more details.
    this.dynamicScriptLoaderServiceService.load('com.example.test210500.lma3').then(data => {
      console.log('Script loaded successfully!');
      this.hello = alertMe3('James Bond!');
    }).catch(error => console.log(error));
  }
}
