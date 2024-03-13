<h1 style="text-align:center">Javascript Initializer and Global Load</h1>


## Table Of Contents
> :memo:  
> The information for the Intializer and Global Load listed here are not exhaustive and should not be taken as a tutorial.  
> Only some specific or interesting details are listed here. Please refer to the code in each relevant file
> as the code is heavily commented.

* [Difference between Initializer and Global Load solution](#difference),
* [Initializer](#initializer),
* [Global Load](#global-load),
* [Note on manifest file and its impact on global Javascript files](#manifest),


---

<a name="difference"></a>
## Difference between Initializer and Global Load solution:
Both solution allow you to execute code as soon as the coded bundle (application / library) is loaded, there are however some differences:
* The Global Load solution is considered as a "workaround" to insure its code is executed immediately,
* The Initializer solution is officially supported
  * However its code is only executed at "runtime" for the coded bundle, aka for example when accessing the application / library, so not in Innovation Studio (View Designer, etc...),
  
Different use cases:
* The Global Load solution could be used for example to ensure Google Analytics would always be loaded and configured.  
* An initializer could be used to set some specific properties when the coded bundle is loaded (getting some configuration only useful for the coded bundle, etc...),

> :memo:  
> Both features are considered very advanced and are rarely used.


> :warning:  
> Be sure to check the section about the [manifest generation](#manifest) to see the impact on when the Global Css classes are loaded.


---

<a name="initializer"></a>
## Initializer:  
An Initializer is a very special code that is executed by the Platform when the bundle is loaded and "Served" at runtime.
The initializer will be called by the Platform at the very start of the bundle "execution", aka when the application "com.example.test210500" will be served / launched at runtime.
The Platform will call the initializer "comExampleTest210500Initializer", for example accessing:
```http://<server>.com:8008/helix/index.html#/com.example.test210500/view/com.example.test210500:TOC```

> :memo:  
> The Platform will not call the initializer in design time (Innovation Studio).


### How to create an Initializer?:
There is no schematics to create an Initializer as this is a very special object, however it is pretty easy to implement.
* We created a [Service](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) that implements the ```IRxApplicationInitializer``` class:
  * ```typescript
    export class ComExampleTest210500Initializer implements IRxApplicationInitializer {
    ```
  * This service must implement an ```initialize()``` method that will be automatically called by the Platform:
    * ```typescript
      initialize(): void {
      ```
* This service ```ComExampleTest210500Initializer``` needs to be declared in the [main module](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) providers array:
  * ```typescript
    providers: [
        // The bundle Initializer.
        ComExampleTest210500Initializer
    ]
    ```
  * And registered in the main module ```constructor()``` using the Service ```RxApplicationRegistryService``` ```register()``` method. We need to pass the bundle Name ('com.example.test210500' here) and the Initializer Service we just created ```ComExampleTest210500Initializer```:
    * ```typescript
      constructor(// (...),
          private comExampleTest210500Initializer: ComExampleTest210500Initializer,
          private rxApplicationRegistryService: RxApplicationRegistryService) {
              // (...)
              this.rxApplicationRegistryService.register('com.example.test210500', this.comExampleTest210500Initializer);
      ```
* This service must be described using a decorator `@RxApplicationInitializer()` with as `applicationId` the Initializer bundleId passed in the `rxApplicationRegistryService.register()` method available in its module.ts
  * For example the bundleId in the [com-example-test210500.module.ts](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) is:
    * ```ts
      this.rxApplicationRegistryService.register('com.example.test210500', this.comExampleTest210500Initializer);
      ```
  * In the Initializer service file [com-example-test210500-initializer.service.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) we would have:
    * ```ts
      @RxApplicationInitializer({
        applicationId: 'com.example.test210500',
      })
      ```
* Complexity: :hot_pepper: :hot_pepper:


---

<a name="global-load"></a>
## Global Load:
This "workaround" is here to show how to execute code as soon as the coded bundle code is loaded.  
This could be used to load a pure Javascript file immediately (Google Analytics for example).  
In our example, we are going to load a pure Javascript file and execute it.

> :memo:  
> This is considered as a Workaround and should be considered extremely carefully.


### How to create a Global Load?:
The idea is to create an Angular Module and import it in our Coded bundle main module.  
Its code will then be immediately executed when the coded bundle coded is loaded.  
* In our example, we created the standard Angular module [ComExampleTest210500GlobalLoadModule](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/global-load/global-load.module.ts) that contains a ```constructor()``` method that will execute our code:
  * ```typescript
    constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
       private getAssetPathService: GetAssetPathService) {
           console.log('hello world ComExampleTest210500GlobalLoadModule!');
    
           dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/alert-me3.js', 'alert-me3-js').then((result) => {
               alertMe3();
           });
    ```
* The new module just needs to be imported in the [main module](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/com-example-test210500-initializer.service.ts) imports array:
  * ```typescript
    imports: [
        // (...)
        // Global Load
        ComExampleTest210500GlobalLoadModule
    ]
    ```
* At runtime, you can see in the web browser console the message ```hello world ComExampleTest210500GlobalLoadModule!``` and also the result of the pure javascript method called (```alertMe3()```).
* Complexity: :hot_pepper: :hot_pepper: :hot_pepper:


> :warning:  
> Be sure to check the section about the [manifest generation](#manifest) to see the impact on when the Global Css classes are loaded.



---

<a name="manifest"></a>
## Note on manifest file and its impact on global Javascript files
As per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search), the manifest must now be generated.  
The manifest will automatically list the different View Components, View Actions and Initializers contained in a bundle. This will be used later to know which UI element belongs to and allow lazy loading, aka only load a coded bundle code if one of its element is used in a View.  
Please refer to the bundle example [testlazyloading](../../testlazyloading/README.MD) for more details.  
In order to allow the manifest creation, you need to modify the file [package.json](../../bundle/src/main/webapp/package.json) and be sure that the manifest creation is enabled (`"generate": true`):
```json
  "config": {
    "manifest": {
      "generate": true,
      "loadJs": "lazy",
      "loadCss": "lazy"
    }
```

Moreover, if you created global Javascript files that need to be loaded all the time, even when not directly accessing your coded bundle, you might have to change the `loadJs` property to always be loaded. For example if the javascript file is in a library and expected to be globally loaded even when accessing another bundle (for example an application), we need to always load the Javascript so it can be applied. In this case, you can change the property `loadJs` to `always` in the file [package.json](../bundle/src/main/webapp/package.json):
```json
  "config": {
    "manifest": {
      "generate": true,
      "loadJs": "always",
      "loadCss": "lazy"
    }
```

> :memo:  
> Please refer to the bundle example [testlazyloading](../../testlazyloading/README.MD) for more details.