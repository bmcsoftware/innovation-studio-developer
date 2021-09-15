# Sample-Library-Public
History:
* Version:
* 3.2, 2021/09/15, SDK used is 20.08.00, the project is now hosted on BMC Software official Open Source GitHub repository. The license is now BSD 3 (see LICENSE file (https://github.com/bmcsoftware/innovation-studio-developer/blob/main/LICENSE)).
* 3.1, 2021/02/12, Modifying the custom-grid to show how to access the grid object to customize a cell content using ui-grid cellFilter and cellTemplate (https://community.bmc.com/s/question/0D73n000004temT/detail).
* 3.0, 2021/02/03, Modifying the custom-grid to show how to access the grid object to customize a cell css class (cellClass) (https://community.bmc.com/s/question/0D53n00007bLvbM/how-to-access-grid-object-from-bmc-record-grid-in-innovation-suite).
* 2.9, 2020/12/10, Changing SDK to 20.2.1. Modifying the Webcam view component, so you can have multiple Webcam fields in the same view (there was a problem with Preview).
* 2.8, 2020/06/17, Adding two Process Java Service to send back a List size (get list size) or a specific entry in a list (get list value by index).
* 2.7, 2020/06/17, Adding the QR Code reader view component example.
* 2.6, 2020/06/16, Adding the bundle.conf.json file containing the webcam js file import, I forgot to add the bundle.conf.json file in 2.5...
* 2.5, 2020/06/01, Adding the webcam view component example and an example how to use fonts in a custom class.
* 2.4, 2020/05/21, Modifying download-file action example since the filename logic has slightly changed in 20.2.0 (filename was saved as _matrix.jpg_ instead of matrix.jpg).
* 2.3, 2020/03/24, Making "get-user-infos" view component retro compatible with 19.11.0.
* 2.2, 2020/03/23, Adding view component example "get-user-infos".
* 2.1, 2020/03/05, Converting the project to 20.2.0 SDK.
* 2.0, 2020/01/13, Adding new examples (digital signature, better view component to display a picture stored in an attachment, a pie chart based on nvd3, creating an attachment field in java code and update a record instance, how to create a Public Java Action), updating links in this README.MD file,
* 1.9, 2020/01/13, Converting the project to 19.11.0 SDK, fixing a typo in bundle.conf.json,
* 1.8, 2019/09/25, Converting the project to 19.8.0 SDK.
* 1.7, 2019/06/07, Converting the project to 19.5.0 SDK.
* 1.6, 2019/04/26, Adding an example, calling a Process from Javascript and getting the process definition.
* 1.5, 2019/04/25, Adding one example that shows how to use Google Maps and Google Geolocator apis (you will need a Google Maps api key).
* 1.4, 2019/04/18, Adding one example that shows how to use "Documents" in a process.
* 1.3, 2019/04/17, Adding one example around rxUserPreferences (user-preference view component).
* 1.2, 2019/02/26, Converting the project to 19.2.0. This project uses now the new SDK archetype structure as well and openJDK 11, please check the SDK upgrade instructions (https://docs.bmc.com/docs/helixplatform/upgrading-bmc-helix-platform-sdk-to-19-2-0-851083022.html?src=search) and development environment upgrade (https://docs.bmc.com/docs/helixplatform/setting-up-your-ide-and-installing-bmc-helix-platform-sdk-851871275.html?src=search).
* 1.1, 2018/12/22, Converting the project to 18-11.1. This project uses now the new SDK archetype structure as well as new nodeJS / Yarn versions (https://docs.bmc.com/docs/display/innovationsuite/Upgrading+BMC+Helix+Innovation+Suite+SDK+to+18.11.01:+Patch+01). It also fixes a problem using grunt and latest BMC SSL certificate. If you cannot export or deploy your application / library due to this error "PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target" please check this thread (https://communities.bmc.com/message/801070#801070).
* 1.0, 2018/11/10, Converting the project to 18-8.1. WARNING! You still need nodeJs 6.11.2 and Yarn 0.27.5. Instructions on BMC Documentation are not totally correct for now so keep those versions to build this example for now...
* 0.9, 2018/09/18, Converting the project to 18-8.
* 0.8, 2018/08/18, adding two new examples (https://github.com/lmame/Sample-Library-Public/commit/b6cb60467f896cf69f77b12519eef57d056c30d7),
* 0.7, 2018/08/12, adding one new example (https://github.com/lmame/Sample-Library-Public/commit/2116f63828f635b2ba02b58fe4595370fdb2f00c),
* 0.6, 2018/08/11, Converting the project to 18-5.1 and adding new examples (https://github.com/lmame/Sample-Library-Public/commit/5776c28d9f56cfc28f04a6209fc0aaeba3b356e9).
* 0.5, 2018/06/18, Converting the project to 18-5.
* 0.4, 2018/04/28, Converting the project to 18-2.
* 0.3, 2018/03/21, Adding a new view component to access grid native apis and changing moment.js version.
* 0.2, 2017/12/08, Converting the project to 17-11.
* 0.1, 2017/10/31, Initial release.
* Author: Laurent Matheo.


# What is this? :)
This repository hosts several source code example for Innovation Suite.
You can request a free of charge development environment on the BMC Developer Portal (https://developers.bmc.com/site/global/home/index.gsp).


# Videos...
Most if not all examples are explained in videos available on my YouTube channel:
* https://www.youtube.com/watch?v=iaOsmuxdXTE&list=PLKhrzlPY29F8_omqn1kFEsmcVduBFmZA6
It also contains some tips and tricks that might be useful.


# Content:
Javascript View Components:
* Custom Label (how to pass information to a View Component. The component is updated each time the value changes),
* Display Associated data using Javascript framework,
* Display data using Javascript framework,
* Display a picture that is stored in an attachment of a record instance,
* List of icons you can use for your view component (it is a view component with search capability),
* Priority and VAT calculators. This one shows how to pass data to a view component as well data back from a view component each time a value changes,
* Star System: Show how to pass and get information from a view component as well as showing how to display complex information in View * Designer (slider to select the number of stars, color picker, showing the stars in the canvas etc...),
* Show how to use the "Refresh" Action to call a method in a View Component and insert the View Component into a record editor,
* Calling a Custom Command and Custom Rest API using BMC OOTB resources objects,
* Calling a Javascript Action from Javascript Code using "rxAction" method.
* Accessing a grid native apis (ui-grid).
* Accessing a grid object
* Get user session information on javascript and backend
* Use class objects and list of objects to / from get and post rest apis
* Trigger an action button through javascript
* Trigger specific process activity through Java / Javascript
* Use BMC grid rx-record-grid object  to display custom data (datapagequery), also shows how to query data from backend,
* Create Admin Settings for your application and get the values in Java and Javascript,
* Getting and saving user preferences,
* Using Google Maps and Google Geolocator apis (you will need a Google Maps api key),
* Calling a Process from Javascript and getting the process definition,
* Displaying a picture stored in a record instance attachment field (better version),
* Leveraging third party digital signature to allow users to sign using a mouse / fingers and generate a base 64 picture based on the signature (https://github.com/szimek/signature_pad, https://github.com/legalthings/angular-signature),
* A pie chart leveraging the supplied libraries nvd3 and d3,
* Getting user information and broadcast them as output parameters,
* Use the webcam directive (https://github.com/jonashartmann/webcam-directive) to grab a picture from the webcam and save it in a record instance using a process "Create Attachment" service,
* Use the QR Code javascript library (https://github.com/zxing-js/library, https://unpkg.com/@zxing/library@latest) to capture a QR code from the webcam video feed,


Javascript Actions:
* Calling a javascript custom Action and using rxNotification to display messages popups,
* Calling a Custom Java command using $http to get result from it,
* Confirm window. How actions can be chained and how to "break" the chain if needed. We show also how to synchronous custom javascript actions.
* Downloading a file, can be used to download a file from a grid for example,


Java Service:
* Custom Java service that returns an Object that can be used in Rule or Process designers,
* Public Java Service used to convert a base64 picture into a picture, generate an attachment field data and update an existing record instance with this data,
* Public Java Services that return a List size (Get List Size) and a list specific entry by its index (Get List Value By Index), 


Java Rest API:
* Custom Rest API,


Java Commands:
* Custom Java commands delivered as examples,


Tips & tricks
* How to pass custom objects in a process and access its properties (list of strings, object, list of objects) (see next example that completes this one),
* How to pass custom objects in a process and access its properties (list of strings, object, list of objects) and using Documents to access an Object attribute rather than using the object "path",
* Use fonts in a custom css class and apply it to objects (grid, rich text field etc...),


Apis description:
* How to use rxNotificationMessage in UI to display notification, modify the Ttl and display the message as Html (bonus, using picture),


# Installation (using the zip file):
You can Just deploy the file "com.example.samplelibrary-1.0-SNAPSHOT.zip" on your development environment.
https://docs.bmc.com/docs/helixplatform/deploying-application-tailoring-changes-851871221.html


# Updating your SDK / Developer Environment (if needed):
https://docs.bmc.com/docs/helixplatform/upgrading-bmc-helix-platform-sdk-to-20-08-05-851083022.html?src=search


# Build and installation using the source code:
Please follow those steps:
* Create your developer environment:
* https://docs.bmc.com/docs/helixplatform/setting-up-your-ide-and-installing-bmc-helix-platform-sdk-851871275.html?src=search
* You will need NodeJs, maven, Yarn, Grunt and Java (Open JDK).

To deploy:
* https://docs.bmc.com/docs/helixplatform/creating-a-project-using-maven-and-the-archetype-851871283.html?src=search
* https://docs.bmc.com/docs/helixplatform/deploying-your-digital-service-application-for-the-first-time-to-start-working-in-bmc-helix-innovation-studio-851871286.html

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


# License (BSD 3):
These samples are released by Laurent Matheo and are released "as is" as code samples. There is no warranty, liability or support on those examples.  
Please find support on the Developer BMC Community if you have any questions or feel free to use this git repo features (bug report etc...).  
The license is now BSD 3 (see LICENSE file (https://github.com/bmcsoftware/innovation-studio-developer/blob/main/LICENSE))  


# Credits:
With the invaluable help from Dave Sulcer and Ranjit :)


# Links:
* BMC Helix Youtube channel (https://www.youtube.com/channel/UCufKJEem7x7_IaTUPbTYuww),
* BMC Developer portal (https://developers.bmc.com/site/global/home/index.gsp),
* BMC Developer Community (https://community.bmc.com/s/group/0F93n000000Plr8CAC/developer-community),
* BMC Documentation for BMC Helix Platform (https://docs.bmc.com/docs/helixplatform/),


# Most important:
I hope it helps :)
