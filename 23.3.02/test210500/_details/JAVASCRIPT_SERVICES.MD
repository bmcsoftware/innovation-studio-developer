<h1 style="text-align:center">Javascript Utility Services</h1>

## Content Details:
**:warning:**  
The services detailed below are just utilities developed in the scope of this demo application and are nor provided nor supported by BMC and are provided "as is".  


## How to create one?:
For now, you need to create the file structure manually as there is no schematics for it as those are standard Angular services.    
It is advised to create them in the library "services" folder, for example:
```bash
src/main/webapp/libs/com-example-test210500/src/lib/services
```

## Best practices for a Service:
In order to avoid injection error, it is strongly recommended to modify the Services to be providedIn root to be available to all components, for example [custom-datapagequery-data-page.service.ts](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/custom-datapagequery/runtime/custom-datapagequery-data-page.service.ts):
```ts
@Injectable({
  providedIn: 'root'
})
```

## Best practices for a Pipe:
It is also recommended for the Pipes to be standalone, for example [list-icons.pipe.ts](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/list-icons/runtime/list-icons.pipe.ts):
```ts
@Pipe({
  name: 'iconFilter',
  standalone: true
})
```
Then the pipe can be imported in another standalone Component, such as in the example [list-icons](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/list-icons/runtime/list-icons.component.ts) in the imports section:
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


## Service List
> :memo:  
> The information for the Services listed here are not exhaustive and should not be taken as a tutorial.  
> Only some specific or interesting details are listed here. Please refer to each Service code as the code is heavily commented.

