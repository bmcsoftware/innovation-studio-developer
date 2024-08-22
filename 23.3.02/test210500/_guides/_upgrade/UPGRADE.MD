<h1 style="text-align:center">Upgrade</h1>

## Table Of Contents:
* [Pre-requisites](#pre-requisites)
* [22.x to 23.x](#upgrade-22x-23x)
* [Before / After commits](#before-after)
* [Detailed steps](#detailed-steps)
* [Breaking Changes](#breaking-changes)

<a name="pre-requisites"></a>
## Pre-requisites
BMC provides documentation and tells how to upgrade a coded bundle (application or library), from one version to another.

To upgrade from a 21.3 bundle to 22.1.xx, be sure that the pre-requisites are up-to-date and that you have the right SDK:
* [pre-requisites](https://docs.bmc.com/docs/is221/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1039589980.html),

> :memo:  
> Not all steps in the documentation have been applied here.

---

<a name="upgrade-22x-23x"></a>
## 22.x to 23.x
Please follow this documentation to upgrade from 22.x to 23.x:  
* [22.x to 23.3.00](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search),

> :warning:  
> Please pay attention to the different steps are there are some breaking changes and it is required to add new annotations for View Components, View Actions and Initializers. You can see the list of [breaking changes here](BREAKING_CHANGES.MD).

---

<a name="before-after"></a>
## Before / After commits
You can see the code differences between the 22.x and 23.x versions using two commits for the upgrade:
* Bundle Testlazyloading:
  * Before (22.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/f129506770038b27638335ae5a24fb46166c6638
  * After (23.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/e798a23da04ec740c2dba5d24b6dda84b766339d, and actually a couple of commits after that for the scss files for example,
* This bundle test210500:
  * Before (22.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/7efd2e00cb3638a9ac982018f3321dac6ca5d491
  * After (23.x): https://github.com/bmcsoftware/innovation-studio-developer/commit/3d981f90c58692719dddb9e19221a3dd84e450fb

---

<a name="detailed-steps"></a>
## Detailed steps
Follow the main instructions to upgrade from [22.x to 23.3.00](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search),
  
### SDK Pre-requisites (middleware)
Here are the detailed steps that we followed to update this coded application from 22.x to 23.3.00:
* Download and install [23.3.00 SDK](https://docs.bmc.com/docs/innovationsuite/233/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1247609960.html?src=search),
  * The steps to deploy the SDK are in each upgrade documents, here this [page](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search),
* Apply the [pre-requisites](https://docs.bmc.com/docs/innovationsuite/233/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1247609960.html?src=search) (update yarn, nodeJs etc... if necessary),
  
### pom.xml modification
Changed the main [pom.xml](../../pom.xml) file sdk version to use the 23.3.00 SDK (`23.3.00-SNAPSHOT`):
  * ```xml
      <rx-sdk.version>23.3.00-SNAPSHOT</rx-sdk.version>
      ```  


### pom.xml modification
Changed the main [angular.json](../../bundle/src/main/webapp/angular.json) file to remove this property:
  * ```json
      "extractCss": true
      ```


### Folder and files cleanup
* Deleted the folders (if necessary):
  * /bundle/src/main/webapp/scripts/
  * /bundle/src/main/webapp/tools/
  * /bundle/src/main/webapp/apps/
  * /bundle/src/main/webapp/dist/
  * /bundle/src/main/webapp/styles/
  * /bundle/src/main/webapp/node_modules/
* Deleted the file [yarn.lock](../../bundle/src/main/webapp/yarn.lock),


### preinstall.js file modification
Modified the [preinstall.js](../../bundle/src/main/webapp/preinstall.js) file to replace its content by:
```ts
const path = require('path');

const preInstall = require(path.resolve(
  path.join(
    process.env.RX_SDK_HOME,
    '/client/target/web-build/webapp/dist/libs/platform/schematics/src/config/preinstall.js'
  )
));

preInstall.initialize();
```

### All View Actions
#### .module.ts: removing the bundleId property
We need to remove the deprecated `bundleId` property in the `rxViewActionRegistryService.register()`, in our case removing the line:
```ts
bundleId: 'com.example.test210500',
```

#### .service.ts: Adding the decorator @RxViewAction()
As per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search), the decorators that were optionals in 22.x are now required in 23.x. Those decorators are necessary to detect the different UI element (View Components, View Actions, Initializers) so they can be added in the bundle description. If this is not done, those elements will not be loaded and not be available in Innovation Studio.

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


### All View Components
#### registration.module.ts: removing the bundleId property
We need to remove the deprecated `bundleId` property in the `rxViewComponentRegistryService.register()`, in our case removing the line:
```ts
bundleId: 'com.example.test210500',
```

#### registration.module.ts: removing references to ComponentFactoryResolver
The ComponentFactoryResolver is deprecated by Angular and was used to declare the Runtime and Design time components. Now we just declare the Components directly:
* Instead of using componentFactory we now have a new property component,
* Instead of using designComponentFactory we now have a new property designComponent,
FROM (for example in the example [access-grid-registration.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/access-grid/access-grid-registration.module.ts)):  
```ts
import { ComponentFactoryResolver, NgModule } from '@angular/core';
// (...)
constructor(
        private rxViewComponentRegistryService: RxViewComponentRegistryService,
        private componentFactoryResolver: ComponentFactoryResolver
)
// (...)
componentFactory: this.componentFactoryResolver.resolveComponentFactory(AccessGridComponent),
designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(AccessGridDesignComponent),
```

TO:
* References to ComponentFactoryResolver needs to be removed,
* Properties componentFactory and designComponentFactory needs to be changed to component and AccessGridDesignComponent and their values adapted,:
```ts
constructor(
        private rxViewComponentRegistryService: RxViewComponentRegistryService
)
// (...)
component: AccessGridComponent,
designComponent: AccessGridDesignComponent,
```

#### registration.module.ts: removing the imports
Since it is highly recommended to leverage the Angular standalone concept, we do not need to have .module.ts files for the design time and runtime components. We can now remove the references to those modules from the registration.module.ts file, for example:  
FROM (for example in the example [access-grid-registration.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/access-grid/access-grid-registration.module.ts)):  
```ts
import { AccessGridComponent, AccessGridModule } from './runtime';
import { AccessGridDesignComponent, AccessGridDesignModel, AccessGridDesignModule } from './design';
// (...)
@NgModule({
  imports: [AccessGridDesignModule, AccessGridModule]
})
```

TO:  
```ts
import { AccessGridComponent } from './runtime';
import { AccessGridDesignComponent, AccessGridDesignModel } from './design';
// (...)
@NgModule()
```

#### design time component: removing the .module.ts file and converting the component to a standalone component
Since it is highly recommended to leverage the Angular standalone concept, we do not need to have .module.ts files for the design time and runtime components.  
However, in the .module.ts file, we could have imported third party modules necessary for the design time component, for example in the star-rating-field component example we imported the following modules `CommonModule, AdaptRxRatingModule, FormsModule, ReadOnlyFieldModule`.  
For example in the example [star-rating-field-design.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/design/) (the file is now removed):
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingFieldComponent } from './star-rating-field.component';
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';

@NgModule({
  imports: [CommonModule, AdaptRxRatingModule, FormsModule, ReadOnlyFieldModule],
  exports: [StarRatingFieldComponent],
  declarations: [StarRatingFieldComponent],
  entryComponents: [StarRatingFieldComponent]
})
export class StarRatingFieldModule {
}
```

We need to convert the design time component to standalone adding the property `standalone: true,` and add in the Component imports the exact same modules. For example in the example [star-rating-field-design.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/design/star-rating-field-design.component.ts):
```ts
import { IStarRatingParameters } from './star-rating.interface';
import { combineLatest } from 'rxjs';
import { STAR_RATING_SIZE_OPTIONS } from '../star-rating.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Necessary since we are displaying the rx-rating component at design time.
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';

@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating-design',
  templateUrl: './star-rating-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, AdaptRxRatingModule]
})
```

Once those imports are done and the component has been converted to standalone we can:
* Remove the design time file .module.ts,
* Modify the index.ts file to remove the reference to the .module.ts file we just deleted,
For example in the example [star-rating design time file index.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/design/index.ts):
```ts
export * from './star-rating-design.component';
export * from './star-rating-design.model';
// export * from './star-rating-design.module';
```

#### runtime component: removing the .module.ts file and converting the component to a standalone component
Since it is highly recommended to leverage the Angular standalone concept, we do not need to have .module.ts files for the design time and runtime components.  
However, in the .module.ts file, we could have imported third party modules necessary for the runtime component, for example in the star-rating-field component example we imported the following modules `CommonModule, AdaptRxRatingModule, FormsModule, ReadOnlyFieldModule`.  
For example in the example [star-rating-field.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/runtime) (now removed):
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingFieldDesignComponent } from './star-rating-field-design.component';
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, FormsModule, AdaptRxRatingModule],
  declarations: [StarRatingFieldDesignComponent],
  entryComponents: [StarRatingFieldDesignComponent]
})
export class StarRatingFieldDesignModule {
}
```

We need to convert the design time component to standalone adding the property `standalone: true,` and add in the Component imports the exact same modules, for example in the example [star-rating-field.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/runtime/star-rating-field.component.ts):
```ts
import { STAR_RATING_SIZE_OPTIONS} from '../../star-rating/star-rating.types';
import { takeUntil } from 'rxjs/operators';
import { isNull } from 'lodash';
import { RxViewComponent } from '@helix/platform/view/api';
import { CommonModule } from '@angular/common';
import { AdaptRxRatingModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';

@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating-field',
  templateUrl: './star-rating-field.component.html',
  standalone: true,
  imports: [CommonModule, AdaptRxRatingModule, FormsModule, ReadOnlyFieldModule]
})
@RxViewComponent({
  name: 'comExampleTest210500StarRatingField'
})
```

Once those imports are done and the component has been converted to standalone we can:
* Remove the runtime file .module.ts,
* Modify the index.ts file to remove the reference to the .module.ts file we just deleted,
For example in the example [star-rating-field runtime index.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/runtime/index.ts):
```ts
export * from './star-rating-field.component';
// export * from './star-rating-field.module';
```

#### .component.ts: Adding the decorator @RxViewComponent()
As per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search), the decorators that were optionals in 22.x are now required in 23.x. Those decorators are necessary to detect the different UI element (View Components, View Actions, Initializers) so they can be added in the bundle description. If this is not done, those elements will not be loaded and not be available in Innovation Studio.

For a View Component runtime component, we need to add the decorator `@RxViewComponent()` with as `name` the Component `type` available in its registration.module.ts. For example for the example [star-rating-field](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/) the `type` in the [star-rating-field-registration.module.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/star-rating-field-registration.module.ts) is:
```ts
type: 'comExampleTest210500StarRatingField',
```
And so in the runtime component [star-rating-field.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/star-rating-field/runtime/star-rating-field.component.ts) we would have:
```ts
import { RxViewComponent } from '@helix/platform/view/api';
// (...)
@Component({
  selector: 'com-example-test210500-com-example-test210500-star-rating-field',
  templateUrl: './star-rating-field.component.html',
  standalone: true,
  imports: [CommonModule, AdaptRxRatingModule, FormsModule, ReadOnlyFieldModule]
})
@RxViewComponent({
  name: 'comExampleTest210500StarRatingField'
})
export class StarRatingFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent, OnInit, AfterViewInit {
```

### All Initializers
As per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search), the decorators that were optionals in 22.x are now required in 23.x. Those decorators are necessary to detect the different UI element (View Components, View Actions, Initializers) so they can be added in the bundle description. If this is not done, those elements will not be loaded and not be available in Innovation Studio.
  
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


### All Pipes Services (Optional but strongly recommended)
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

### Enable the manifest
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

### Removing the deprecated ~ from the Css imports
In a lot of example we import OOTB css styles, for example in [image-click-design.scss](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/image-click/design/image-click-design.scss)
```scss
@import "~styles/variables";
```
The `~` needs to be removed now:
```scss
@import "styles/variables";
```

### Build
I rebuilt the project running the command:
```bash
  mvn clean install
```


### Fix breaking changes and rebuild
The build initially failed due to some breaking changes in third party libraries, new properties in our Apis / modules or due to Angular deprecation / security.  
The list of the different actions are listed in the [breaking changes](BREAKING_CHANGES.MD) document.  
Please also keep in mind you can see the modification for each example comparing the [commits](#before--after-commits).  
Once the modification were done, I rebuilt the project running the command:
```bash
mvn clean install
```


---

<a name="Breaking Changes"></a>
## breaking-changes
There can be breaking changes due to some library updates between major versions (Angular, RxJs, Adapt etc...), for example from 22.x to 23.x.  
There should not be breaking changes between minor versions, for example from 23.3.00 to 23.3.01.  
  
In the case of this sample application, there were some breaking changes, and some modifications had to be applied. Please check this [documentation](BREAKING_CHANGES.MD) that details the necessary modification.

