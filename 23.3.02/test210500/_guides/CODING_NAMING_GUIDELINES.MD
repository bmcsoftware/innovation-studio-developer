<h1 style="text-align:center">Coding & Naming Guidelines</h1>

## Table Of Contents:
* [Naming Guidelines](#naming-guidelines)  
* [Coding Guidelines](#coding-guidelines)  
* [Third party libraries](#third-party-libraries)  


<a name="naming-guidelines"></a>
## Naming Guidelines
Namespacing helps you to organize the objects of your Digital Service application so that they can be identified uniquely when shared and collisions with other objects or variables in the global namespace are avoided.

To ensure global uniqueness you must ensure that you follow the following naming conventions for some object types such as:
* View component selectors,
* Actions name,
* Global css classes, 
* Localization strings, 

> :warning:  
> You should not, in any case, prefix your objects by "rx", "RX", "BMC" or "helix" to avoid collision with BMC objects.


### Component selectors:
All angular selector names used in Components for example must be prefixed with bundle Id and dasherized, for example for the view component [generate-password](../_details/JAVASCRIPT_VIEW_COMPONENTS.MD#generate-password):
```typescript
@Component({
  selector: 'com-example-test210500-com-example-test210500-generate-password',
  templateUrl: './generate-password.component.html'
})
```

> :memo:  
> It is recommended to keep the "name" generated automatically by the schematics.


### Action name:
All angular Action names must be prefixed with bundle Id and converted to camelCase, for example for the action [confirmation](../_details/JAVASCRIPT_ACTIONS.MD#confirmation):
```typescript
name: 'comExampleTest210500ActionConfirmation'
```

> :memo:  
> It is recommended to keep the "name" generated automatically by the schematics.


### Global css classes:
All [global css classes](../_details/ASSETS.MD#global-css-class) must be prefixed with bundle Id and dasherized, for example in the classes from the file "/assets/_global-styles.scss" or "/styles/com-example-test210500.scss":
```scss
.com-example-test210500-red-container {
  border: 1px solid red;
}
```

> :memo:  
> You should avoid as much as possible to override the BMC classes to avoid unwanted side effects. If you feel a feature is missing, for example in Skinning and Branding please fill an "Idea" in the BMC Community.


### Localization strings:
It is recommended to prefix the localized strings with bundle Id, for example in the [google-maps-component](../_details/JAVASCRIPT_VIEW_COMPONENTS.MD#google-maps-component) View Component:
```json
{
  "com.example.test210500.view-components.google-maps-component.missing-api-key": "The Google Maps api key is missing, the Google Map component will function in \"development mode\" and geolocalization will not work."
}
```

### Datapage query calls:
In previous releases we used the `rxRecordInstanceDataPageService.get()` method to access data from a record instance, for example in [fruit-picker-action.design-model.ts](../bundle/src/main/webapp/libs/com-example-test210500/src/lib/actions/fruit-picker/fruit-picker-action.design-model.ts):
```ts
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
// (...)
// The fruit list is stored in a record definition, so we fetch the record instances to build the list.
// The default value will be applied later via the getInitialProperties() with:
// fruit: 'banana'
const params: IDataPageParams = {
  // Record Definition to fetch data into.
  recorddefinition: FRUIT_PICKER_ACTION.recordDefinitionName,
  // List of field Ids we want to fetch. This is an array of field Ids.
  propertySelection: [FRUIT_PICKER_ACTION.fruitFieldId],
  // Page size (-1 = all).
  pageSize: -1,
  // Start Index (if we want to handle the pagination), 0 means we want to get
  // from the first record instance.
  startIndex: 0,
  // Query criteria. We want to get all fruits.
  queryExpression: FRUIT_PICKER_ACTION.queryExpression
};
// (...)
this.rxRecordInstanceDataPageService.get({params})
```
In the new release, it is recommended to use the `.post()` method instead (so `rxRecordInstanceDataPageService.post()`). The reason is that in the past the parameters were generating a very long string passed to the server, reaching the server limit for GET call url length. This problem is addressed with the POST method now:
```ts
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
// (...)
// The fruit list is stored in a record definition, so we fetch the record instances to build the list.
// The default value will be applied later via the getInitialProperties() with:
// fruit: 'banana'
const params: IDataPageParams = {
  // Record Definition to fetch data into.
  recorddefinition: FRUIT_PICKER_ACTION.recordDefinitionName,
  // List of field Ids we want to fetch. This is an array of field Ids.
  propertySelection: [FRUIT_PICKER_ACTION.fruitFieldId],
  // Page size (-1 = all).
  pageSize: -1,
  // Start Index (if we want to handle the pagination), 0 means we want to get
  // from the first record instance.
  startIndex: 0,
  // Query criteria. We want to get all fruits.
  queryExpression: FRUIT_PICKER_ACTION.queryExpression
};
// (...)
this.rxRecordInstanceDataPageService.post({params})
```

However, we still support of course the `.get()` method.

> :memo:  
> If you are still using the `.get()` method, you will see a warning message in the Web Browser logs:  
> `RxRecordInstanceDataPageService: The get() method is deprecated. Use post() instead.`


---

<a name="coding-guidelines"></a>
## Coding Guidelines
Please refer to [this documentation](https://docs.bmc.com/docs/innovationsuite/233/best-practices-for-developing-application-code-1223791356.html?src=search).  

Additionally, you should avoid to:
* Use different version of libraries provided by BMC,
* Use global objects (css styles) or static code in Java,
* Use third party libraries when not necessary,
* Implement any code that relies on filesystem access,
* Override the BMC classes to avoid unwanted side effects,
  * If you feel a feature is missing, for example in Skinning and Branding please fill an "Idea" in the BMC Community
* Be wary of third party library types (licenses), listed in the document "BMC Cloud Services Master Agreement" 4.2.2 chapter (see [this page](https://www.bmc.com/legal/agreements.html)), 

---

<a name="third-party-libraries"></a>
## Third party libraries
As mentioned in the previous section, you need to be wary of third party library types:
* From a license standpoint, some licenses are not allowed on BMC environment. Those licenses are listed in the document "BMC Cloud Services Master Agreement" 4.2.2 chapter (see [this page](https://www.bmc.com/legal/agreements.html)), 
* It is recommended not to use some third party libraries as they might conflict with BMC styles or own BMC implementation, some examples are:
  * Google Material
    * While this is a very powerful and fantastic library, most of the Google Material elements have equivalent provided by BMC in our Adapt graphical library. Leveraging those Adapt components will ensure that they will be integrated optimally with other OOTB elements and look like the other elements used in Innovation Studio,
  * primeNG
    * This is also a fantastic library, however BMC uses already this library, for example for its grid, and leveraging other primeNG components might override some css properties like colors, or styles, breaking some BMC objects behavior,
    * Most of the primeNg elements have equivalent provided by BMC in our Adapt graphical library. Leveraging those Adapt components will ensure that they will be integrated optimally with other OOTB elements and look like the other elements used in Innovation Studio,
    * It is HIGHLY recommended not to use primeNG for those reasons,
