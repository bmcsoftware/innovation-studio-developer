<h1 style="text-align:center">Upgrade</h1>

## Table Of Contents:
* [Pre-requisites](#pre-requisites)
* [21.3 to 22.x](#upgrade-213-22x)
* [Detailed steps](#detailed-steps)
* [Breaking Changes](#breaking-changes)


<a name="pre-requisites"></a>
## Pre-requisites
BMC provides documentation and tells how to upgrade a coded bundle (application or library), from one version to another.

To upgrade from a 21.3 bundle to 22.1.xx, be sure that the pre-requisites are up-to-date and that you have the right SDK:
* [pre-requisites](https://docs.bmc.com/docs/is221/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1039589980.html),


---

<a name="upgrade-213-22x"></a>
## 21.3 to 22.x
Please follow this documentation to upgrade from 21.3 to 22.1.00:  
* [21.3 to 22.1.00](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-00-1039588344.html),

> :warning:  
> Please pay attention to the specific steps around the file package.json, else it will cause issues when loading the coded application or library.

When upgrading between minor versions, BMC documentation gives the steps between minor versions, so for example if a bundle needs to be updated from 22.1.00 to 22.1.0x, the documentation would provide several pages, one per upgrade:
* [22.1.00 to 22.1.01](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-01-1139535103.html),
* [22.1.01 to 22.1.02](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-02-1139535102.html),
* [22.1.02 to 22.1.03](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-03-1145632021.html),
* [22.1.03 to 22.1.04](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-04-1172068569.html),

> :memo:  
> It is recommended to follow the different steps version by version.


---

<a name="detailed-steps"></a>
## Detailed steps
Here are the detailed steps that we followed to update this coded application from 21.3 to 22.1.03:
* Download and install [22.1.03 SDK](https://docs.bmc.com/docs/is221/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1039589980.html),
  * The steps to deploy the SDK are in each upgrade documents, here this [page](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-03-1145632021.html),
* Apply the [pre-requisites](https://docs.bmc.com/docs/is221/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1039589980.html) (update yarn, nodeJs etc... if necessary),
* Follow the main instructions to upgrade from [21.3 to 22.1.00](https://docs.bmc.com/docs/is221/upgrading-bmc-helix-innovation-studio-sdk-to-22-1-00-1039588344.html),
  * Changed the main [pom.xml](../../pom.xml) file sdk version to use the 22.1.03 SDK (`22.1.03-SNAPSHOT`):
    * ```xml
      <rx-sdk.version>22.1.03-SNAPSHOT</rx-sdk.version>
      ```
  * Modified the [package.json](../../bundle/src/main/webapp/package.json) to change the `postinstall` entry to:
    * ```json
        "postinstall": "node postinstall && ngcc --properties es2015 browser module main",
      ```
  * Modified the [package.json](../../bundle/src/main/webapp/package.json) to change the `dependencies` entry to:
    * ```json
        "dependencies": {}
      ```
  * Deleted the folders (if necessary):
    * /bundle/src/main/webapp/scripts/
    * /bundle/src/main/webapp/tools/
    * /bundle/src/main/webapp/apps/
    * /bundle/src/main/webapp/dist/
    * /bundle/src/main/webapp/styles/
    * /bundle/src/main/webapp/node_modules/
  * Deleted the file [yarn.lock](../../bundle/src/main/webapp/yarn.lock),
  * Rebuilt the project running the command:
    * ```bash
      mvn clean install
      ```

---

<a name="Breaking Changes"></a>
## breaking-changes
There can be breaking changes due to some library updates between major versions (Angular, RxJs, Adapt etc...), for example from 21.x to 22.x.  
There should not be breaking changes between minor versions, for example from 22.1.00 to 22.1.01.  

In the case of this sample application, there were some breaking changes, and some modifications had to be applied. Please check this [documentation](BREAKING_CHANGES.MD) that details the necessary modification.

