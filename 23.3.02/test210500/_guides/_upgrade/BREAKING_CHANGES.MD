<h1 style="text-align:center">Breaking Changes</h1>

## Table Of Contents:
* [Introduction](#introduction)
* [Breaking changes from 22.x to 23.x](#breaking-changes-22x-23x)
* [Breaking changes from 21.3 to 22.x](#breaking-changes-213-22x)


<a name="introduction"></a>
## Introduction
There can be breaking changes due to some library updates between major versions (Angular, RxJs, Adapt etc...), for example from 22.x to 23.x.  
There should not be breaking changes between minor versions, for example from 22.1.00 to 22.1.01.  
In the case of this sample application, there were some breaking changes, and some modifications had to be applied.  
This documentation will detail them.  
We also detail the breaking changes from 21.3 to 22.x for reference.  

---

<a name="breaking-changes-22x-23x"></a>
## Breaking changes from 22.x to 23.x  
You can see the code differences between the 22.x and 23.x versions using two commits for the upgrade:
* Bundle Testlazyloading:
  * Before (22.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/f129506770038b27638335ae5a24fb46166c6638
  * After (23.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/e798a23da04ec740c2dba5d24b6dda84b766339d, and actually a couple of commits after that for the scss files for example,
* This bundle test210500:
  * Before (22.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/7efd2e00cb3638a9ac982018f3321dac6ca5d491
  * After (23.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/3d981f90c58692719dddb9e19221a3dd84e450fb
  
  
### Third party library ngx-kjua:   
Previously we used for the example [qr-code-generator](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/qr-code-generator/) the third party library ngx-kjua 1.12.3 in the [package.json](../../bundle/src/main/webapp/libs/com-example-test210500/package.json) file:
```json
  "dependencies": {
    "@angular/google-maps": "^11.2.10",
    "@angular/youtube-player": "^11.2.10",
    "@zxing/browser": "0.0.5",
    "@zxing/library": "0.18.5",
    "@zxing/ngx-scanner": "3.1.3",
    "angular2-signaturepad": "^3.0.4",
    "ng-hcaptcha": "^1.0.0-beta.3",
    "ngx-kjua": "^1.12.3",
```
However, this version is not [compatible anymore](https://github.com/werthdavid/ngx-kjua/issues/61) with Angular 14, we needed to bump the version of this library to 2.0.4 and add one of its dependency (`kjua-svg`):
```json
  "dependencies": {
    "@angular/google-maps": "^11.2.10",
    "@angular/youtube-player": "^11.2.10",
    "@zxing/browser": "0.0.5",
    "@zxing/library": "0.18.5",
    "@zxing/ngx-scanner": "3.1.3",
    "angular2-signaturepad": "^3.0.4",
    "ng-hcaptcha": "2.3.1",
    "kjua-svg": "^1.13.1",
    "ngx-kjua": "2.0.4",
```

### Platform library change: Command line to create a View Component or View Action using BMC Helix Schematics:  
Up until now, to create a View Component or View Action that would generate default files and register the UI element, we needed to type the commands:
```bash
yarn run ng g rx-view-action "<action-name>"
yarn run ng g rx-view-component "<view-component-name>"
yarn run ng g rx-field-view-component "<view-component-name>"
```
In 23.3, we need to use `npx` instead of `yarn run`:
```bash
npx ng g rx-view-action "<action-name>"
npx ng g rx-view-component "<view-component-name>"
npx ng g rx-field-view-component "<view-component-name>"
```


### Platform library change: apply the UI elements decorators for View Component, View Action and Initializer:  
As per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search), the decorators that were optionals in 22.x are now required in 23.x. Those decorators are necessary to detect the different UI element (View Components, View Actions, Initializers) so they can be added in the bundle description. If this is not done, those elements will not be loaded and not be available in Innovation Studio.  
  
For a View Component runtime component, we need to add the decorator `@RxViewComponent()` with as `name` the Component `type` available in its registration.module.ts. For example for the example [code-viewer](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/code-viewer/) the `type` in the [code-viewer-registration.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/code-viewer/code-viewer-registration.module.ts) is:
```ts
type: 'comExampleTest210500CodeViewer',
```
And so in the runtime component [code-viewer.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/code-viewer/runtime/code-viewer.component.ts) we would have:
```ts
import { RxViewComponent } from '@helix/platform/view/api';
// (...)
@RxViewComponent({
  name: 'comExampleTest210500CodeViewer'
})
export class CodeViewerComponent extends BaseViewComponent implements OnInit, IViewComponent {
```
  
For a View Action, we need to add the decorator `@RxViewAction()` with as `name` the Action `name` available in its module.ts. For example for the example [confirmation-ootb](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/code-viewer/) the `name` in the [confirmation-ootb-action.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/actions/confirmation-ootb/confirmation-ootb-action.module.ts) is:
```ts
name: 'comExampleTest210500ActionConfirmationOotb',
label: 'Confirmation (OOTB)',
```
And so in the service file [confirmation-ootb-action.service.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/actions/confirmation-ootb/confirmation-ootb-action.service.ts) we would have:
```ts
import { RxViewAction } from '@helix/platform/view/api';
// (...)
@Injectable()
@RxViewAction({
  name: 'comExampleTest210500ActionConfirmationOotb',
})
export class ConfirmationOotbActionService implements IViewActionService<IConfirmationOotbActionProperties, any> {
```

For an Initializer, we need to add the decorator `@RxApplicationInitializer()` with as `applicationId` the Initializer bundleId passed in the `rxApplicationRegistryService.register()` method available in its module.ts. For example the bundleId in the [com-example-test210500.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) is:
```ts
this.rxApplicationRegistryService.register('com.example.test210500', this.comExampleTest210500Initializer);
```
And so in the Initializer service file [com-example-test210500-initializer.service.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) we would have:
```ts
@RxApplicationInitializer({
  applicationId: 'com.example.test210500',
})
```


### Platform library change: changes in the manifest (generation and global css):
As per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search), the manifest must now be generated.  
The manifest will automatically list the different View Components, View Actions and Initializers contained in a bundle. This will be used later to know which UI element belongs to and allow lazy loading, aka only load a coded bundle code if one of its element is used in a View.  
Please refer to the bundle example [testlazyloading](../../../testlazyloading/README.MD) for more details.  
In order to allow the manifest creation, you need to modify the file [package.json](../../bundle/src/main/webapp/package.json) and be sure that the manifest creation is enabled (`"generate": true`):
```json
  "config": {
    "manifest": {
      "generate": true,
      "loadJs": "lazy",
      "loadCss": "lazy"
    }
```
  
Moreover, if you created [global Css](../../_details/ASSETS.MD#global-css-class) to apply a Css class to a container [for example](../../_guides/_css/CSS.MD), you might have to change the loadCss property to always be loaded. For example if the Css class is in a library and used in another bundle (for example an application), we need to always load the Css so it can be applied. In this case, you can change the property `loadCss` to `always` in the file [package.json](../../bundle/src/main/webapp/package.json):  
```json
  "config": {
    "manifest": {
      "generate": true,
      "loadJs": "lazy",
      "loadCss": "always"
    }
```

> :memo:  
> Please refer to the bundle example [testlazyloading](../../../testlazyloading/README.MD) for more details.


### Platform library change: Tooltip new property (@helix/platform/shared/api):  
A new property is now required, `maxWidth`. Some examples had to be modified accordingly, for example the [Slider component](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/inspectors/slider/slider.component.ts):  
```ts
    this.tooltip = {
      content: this.options.tooltip.content,
      popoverMode: this.options.tooltip.popoverMode,
      placement: this.options.tooltip.placement,
      iconName: this.options.tooltip.iconName,
      maxWidth: 300
    };
```


### Platform library change: how to use the "rx-record-grid" html component as RecordGridModule cannot be directly used anymore (not exported)?:
It is not possible to use the `RecordGridModule` anymore. One of the example, custom-grid, was leveraging this module to create a custom version of a grid, using a custom datasource.  
In the html of our custom component [custom-grid.component.html](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/custom-grid/runtime/custom-grid.component.html) we still use the same code:  
```html
<rx-record-grid #fruitsRecordGrid [config]="fruitsRecordGridConfig$">
</rx-record-grid>
```

Previously we imported `RecordGridModule` from `@helix/platform/view/components` (see this [GitHub commit](https://github.com/bmcsoftware/innovation-studio-developer/commit/3d981f90c58692719dddb9e19221a3dd84e450fb#diff-a88a6d027268ee0cdbc5bf2fcd018a92433f7a728ad2688617bc4030123aab6a)).
```ts
// This import is necessary as we use the RecordGridComponent to display data in a grid.
import { RecordGridModule } from '@helix/platform/view/components';
// (...)
@NgModule({
    imports: [CommonModule, RecordGridModule, AdaptButtonModule],
```

Now we need to import directly `RecordGridComponent` in out Component imports section directly, here [custom-grid.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/custom-grid/runtime/custom-grid.component.ts):
```ts
import { RecordGridComponent } from '@helix/platform/view/components';
// (...)
@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-grid',
  styleUrls: ['./custom-grid.scss'],
  templateUrl: './custom-grid.component.html',
  standalone: true,
  imports: [CommonModule, AdaptButtonModule, RecordGridComponent]
})
```


### Angular change: Not possible to detect a Component in runtime anymore:
In the example "access-grid" we were trying to select the first row of the grid automatically. Since there was no public method in the OOTB `RecordGridComponent` component, we deferred to a community script [get-component.service.ts](https://github.com/bmcsoftware/innovation-studio-developer/blob/main/22.1/test210500/bundle/src/main/webapp/libs/com-example-test210500/src/lib/services/get-component.service.ts) to tap into the "parent" component, adapt-table from Adapt. It was pretty much black magic at this point :)  
It is not possible to use this service anymore due to Angular changes, however it is possible to tap into some new methods from our OOTB component.  
The best practice, if you need to tap into a grid property, is to pass the Grid Component as a View Component input parameter (evaluated with `enableExpressionEvaluation: true` so the reference stored is evaluated as the object during runtime) [access-grid-registration.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/access-grid/access-grid-registration.module.ts):
```ts
{
  // Grid component.
  name: 'gridViewComponent',
  enableExpressionEvaluation: true
}
```
Then just tap into the Component at runtime and its apis, for example in [access-grid.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/access-grid/runtime/access-grid.component.ts):
```ts
this.recordGridComponent = this.componentData.gridViewComponent;
// (...)
this.recordGridComponent.setSelectedRows([])
// (...)
this.recordGridComponent.setSelectedRows([this.recordGridComponent.getVisibleRows()[index]])
```

### Angular change: Not possible to leverage a module.forRoot() anymore:  
We use a module NgHcaptchaModule in the example [captcha](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/captcha/runtime/captcha.module.ts) using `NgHcaptchaModule.forRoot()`:
```ts
@NgModule({
    imports: [CommonModule, NgHcaptchaModule.forRoot()],
    exports: [CaptchaComponent],
    declarations: [CaptchaComponent],
    entryComponents: [CaptchaComponent]
})
```
However, now Angular does not support this anymore for standalone components (it is recommended to use [importProvidersFrom](https://angular.io/api/core/importProvidersFrom), which is not possible in our case):
`TS2322: Type ModuleWithProviders<NgHcaptchaModule> is not assignable to type any[] | Type<any>` 
Or:
`(ERROR NullInjectorError: R3InjectorError(Standalone[z])[InjectionToken CAPTCHA_CONFIG -> InjectionToken CAPTCHA_CONFIG -> InjectionToken CAPTCHA_CONFIG -> InjectionToken CAPTCHA_CONFIG -> InjectionToken CAPTCHA_CONFIG -> InjectionToken CAPTCHA_CONFIG -> InjectionToken CAPTCHA_CONFIG]:
NullInjectorError: No provider for InjectionToken CAPTCHA_CONFIG!)`  
An [issue](https://github.com/leNicDev/ng-hcaptcha/issues/80) is currently with the library GitHub repository.  
The example seems to work on debug, but not on production.


### Angular change: Not possible to set some iFrame options dynamically:
in the example [iframe](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/iframe/) we used to propose the Developer to select several options to be set in the iframe `sandbox` property:
```html
<iframe [src]="iFrameUrl"
    [sandbox]="sandboxOptions"
    [style]="componentData.cssStyles"
    [classList]="componentData.cssClasses">
</iframe>
```
However now Angular does not support this anymore for [security reasons](https://angular.io/errors/NG0910) and throws an error at runtime:
`An unexpected script error has occurred. NG0910: Angular has detected that the `sandbox` was applied as a binding to an <iframe> (used in the 'IframeComponent' component template). For security reasons, the `sandbox` can be set on an <iframe> as a static attribute only.`
Angular [proposes](https://angular.io/errors/NG0910) to use several versions of the iFrame, using ngIf to show the one that matches the options.  
  
  
### Angular change: Do not use ` anymore in Css import paths (deprecated):  
In a lot of example we import OOTB css styles, for example in [image-click-design.scss](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/image-click/design/image-click-design.scss)
```scss
@import "~styles/variables";
```
The `~` needs to be removed now:
```scss
@import "styles/variables";
```


### Services and Pipes:  
In order to avoid injection error, it is strongly recommended to modify the Services to be providedIn root to be available to all components, for example [custom-datapagequery-data-page.service.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/custom-datapagequery/runtime/custom-datapagequery-data-page.service.ts):  
```ts
@Injectable({
  providedIn: 'root'
})
```
  
It is also recommended for the Pipes to be standalone, for example [list-icons.pipe.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/list-icons/runtime/list-icons.pipe.ts):
```ts
@Pipe({
  name: 'iconFilter',
  standalone: true
})
```
Then the pipe can be imported in another standalone Component, such as in the example [list-icons](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/list-icons/runtime/list-icons.component.ts) in the imports section:
```ts
import { IconPipe } from './list-icons.pipe';
// (...)
@Component({
  selector: 'com-example-test210500-com-example-test210500-list-icons',
  styleUrls: ['./list-icons.scss'],
  templateUrl: './list-icons.component.html',
  standalone: true,
  imports: [CommonModule, AdaptRxSearchModule, FormsModule, AdaptAlertModule, IconPipe]
})
```

---

<a name="breaking-changes-213-22x"></a>
## Breaking changes from 21.3 to 22.x

### Adapt breaking changes: StackedChartType:
Adapt changed a Type from `StackedChartType` to `AdaptStackedChartType`, we had to modify the import and usage in file [bar-chart-component.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/bar-chart-component/runtime/bar-chart-component.component.ts):  
```ts
import { AdaptStackedChartType } from '@bmc-ux/adapt-charts';
// (...)
stackedColChart: AdaptStackedChartType = AdaptStackedChartType.Column;
```


### Platform library change: IRxRecordGridApi:
Innovation Studio Platform changed the location of `IRxRecordGridApi` from `@helix/platform/view/components` to `@helix/platform/view/api`, we had to modify the import and usage in file [get-data-example.interface.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/get-data-example/design/get-data-example.interface.ts):  
```ts
import { IRxRecordGridApi } from '@helix/platform/view/api';
```



### Grid filter format:
Innovation Studio Platform grid filter format has been modified due to some Adapt enhancements.  
Here the idea was to apply this filter to a grid ('Status' = "0"):
```
'7' = "0"
```

Previously the filter object was in this format:
```ts
      const filter: SelectedAdvancedFilter[] = [
        {
          filterOptionId: '7',
          value: ['0']
        }
      ];
```

And has changed now to this format:
```ts
      const filter: SelectedAdvancedFilter[] = [
        {
          filterOptionId: '7',
          value: {
            filterValue: ['0'],
            namedOptions: []
          }
        }
      ];
```

The example has been modified to reflect those changes, you can find the modification in the file [get-data-example.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/get-data-example/runtime/get-data-example.component.ts).


### Wrong return type:
This is a coding error that Angular / Typescript is now trapping, the return type of this method was not correct:
```ts
  static getInitialProperties(
    initialProperties: ViewActionDesignEditableProperties<IGetUserInformationActionDesignProperties>
  ) {
    return {initialProperties};
  }
```

It should have been:
```ts
  static getInitialProperties(
    initialProperties: ViewActionDesignEditableProperties<IGetUserInformationActionDesignProperties>
  ) {
    return initialProperties;
  }
```
The modification has been done in the file [get-user-information-action.design-model.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/actions/get-user-information/get-user-information-action.design-model.ts).


