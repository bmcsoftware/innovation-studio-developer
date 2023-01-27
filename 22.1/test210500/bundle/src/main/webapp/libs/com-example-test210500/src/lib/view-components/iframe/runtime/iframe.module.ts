import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeComponent } from './iframe.component';

@NgModule({
  imports: [CommonModule],
  exports: [IframeComponent],
  declarations: [IframeComponent],
  entryComponents: [IframeComponent]
})
export class IframeModule {
}
