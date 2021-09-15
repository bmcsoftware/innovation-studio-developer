import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsComponentComponent } from './google-maps-component.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdaptAlertModule, AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';

// This example shows how to consume an Angular module google-maps here:
// \webapp\libs\com-example-test210500>npm install @angular/google-maps --save
// This should lead to an entry in the library package.json dependencies, for example:
// "dependencies": {
//     "@angular/google-maps": "^11.2.10"
// }
@NgModule({
  imports: [CommonModule, GoogleMapsModule, AdaptBusyModule, AdaptAlertModule, TranslateModule],
  exports: [GoogleMapsComponentComponent],
  declarations: [GoogleMapsComponentComponent],
  entryComponents: [GoogleMapsComponentComponent]
})
export class GoogleMapsComponentModule {
}
