<h1 style="text-align:center">Coding & Naming Guidelines</h1>

## Table Of Contents:
* [Naming Guidelines](#naming-guidelines)  
* [Coding Guidelines](#coding-guidelines)  


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

---

<a name="coding-guidelines"></a>
## Coding Guidelines
Please refer to [this documentation](https://docs.bmc.com/docs/helixplatform/best-practices-for-developing-application-code-851869981.html).  

Additionally, you should avoid to:
* Use different version of libraries provided by BMC,
* Use global objects (css styles) or static code in Java,
* Use third party libraries when not necessary,
* Implement any code that relies on filesystem access,
* Override the BMC classes to avoid unwanted side effects,
  * If you feel a feature is missing, for example in Skinning and Branding please fill an "Idea" in the BMC Community
