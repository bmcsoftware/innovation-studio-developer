The custom library localized strings will be placed in this folder.  
These will be used as default, when application is not localized and even if the strings are not yet available in Innovation Studio.  
  
The format is:  
```json
{
    "message.key": "message text",
    "message.other-key": "message other text"
}
```

The json needs to be imported in the library module as:
```typescript
import * as defaultApplicationStrings from './i18n/localized-strings.json';
//
// @ts-ignore
this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings.default);
```

To use localization in the code the TranslateModule needs to be imported in the component module:
```typescript
import { TranslateModule } from '@ngx-translate/core';
//
imports: [TranslateModule]
```
  
The Translate service needs to be imported in the Component:  
```typescript
import { TranslateService } from '@ngx-translate/core';
//
constructor(private translateService: TranslateService) {}
//
const message = this.translateService.instant('message.key');
```
The translate service can be used in the component HTML:  
```html
<span class="d-textfield__item">
  {{'message.key' | translate}}
</span>
```
 
In order to localize to other locales, the strings need to be exported in Innovation Studio UI using the command:
```
mvn clean install -Plocalization
```
To localize in other locales go in the Bundle, in Actions and download translations. Then translate in other locales and import those translations.
  
**Note:**  
When the strings are not deployed yet to the server the values defined in the json file will be used.
