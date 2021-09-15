import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsComponentDesignComponent } from './google-maps-component-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GoogleMapsComponentDesignComponent],
  entryComponents: [GoogleMapsComponentDesignComponent]
})
export class GoogleMapsComponentDesignModule {
}
