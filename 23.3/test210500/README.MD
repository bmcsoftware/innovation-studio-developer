# Test 23.3.00 (com.example.test210500)
History:
* Version:
  * 0.2, 2024/03/12, Updating documentation. The main documentation, breaking changes, upgrades and tutorials have been updated. The samples documentation is still a WIP. The hCaptcha example does not function properly for now and some videos have not been updated for 23.3.00 SDK yet. 
  * 0.1, 2024/02/29, Upgrading the bundle from 22.x to 23.3 SDK. This is the initial implementation, the documentation, guides, and samples documentation have not yet been updated. The hCaptcha example does not function properly for now.
* Author: Laurent Matheo.


## Table Of Contents:
* [What is this](#what-is-this),
* [Installation (using the zip file)](#installation),
* [Updating your SDK / Developer Environment (if needed)](#update),
* [Build and installation using the source code](#build),
* [Upgrade / Breaking Changes](#upgrade-breaking-changes),
* [Videos...](#videos),
* [Java Objects](#java-objects),
* [Javascript Initializer and Global Load](#initializer-global-load),
* [Javascript Inspectors, aka Form Control Components](#inspectors),
* [Javascript Actions](#actions),
* [Javascript Record Field View Components](#record-field-view-components),
* [Javascript Standalone View Components](#standalone-view-components),
* [Javascript Utility Services](#javascript-utility-services),
* [Adding Assets (javascript scrits, fonts, pictures, css classes...) to your application](#assets),
* [Localize your application, Angular and Java code](#localization),
* [Debug your Process, Rule, Angular or Java code, enable logging](#debugging-logging),
* [Coding & Naming Guidelines](#coding-naming-guidelines),
* [Tutorials / Guides](#tutorials-guides),
* [Disclaimer](#disclaimer),
* [Support](#support),
* [Links](#links),
* [Third party libraries used and credits](#credits),
* [More importantly](#more-importantly),


<a name="what-is-this"></a>
## What is this? :)
This repository hosts several source code example for Innovation Suite, aiming for 23.3.00 SDK (Angular).  


<a name="installation"></a>
## Installation (using the zip file):
You can just deploy the file "com.example.test210500-1.0-SNAPSHOT.zip" on your local development environment. The Docker images for 23.3.00 are available on the [BMC Developer Portal](https://developers.bmc.com/site/global/home/index.gsp), here are the [instructions](https://docs.bmc.com/docs/innovationsuite/233/setting-up-a-local-development-environment-1223791370.html?src=search) in our documentation.    
Here are the [instructions](https://docs.bmc.com/docs/innovationsuite/233/deploying-your-application-for-the-first-time-to-start-working-in-bmc-helix-innovation-studio-1223791377.html?src=search) to start working with Innovation Studio. 


<a name="update"></a>
## Updating your SDK / Developer Environment (if needed):
* [23.x SDK upgrade](https://docs.bmc.com/docs/innovationsuite/233/upgrading-to-the-latest-bmc-helix-innovation-studio-sdk-1247609631.html?src=search),


> :memo:  
> You can also look at the [upgrade](#upgrade-breaking-changes) section.


<a name="build"></a>
# Build and installation using the source code:
Please follow those steps:
* Prepare your developer environment installing several [pre-requisites](https://docs.bmc.com/docs/innovationsuite/233/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1247609960.html?src=search),
  * You will need nodeJs, maven, Yarn, Grunt and Java (OpenJDK).  

Here are the steps:
* Clone this GitHub repository,
* Change the content of the parent "pom.xml" file to insert your credentials, for example if you have a local developer sandbox running on localhost port 8008:
```xml
    <!-- START: Bundle specific configuration. Verify and Change as per environment -->
    <developerUserName>developer</developerUserName>
    <developerPassword>password</developerPassword>
    <!-- Server name with Jetty port. -->
    <webUrl>http://localhost:8008</webUrl>
    <!-- END: Bundle specific configuration.-->
```
* run this command to build to deploy the coded application on your developer environment as per the [documentation](https://docs.bmc.com/docs/innovationsuite/233/deploying-your-application-for-the-first-time-to-start-working-in-bmc-helix-innovation-studio-1223791377.html?src=search):
  * ```bash
    mvn clean install -Pdeploy
    ```


<a name="upgrade-breaking-changes"></a>
# Upgrade / Breaking Changes:
* The steps to upgrade this coded application are detailed in the file [UPGRADE.MD](./_guides/_upgrade/UPGRADE.MD),
* The different breaking changes from 22.x to 23.x are detailed in the file [BREAKING_CHANGES.MD](./_guides/_upgrade/BREAKING_CHANGES.MD),


<a name="videos"></a>
## Videos...
Some videos are available on my YouTube channel (mostly the tutorial for now, examples will be explained at some point):  
https://www.youtube.com/watch?v=NfVg2tfXhqQ&list=PLKhrzlPY29F-6WOmGILvC0Mu2PScxXNtt&ab_channel=matheolaurent  
  
Video content:  
* Creating an application from Maven Archetype,
* Global css class,
* Custom Javascript Action,
* Custom View Component,
* Custom Record Field View Component,
* Leveraging Adapt component,
* Leveraging external NPM library,
* Using assets (pictures),
* Custom Rest Api,
* Custom Process Activity,
* Other Java custom objects,
* Debugging Java code,

> :memo:  
> The look and feel, options in the videos can be different from the latest releases.

> :memo:  
> If advertising are playing, those are set by YouTube and not by me.

<br>
  
<a name="java-objects"></a>
## Java Objects:
[Click here to access the Java object details.](./_details/JAVA.MD)  

| Name                               | Language                                                                       | Type              | Complexity                |
|:-----------------------------------|:-------------------------------------------------------------------------------|    :----          |:--------------------------|
| SimpleProcessActivity              | [Java](./_details/JAVA.MD#SimpleProcessActivity)                               | Activity          | :hot_pepper:              |
| CheckHCaptchaToken                 | [Java](./_details/JAVA.MD#CheckHCaptchaToken)                                  | Activity          | :hot_pepper: :hot_pepper: |
| TwilioTextMessage                  | [Java](./_details/JAVA.MD#TwilioTextMessage)                                   | Activity          | :hot_pepper: :hot_pepper: |
| CreateAttachmentFromBase64File     | [Java](./_details/JAVA.MD#CreateAttachmentFromBase64File)                      | Activity          | :hot_pepper: :hot_pepper: |
| GetListSize                        | [Java](./_details/JAVA.MD#GetListSize)                                         | Activity          | :hot_pepper:              |
| GetListValueByIndex                | [Java](./_details/JAVA.MD#GetListValueByIndex)                                 | Activity          | :hot_pepper:              |
| AccessRecordInstances              | [Java](./_details/JAVA.MD#AccessRecordInstances)                               | Activity          | :hot_pepper:              |
| XmlAttachmentToJson                | [Java](./_details/JAVA.MD#XmlAttachmentToJson)                               | Activity          | :hot_pepper:              |
| SimpleRest                         | [Java](./_details/JAVA.MD#SimpleRest)                                          | Rest Api          | :hot_pepper:              |
| FruitRest                          | [Java](./_details/JAVA.MD#FruitRest)                                           | Rest Api          | :hot_pepper: :hot_pepper: |
| Test210500GeneratePasswordCommand  | [Java](./_details/JAVA.MD#Test210500GeneratePasswordCommand)                   | Command           | :hot_pepper: :hot_pepper: |
| Test210500FruitDataPageQuery       | [Java](./_details/JAVA.MD#Test210500FruitDataPageQuery)                        | Datapage Query    | :hot_pepper: :hot_pepper: |


<a name="initializer-global-load"></a>
## Javascript Initializer and Global Load:
[Click here to access the Javascript Initializer and Global Load details.](./_details/JAVASCRIPT_INITIALIZER_GLOBAL_LOAD.MD)

| Name        | Language                                                       | Type             | Complexity                             |
|:------------|:---------------------------------------------------------------|    :----         |:---------------------------------------|
| Initializer | [Javascript](./_details/JAVASCRIPT_INITIALIZER.MD#initializer) | Inspector        | :hot_pepper: :hot_pepper:              |
| Global Load | [Javascript](./_details/JAVASCRIPT_INITIALIZER.MD#global-load) | Inspector        | :hot_pepper: :hot_pepper: :hot_pepper: |



<a name="inspectors"></a>
## Javascript Inspectors, aka Form Control Components:
[Click here to access the Javascript Inspectors details.](./_details/JAVASCRIPT_INSPECTORS.MD)  

| Name                            | Language                                                          | Type             | Complexity                                          |
| :---                            |    :----                                                          |    :----         |:----------------------------------------------------|
| slider                          | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#slider)          | Inspector        | :hot_pepper:                                        |
| gradient                        | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#gradient)        | Inspector        | :hot_pepper: :hot_pepper:                           |
| log-parameters                  | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#log-parameters)  | Inspector        | :hot_pepper: :hot_pepper:                           |
| step-editor                     | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#step-editor)     | Inspector        | :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: |

<a name="actions"></a>
## Javascript Actions:
[Click here to access the Javascript Actions details.](./_details/JAVASCRIPT_ACTIONS.MD)  

| Name                            | Language                                                            | Type             | Complexity                                          |
| :---                            |    :----                                                            |    :----         |:----------------------------------------------------|
| get-user-information            | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#get-user-information) | Action           | :hot_pepper:                                        |
| notification                    | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#notification)         | Action           | :hot_pepper:                                        |
| confirmation-ootb               | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#confirmation-ootb)    | Action           | :hot_pepper:                                        |
| confirmation                    | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#confirmation)         | Action           | :hot_pepper: :hot_pepper:                           |
| fruit-picker                    | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#fruit-picker)         | Action           | :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: |
| generate-guid                   | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#generate-guid)        | Action           | :hot_pepper: :hot_pepper: :hot_pepper:              |
| matrix                          | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#matrix)               | Action           | :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: |

<a name="record-field-view-components"></a>
## Javascript Record Field View Components:
[Click here to access the Javascript Record Field View Components details.](./_details/JAVASCRIPT_RECORD_FIELD_VIEW_COMPONENTS.MD)  

| Name                            | Language                                                                              | Type                          | Complexity                |
| :---                            |:--------------------------------------------------------------------------------------|    :----                      |            :---           |
| star-rating-field               | [Javascript](./_details/JAVASCRIPT_RECORD_FIELD_VIEW_COMPONENTS.MD#star-rating-field) | Record Field View Component   | :hot_pepper: :hot_pepper: |

<a name="standalone-view-components"></a>
## Javascript Standalone View Components:
[Click here to access the Javascript View Components details.](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD)  

| Name                     | Language                                                                                      | Type              | Complexity                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------|:------------------|:---------------------------------------------------|
| label                    | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#label)                                  | View Component    | :hot_pepper:                                       |
| lmame                    | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#lmame)                                  | View Component    | :hot_pepper:                                       |
| code-viewer              | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#code-viewer)                            | View Component    | :hot_pepper:                                       |
| iframe                   | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#iframe)                                 | View Component    | :hot_pepper: :hot_pepper:                          |
| display-gradient         | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#display-gradient)                       | View Component    | :hot_pepper:                                       |
| generate-password        | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#generate-password)                      | View Component    | :hot_pepper: :hot_pepper:                          |
| youtube-player           | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#youtube-player)                         | View Component    | :hot_pepper: :hot_pepper:                          |
| google-maps-component    | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#google-maps-component)                  | View Component    | :hot_pepper: :hot_pepper:                          |
| bar-chart-component      | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#bar-chart-component)                    | View Component    | :hot_pepper:                                       |
| call-command             | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#call-command)                           | View Component    | :hot_pepper:                                       |
| call-process             | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#call-process)                           | View Component    | :hot_pepper: :hot_pepper:                          |
| webcam                   | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#webcam)                                 | View Component    | :hot_pepper: :hot_pepper:                          |
| qr-code-scanner          | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#qr-code-scanner)                        | View Component    | :hot_pepper: :hot_pepper:                          |
| digital-signature        | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#digital-signature)                      | View Component    | :hot_pepper:                                       |
| get-data-example         | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#get-data-example)                       | View Component    | :hot_pepper:                                       |
| list-icons               | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#list-icons)                             | View Component    | :hot_pepper:                                       |
| user-preferences         | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#user-preferences)                       | View Component    | :hot_pepper:                                       |
| admin-preferences        | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#admin-preferences)                      | View Component    | :hot_pepper: :hot_pepper:                          |
| captcha (non functional) | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#captcha)                                | View Component    | :hot_pepper:                                       |
| access-grid              | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#access-grid)                            | View Component    | :hot_pepper: :hot_pepper:                          |
| floating-panel           | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#floating-panel)                         | View Component    | :hot_pepper:                                       |
| test-debug-component     | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#test-debug-component)                   | View Component    | :hot_pepper:                                       |
| custom-datapagequery     | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#custom-datapagequery)                   | View Component    | :hot_pepper: :hot_pepper:                          |
| custom-grid              | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#custom-grid)                            | View Component    | :hot_pepper: :hot_pepper:                          |
| lifecycle                | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#lifecycle)                              | View Component    | :hot_pepper: :hot_pepper: :hot_pepper:             |
| wizard                   | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#wizard)                                 | View Component    | :hot_pepper:                                       |
| star-rating              | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#star-rating)                            | View Component    | :hot_pepper: :hot_pepper:                          |
| qr-code-generator        | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#qr-code-generator)                      | View Component    | :hot_pepper: :hot_pepper:                          |
| open-blade               | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#open-blade)                             | View Component    | :hot_pepper:                                       |
| image-click              | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#image-click)                            | View Component    | :hot_pepper: :hot_pepper: :hot_pepper:             |
| delay-registration       | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#delay-registration)                     | View Component    | :hot_pepper: :hot_pepper:                          |


<a name="javascript-utility-services"></a>
## Javascript Utility Services:
[Click here to access the Javascript Utility Services details.](./_details/JAVASCRIPT_SERVICES.MD)  

| Name                                | Language                                                                          | Type             | Complexity        |
| :---                                |    :----                                                                          |    :----         |     :---          |
| GetAssetPathService                 | [Javascript](./_details/JAVASCRIPT_SERVICES.MD#GetAssetPathService)               | Service          | :angel:           |
| DynamicScriptLoaderServiceService   | [Javascript](./_details/JAVASCRIPT_SERVICES.MD#DynamicScriptLoaderServiceService) | Service          | :angel:           |
| GetComponentService                 | [Javascript](./_details/JAVASCRIPT_SERVICES.MD#GetComponentService)               | Service          | :angel:           |

<a name="assets"></a>
## Adding Assets (javascript scripts, fonts, pictures, css classes...) to your application:
Sometimes it is necessary to refer to objects that are not Angular Components, Actions or Services, for example fonts, pure javascript libraries or stylesheets.  
[Click here to access to the Assets details.](./_details/ASSETS.MD)

Some examples:  
[Picture example](./_details/ASSETS.MD#example-picture)    
[Pure Javascript script and css](./_details/ASSETS.MD#example-script-css)    
[Global css class](./_details/ASSETS.MD#global-css)

<a name="localization"></a>
## Localize your application, Angular and Java code:
It is possible to localize different aspects of your application:
  * The codeless objects (views, record definition selection values etc...),
  * Some strings in your Angular code (error messages, labels...),
  * Some strings in your Java code (mainly for error messages),  

Please see the [localization](./_guides/LOCALIZATION.MD) chapter.

<a name="debugging-logging"></a>
## Debug your Process, Rule, Angular or Java code, enable logging:
It is possible to actively debug UI components (View Component, Action) or Java components (Rest Api, Activity, Command, etc...) or passively enabling logs.  

Please see the [debug and logging](./_guides/DEBUG-LOGGING.MD) chapter.

<a name="coding-naming-guidelines"></a>
## Coding & Naming Guidelines:
The main idea is to avoid using Angular Component selectors, global Css classes or Action names that could collide with BMC or other application objects.  
Please refer to this [document](./_guides/CODING_NAMING_GUIDELINES.MD).

<a name="tutorials-guides"></a>
## Tutorials / Guides:
| Name                                | Language                                                                          | Type                        |
| :---                                |    :----                                                                          |:----------------------------|
| Confirmation                        | [Javascript](./_guides/_action/ACTION.MD)                                         | Action                      |
| Star Rating                         | [Javascript](./_guides/_view-component/VIEW_COMPONENT.MD)                         | View Component              |
| Star Rating (Field)                 | [Javascript](./_guides/_record-field-view-component/VIEW_COMPONENT.MD)            | Record Field View Component |
| Global Css Style                    | [Css](./_guides/_css/CSS.MD)                                                      | Global Css Style            |
| SimpleRest                          | [Java](./_guides/_java-rest-api/REST_API.MD)                                      | Java Rest Api               |
| Google Material                     | [NPM](./_details/MATERIAL.MD               )                                      | NPM library                 |


<a name="disclaimer"></a>
# Disclaimer:
These samples are released by Laurent Matheo and are released "as is" as code samples. There is no warranty, liability or support on those examples.  
The license is now BSD 3 (see LICENSE file (https://github.com/bmcsoftware/innovation-studio-developer/blob/main/LICENSE)).  

<a name="support"></a>
# Support:
Please find support on the [BMC Developer Community](https://community.bmc.com/s/group/0F93n000000Plr8CAC/developer-community) if you have any questions or feel free to use this git repo features (bug report etc...).

<a name="links"></a>
# Links:
* [BMC Helix Youtube channel](https://www.youtube.com/channel/UCufKJEem7x7_IaTUPbTYuww),
* [BMC Developer portal](https://developers.bmc.com/site/global/home/index.gsp),
* [BMC Developer Community](https://community.bmc.com/s/group/0F93n000000Plr8CAC/developer-community),
* [BMC Documentation for BMC Helix Platform](https://docs.bmc.com/docs/innovationsuite/233/home-1222671668.html),

<a name="credits"></a>
# Third party libraries used and credits:
* Java Maven:
  * twilio with dependencies "httpclient" and "google-collections",
* NPM:
  * numeral,
  * @angular/youtube-player,
  * @angular/google-maps,
  * ngx-webcam,
  * @zxing/browser,
  * @zxing/library,
  * @zxing,
  * angular2-signaturepad,
  * ng-hcaptcha,
  * ngx-kjua,
* Pure Javascript libraries:
  * p5.js,
  * [Green Rain from emilyxxie](https://github.com/emilyxxie/green_rain/blob/master/README.md),
  * Google Maps,
  * YouTube,
  * JsPanel,
* Credits:
  * Lain (Pioneer LDC),
  * David Gilmour,
  * Pink Floyd,
  * Rick Astley,
  * Jefferson Airplane,
  * The Doors, 
* Stackoverflow discussions:
  * [use external javascript library in angular 8 application](https://stackoverflow.com/questions/58166597/use-external-javascript-library-in-angular-8-application),
  * [Angular issue 8277](https://github.com/angular/angular/issues/8277#issuecomment-726057745),
  * [Google Maps / YouTube Player](https://jinalshah999.medium.com/official-angular-components-google-map-youtube-player-clipboard-67f04531ffc4),
* BMC Feat:
  * With the invaluable help from Dave Sulcer, Ranjit and Saket :)

<a name="more-importantly"></a>
## More importantly:
I hope it helps :)
