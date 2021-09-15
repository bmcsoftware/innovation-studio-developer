# Test 21.05.00 (com.example.test210500)
History:
* Version:
  * 0.4, 2021/09/15, the project is now hosted on BMC Software official Open Source GitHub repository. The license is now BSD 3 (see LICENSE file (https://github.com/bmcsoftware/innovation-studio-developer/blob/main/LICENSE)),
  * 0.3, 2021/06/02, Updating SDK / samples with 2021/06/01 server and SDK,
  * 0.2, 2021/05/20, First list of components done... First cleanup done...
  * 0.1, 2021/05/17, Initial comments / cleanup.
* Author: Laurent Matheo.


## Table Of Contents:
* [What is this](#what-is-this),
* [Installation (using the zip file)](#installation),
* [Updating your SDK / Developer Environment (if needed)](#update),
* [Build and installation using the source code](#build),
* [Videos...](#videos),
* [Java Objects](#java-objects),
* [Javascript Inspectors, aka Form Control Components](#inspectors),
* [Javascript Actions](#actions),
* [Javascript Record Field View Components](#record-field-view-components),
* [Javascript Standalone View Components](#standalone-view-components),
* [Javascript Utility Services](#javascript-utility-services),
* [Adding Assets (javascript scrits, fonts, pictures, css classes...) to your application](#assets),
* [Localize your application, Angular and Java code](#localization),
* [Debug your Process, Rule, Angular or Java code, enable logging](#debugging-logging),
* [Coding & Naming Guidelines](#coding-naming-guidelines),
* [Tutorials / Guides](#tutorials-guide),
* [Disclaimer](#disclaimer),
* [Support](#support),
* [Links](#links),
* [Third party libraries used and credits](#credits),
* [More importantly](#more-importantly),


<a name="what-is-this"></a>
## What is this? :)
This repository hosts several source code example for Innovation Suite, aiming for 21.05.00 SDK (Angular).  


<a name="installation"></a>
## Installation (using the zip file):
You can Just deploy the file "com.example.test210500-1.0-SNAPSHOT.zip" on your development environment.
https://docs.bmc.com/docs/is2105/deploying-your-digital-service-application-for-the-first-time-to-start-working-in-bmc-helix-innovation-studio-1006302420.html  


<a name="update"></a>
## Updating your SDK / Developer Environment (if needed):
https://docs.bmc.com/docs/is2105/upgrading-bmc-helix-innovation-studio-sdk-to-21-05-01-1006301204.html?src=search  


<a name="build"></a>
# Build and installation using the source code:
Please follow those steps:
* Create your developer environment:
* https://docs.bmc.com/docs/is2105/setting-up-your-ide-and-installing-bmc-helix-innovation-studio-sdk-1006302404.html?src=search
* You will need nodeJs, maven, Yarn, Grunt and Java (OpenJDK).  


To deploy:
* https://docs.bmc.com/docs/is2105/creating-a-project-using-maven-and-the-archetype-1006302418.html?src=search  
* https://docs.bmc.com/docs/is2105/deploying-your-digital-service-application-for-the-first-time-to-start-working-in-bmc-helix-innovation-studio-1006302420.html  

Here are the steps:
* Clone this repository,
* Change the content of the parent "pom.xml" file to insert your credentials:
```xml
    <!-- START: Bundle specific configuration. Verify and Change as per environment -->
    <developerUserName>developer</developerUserName>
    <developerPassword>password</developerPassword>
    <!-- Server name with Jetty port. -->
    <webUrl>https://developerXXXX.innovate.bmc.com</webUrl>
    <!-- END: Bundle specific configuration.-->
```
* Run the command "mvn clean install -Pdeploy" to deploy the application on your developer environment,

<a name="videos"></a>
## Videos...
Some videos are available on my YouTube channel (mostly the tutorial for now, examples will be explained at some point):  
https://www.youtube.com/watch?v=NfVg2tfXhqQ&list=PLKhrzlPY29F-6WOmGILvC0Mu2PScxXNtt&ab_channel=matheolaurent  

<a name="java-objects"></a>
## Java Objects:
[Click here to access the Java object details.](./_details/JAVA.MD)  

| Name                                  | Language                                                        | Type              | Complexity                |
| :---                                  |    :----                                                        |    :----          |            :---           |
| SimpleProcessActivity                 | [Java](./_details/JAVA.MD#SimpleProcessActivity)                | Activity          | :hot_pepper:              |
| CheckHCaptchaToken                    | [Java](./_details/JAVA.MD#CheckHCaptchaToken)                   | Activity          | :hot_pepper: :hot_pepper: |
| TwilioTextMessage                     | [Java](./_details/JAVA.MD#TwilioTextMessage)                    | Activity          | :hot_pepper: :hot_pepper: |
| SimpleRest                            | [Java](./_details/JAVA.MD#SimpleRest)                           | Rest Api          | :hot_pepper:              |
| FruitRest                             | [Java](./_details/JAVA.MD#FruitRest)                            | Rest Api          | :hot_pepper: :hot_pepper: |
| Test210500GeneratePasswordCommand     | [Java](./_details/JAVA.MD#Test210500GeneratePasswordCommand)    | Command           | :hot_pepper: :hot_pepper: |
| Test210500FruitDataPageQuery          | [Java](./_details/JAVA.MD#Test210500FruitDataPageQuery)         | Datapage Query    | :hot_pepper: :hot_pepper: |

<a name="inspectors"></a>
## Javascript Inspectors, aka Form Control Components:
[Click here to access the Javascript Inspectors details.](./_details/JAVASCRIPT_INSPECTORS.MD)  

| Name                            | Language                                                          | Type             | Complexity                |
| :---                            |    :----                                                          |    :----         |            :---           |
| slider                          | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#slider)          | Inspector        | :hot_pepper:              |
| gradient                        | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#gradient)        | Inspector        | :hot_pepper: :hot_pepper: |
| log-parameters                  | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#log-parameters)  | Inspector        | :hot_pepper: :hot_pepper: |
| step-editor                     | [Javascript](./_details/JAVASCRIPT_INSPECTORS.MD#step-editor)     | Inspector        | :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: |

<a name="actions"></a>
## Javascript Actions:
[Click here to access the Javascript Actions details.](./_details/JAVASCRIPT_ACTIONS.MD)  

| Name                            | Language                                                            | Type             | Complexity                |
| :---                            |    :----                                                            |    :----         |            :---           |
| get-user-information            | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#get-user-information) | Action           | :hot_pepper:              |
| notification                    | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#notification)         | Action           | :hot_pepper:              |
| confirmation-ootb               | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#confirmation-ootb)    | Action           | :hot_pepper:              |
| confirmation                    | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#confirmation)         | Action           | :hot_pepper: :hot_pepper: |
| fruit-picker                    | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#fruit-picker)         | Action           | :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: |
| generate-guid                   | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#generate-guid)        | Action           | :hot_pepper: :hot_pepper: :hot_pepper: |
| matrix                          | [Javascript](./_details/JAVASCRIPT_ACTIONS.MD#matrix)               | Action           | :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper:              |

<a name="record-field-view-components"></a>
## Javascript Record Field View Components:
[Click here to access the Javascript Record Field View Components details.](./_details/JAVASCRIPT_RECORD_FIELD_VIEW_COMPONENTS.MD)  

| Name                            | Language                                                                  | Type                          | Complexity                |
| :---                            |    :----                                                                  |    :----                      |            :---           |
| star-rating-field               | [Javascript](./_details/JAVASCRIPT_RECORD_FIELD_VIEW_COMPONENTS.MD#star-rating-field)  | Record Field View Component   | :hot_pepper: :hot_pepper: |

<a name="standalone-view-components"></a>
## Javascript Standalone View Components:
[Click here to access the Javascript View Components details.](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD)  

| Name                            | Language                                                                | Type             | Complexity                |
| :---                            |    :----                                                                |    :----         |            :---           |
| label                           | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#label)            | View Component   | :hot_pepper:              |
| lmame                           | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#lmame)            | View Component   | :hot_pepper:              |
| code-viewer                     | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#code-viewer)      | View Component   | :hot_pepper:              |
| iframe                          | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#iframe)           | View Component   | :hot_pepper: :hot_pepper: |
| display-gradient                | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#display-gradient) | View Component   | :hot_pepper:              |
| generate-password               | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#generate-password)| View Component   | :hot_pepper: :hot_pepper: |
| youtube-player                  | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#youtube-player)   | View Component   | :hot_pepper: :hot_pepper: |
| google-maps-component           | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#google-maps-component)| View Component   | :hot_pepper: :hot_pepper: |
| bar-chart-component             | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#bar-chart-component)  | View Component   | :hot_pepper:          |
| call-command                    | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#call-command)     | View Component   | :hot_pepper:              |
| call-process                    | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#call-process)     | View Component   | :hot_pepper: :hot_pepper: |
| webcam                          | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#webcam)           | View Component   | :hot_pepper: :hot_pepper: |
| qr-code-scanner                 | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#qr-code-scanner)  | View Component   | :hot_pepper: :hot_pepper: |
| digital-signature               | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#digital-signature)| View Component   | :hot_pepper:              |
| get-data-example                | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#get-data-example) | View Component   | :hot_pepper:              |
| list-icons                      | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#list-icons)       | View Component   | :hot_pepper:              |
| user-preferences                | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#user-preferences) | View Component   | :hot_pepper:              |
| admin-preferences               | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#admin-preferences)| View Component   | :hot_pepper: :hot_pepper: |
| captcha                         | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#captcha)          | View Component   | :hot_pepper:              |
| access-grid                     | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#access-grid)      | View Component   | :hot_pepper: :hot_pepper: |
| floating-panel                  | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#floating-panel)   | View Component   | :hot_pepper:              |
| test-debug-component            | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#test-debug-component) | View Component  | :hot_pepper:              |
| custom-datapagequery            | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#custom-datapagequery) | View Component  | :hot_pepper: :hot_pepper: |
| custom-grid                     | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#custom-grid)      | View Component   | :hot_pepper: :hot_pepper: |
| lifecycle                       | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#lifecycle)        | View Component   | :hot_pepper: :hot_pepper: :hot_pepper: |
| wizard                          | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#wizard)           | View Component   | :hot_pepper:              |
| star-rating                     | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#star-rating)      | View Component   | :hot_pepper: :hot_pepper: |
| qr-code-generator               | [Javascript](./_details/JAVASCRIPT_VIEW_COMPONENTS.MD#qr-code-generator)    | View Component   | :hot_pepper: :hot_pepper: |


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
| Name                                | Language                                                                          | Type             |
| :---                                |    :----                                                                          |    :----         |
| Confirmation                        | [Javascript](./_guides/_action/ACTION.MD)                                         | Action           |
| Star Rating                         | [Javascript](./_guides/_view-component/VIEW_COMPONENT.MD)                         | View Component   |
| Star Rating (Field)                 | [Javascript](./_guides/_record-field-view-component/VIEW_COMPONENT.MD)            | Record Field View Component   |
| Global Css Style                    | [Css](./_guides/_css/CSS.MD)                                                      | Global Css Style |
| SimpleRest                          | [Java](./_guides/_java-rest-api/REST_API.MD)                                      | Java Rest Api    |


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
* [BMC Documentation for BMC Helix Platform](https://docs.bmc.com/docs/is2105/release-notes-and-notices-1006303925.html),

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
  * https://github.com/emilyxxie/green_rain/blob/master/README.md,
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
  * https://stackoverflow.com/questions/58166597/use-external-javascript-library-in-angular-8-application,
  * https://github.com/angular/angular/issues/8277#issuecomment-726057745,
  * https://github.com/emilyxxie/green_rain/blob/master/README.md,
  * https://jinalshah999.medium.com/official-angular-components-google-map-youtube-player-clipboard-67f04531ffc4
* BMC Feat:
  * With the invaluable help from Dave Sulcer, Ranjit and Saket :)

<a name="more-importantly"></a>
## More importantly:
I hope it helps :)
