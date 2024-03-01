import { Injectable } from '@angular/core';
import { GetAssetPathService } from './get-asset-path.service';

interface Scripts {
  name: string;
  src: string;
}

// Here we setup all the external scripts.
// LMA:: The asset root path will depend if we are running the code in Production or development (ng serve)
// mode for now...
// We will get the asset root path later on.
// In the project the path is:
// bundle/src/main/webapp/libs/com-example-test210500/src/lib/assets
// Please put only there the scripts path from the /assets/ folder (without this folder)
// so a script in /assets/scripts/test.js would be in this array scripts/test.js.
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

declare var document: any;

// Source:
// https://stackoverflow.com/questions/58166597/use-external-javascript-library-in-angular-8-application
//
// The goal here is to load a javascript file which is in the lib /assets/ folder. The script, at maven build
// is put in a specific folder so can be available at runtime.
// The script is NOT minified and merged with the lib js code.
// Here the script is in the source folder:
// bundle/src/main/webapp/libs/com-example-test210500/src/lib/assets/scripts/lma3.js
// The glob in the angular.json file will make sure it is copied in a specific folder of the /dist/.
// It is VERY important that you have the bundle maven project.artifactid in the path where the files will be copied:
// /libs/<project.artifactid>/
// <artifactId>test210500</artifactId>
// So for example:
// {
//   "glob": "**/*",
//   "input": "libs/com-example-test210500/src/lib/assets/scripts/",
//   "output": "assets/libs/test210500/resources/scripts/"
// }
// The reason is at the copy resource step in maven this specific path will be copied to be embedded in the bundle jar file:
// <configuration>
//   <outputDirectory>${basedir}/target/web-build/webapp/scripts/assets</outputDirectory>
// <resources>
// <resource>
//   <directory>${basedir}/src/main/webapp/dist/apps/shell/assets/libs/${project.artifactId}</directory>
// </resource>
// </resources>
// </configuration>
// At runtime the script in this example will be available at this url:
// http://192.168.159.128:8008/com.example.test210500/scripts/assets/resources/scripts/lma3.js
// So here we could use as relative path:
// /com.example.test210500/scripts/assets/resources/scripts/lma3.js
// ../com.example.test210500/scripts/assets/resources/scripts/lma3.js

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderServiceService {
  private scripts: any = {};
  private rootAssetPath = '';
  private useCacheBuster = false;

  constructor(private getAssetPathService: GetAssetPathService) {
    // LMA:: The asset root path will depend if we are running the code in Production or development (ng serve)
    // mode for now...
    this.rootAssetPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');

    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: this.rootAssetPath + script.src
      };
    });
  }

  // LMA:: On some occasion we want to use a cache buster so the web browser cache is not loaded.
  // This, of course, needs to be be called before .load() or .loadscript() methods.
  setCacheBuster(value: boolean): void {
    this.useCacheBuster = value;
  }

  // LMA:: We can call several scripts using commas, for example:
  // .load('test.js', 'test1.js')
  load(...scripts: string[]) {
    const promises: any[] = [];

    scripts.forEach((script) => promises.push(this.loadScript(script)));

    return Promise.all(promises);
  }


  // Adding a stylesheet by its url.
  loadStylesheetByUrl(stylesheetUrl: string, stylesheetId: string) {
    if (document.getElementById(stylesheetId)) {
      return new Promise((resolve, reject) => {
        return resolve('The stylesheet is already Loaded');
      });
    } else {
      return new Promise((resolve, reject) => {
        const stylesheet = document.createElement('link');
        const cacheBuster = this.useCacheBuster ? '?v=' + Date.now() : '';

        stylesheet.id = stylesheetId;
        stylesheet.href = stylesheetUrl + cacheBuster;
        stylesheet.rel = 'stylesheet';

        if (stylesheet.readyState) {
          //IE
          stylesheet.onreadystatechange = () => {
            if (stylesheet.readyState === 'loaded' || stylesheet.readyState === 'complete') {
              stylesheet.onreadystatechange = null;
              resolve('stylesheet Loaded.');
            }
          };
        } else {
          //Others
          stylesheet.onload = () => {
            resolve('stylesheet Loaded.');
          };
        }

        stylesheet.onerror = (error: any) => resolve('Error loading the stylesheet.');
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
      });
    }
  }

  // Adding a script by its url.
  loadScriptByUrl(scriptUrl: string, scriptId: string) {
    if (document.getElementById(scriptId)) {
      return new Promise((resolve, reject) => {
        return resolve('The script is already Loaded');
      });
    } else {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const cacheBuster = this.useCacheBuster ? '?v=' + Date.now() : '';

        script.id = scriptId;
        script.src = scriptUrl + cacheBuster;

        if (script.readyState) {
          //IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              resolve('Script Loaded.');
            }
          };
        } else {
          //Others
          script.onload = () => {
            resolve('Script Loaded.');
          };
        }

        script.onerror = (error: any) => resolve('Error loading the script.');
        document.getElementsByTagName('head')[0].appendChild(script);
      });
    }
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        const cacheBuster = this.useCacheBuster ? '?v=' + Date.now() : '';

        //load script
        let script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = this.scripts[name].src + cacheBuster;

        if (script.readyState) {
          //IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {
          //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }

        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
    });
  }
}
