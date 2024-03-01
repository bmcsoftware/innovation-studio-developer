<h1 style="text-align:center">Javascript Initializer and Global Load</h1>


## Table Of Contents
> :memo:  
> The information for the Intializer and Global Load listed here are not exhaustive and should not be taken as a tutorial.  
> Only some specific or interesting details are listed here. Please refer to the code in each relevant file
> as the code is heavily commented.

* [Difference between Initializer and Global Load solution](#difference),
* [Initializer](#initializer),
* [Global Load](#global-load),

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