* [GetAssetPathService](#GetAssetPathService),
* [DynamicScriptLoaderServiceService](#DynamicScriptLoaderServiceService),

---

<a name="GetAssetPathService"></a>
### GetAssetPathService:
* Description:
    * When testing your application or library using the debug mode (npm start --apihost=192.168.159.135) the path to access the scripts / resources in the assets' folder is different from production,
    * The service will detect the current execution mode and will return the correct path to the "assets" folder,
    * You can use this service to dynamically load the resource correctly, whether it is a picture, a script or a css file.
    * You need to call the service passing as parameter the bundle name, such as:
    ```typescript
        this.rootAssetPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');
    ```
    Use it to complete the path to the different assets:
    ```typescript
      promises.push(this.dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.js', 'jspaneljs'));
      promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.css', 'jspanelcss'));
    ```
    ```html
    <img [src]="assetRootPath + 'pictures/lain.jpg'" alt="" width="200px">
    ```
* Complexity: :angel:
* Used in the example:
    * Service: DynamicScriptLoaderServiceService,
    * Views: VC Floating Panel, Test Lmame Label View Components and global css pure javascript assets,
    * View Components: floating-panel, lmame,

> **:memo:**  
> When serving the files locally the path to external resources (javascript / pictures / fonts...) will not be the same.  
> Some examples:  
> Javascript in debug mode:  
> http://localhost:4200/helix/assets/libs/test210500/resources/scripts/alert-me.js  
> Javascript in production mode:  
> http://192.168.159.131:8008/com.example.test210500/scripts/assets/resources/scripts/alert-me.js
> 
> Picture in debug mode:  
> http://localhost:4200/helix/assets/libs/test210500/resources/pictures/lain.jpg  
> Picture in production mode:  
> http://192.168.159.131:8008/com.example.test210500/scripts/assets/resources/pictures/lain.jpg
> 
> Those files are stored in:  
> src/main/webapp/libs/com-example-test210500/src/lib/assets/pictures/lain.jpg  
> src/main/webapp/libs/com-example-test210500/src/lib/assets/alert-me.js

---

<a name="DynamicScriptLoaderServiceService"></a>
### DynamicScriptLoaderServiceService:
* Description:
    * Service used to dynamically load external javascript scripts or css files at runtime,
    * Sometimes it is necessary to load external resources at runtime which are not NPM modules. This can be the case of
      Google apis for Google Maps or YouTube for example or some pure Javascript libraries,
    * This service will create html tags for scripts or css and inject them if not already injected,
    * The scripts can be hosted externally :
      ```typescript
          this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://www.youtube.com/iframe_api', 'youtube').then((result)
          // ...
          promises.push(this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://maps.googleapis.com/maps/api/js?key=' + this.componentData.apiKey, 'google-maps-api-key'));
          promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap', 'google-maps-font'));
          promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/icon?family=Material+Icons', 'google-maps-icons'));
      ```
      or within the application / library asset folder:
      ```typescript
          promises.push(this.dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.js', 'jspaneljs'));
          promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.css', 'jspanelcss'));
      ```
    * It is ALSO possible to pre-define a list of scripts in the dynamic-service-loader.service.ts file directly and refer
      them using the ids as shown in the matrix view component example:
  ```typescript
          export const ScriptStore: Scripts[] = [
              {
                  name: 'com.example.test210500.lma3',
                  src: 'scripts/alert-me3.js'
              },
              {
                  name: 'com.example.test210500.p5',
                  src: 'scripts/p5.js'
              },
              {
                  name: 'com.example.test210500.matrix',
                  src: 'scripts/matrix.js'
              }
          ];
          // ...
          this.dynamicScriptLoaderServiceService.load(MATRIX_OPTIONS.libraries.p5, MATRIX_OPTIONS.libraries.matrix).then(data => {
  ```
  * The service will use the named passed as parameter ('jspaneljs', 'jspanelcss', 'com.example.test210500.p5') to check if the script has not already been loaded in the DOM,
  * The service returns a Promise, the promise(s) return(s) when all the scripts / resources have been inserted and loaded / ready to be consumed, for example:
    ```typescript
            this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://www.youtube.com/iframe_api', 'youtube').then((result) => {
              this.config.subscribe((config: IYoutubePlayerParameters) => {
                this.videoId = config.videoId;
              });
            });
    ```
  * You can of course use a Promise array if you desire to load several resources:
    ```typescript
        const promises: any[] = [];
        // ...
        promises.push(this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://maps.googleapis.com/maps/api/js?key=' + this.componentData.apiKey, 'google-maps-api-key'));
        promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap', 'google-maps-font'));
        promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/icon?family=Material+Icons', 'google-maps-icons'));

        Promise.all(promises).then((result) => {
          // Clearing the busy indicator.
          this.completeBusyIndicatorObserver();
          this.areResourcesLoaded = true;
          this.localizeAddress(this.componentData.address, this.componentData.addressName);
        });
    ```
  * The service can load a javascript, a css stylesheet and apply a cache buster to ensure the resource is not coming from the web browser cache:
    ```typescript
        // Enabling the cache buster:
        this.dynamicScriptLoaderServiceService.setCacheBuster(true);
        // Javascript script by its url:
        this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://www.youtube.com/iframe_api', 'youtube')
        this.dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.js', 'jspaneljs')      
        // Css by its url:
        this.dynamicScriptLoaderServiceService.loadStylesheetByUrl('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap', 'google-maps-font')
        this.dynamicScriptLoaderServiceService.loadStylesheetByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.css', 'jspanelcss')
        // Pre defined script:
        this.dynamicScriptLoaderServiceService.load(MATRIX_OPTIONS.libraries.p5, MATRIX_OPTIONS.libraries.matrix) 
    ```
* Complexity: :angel: 
* Used in the example:
    * Views: AC Matrix Easter Egg, VC Floating Panel, VC YouTube Player, VC Google Maps, Test Lmame Label View Components and global css pure javascript assets,
    * View Components: floating-panel, google-maps, youtube-player, lmame, 
    * Action: matrix,
* Credits:
  * https://stackoverflow.com/questions/58166597/use-external-javascript-library-in-angular-8-application,

> **:warning:**  
> To ensure the scripts and css styles stored in the assets' folder are correctly embedded in the bundle please refer to the "assets" documentation.

> **:warning:**  
> When testing your application or library using the debug mode (npm start --apihost=192.168.159.135) the path to access the scripts / resources in the assets' folder is different from production, hence the use of the GetAssetPathService service. The GetAssetPathService service is detailed above.
