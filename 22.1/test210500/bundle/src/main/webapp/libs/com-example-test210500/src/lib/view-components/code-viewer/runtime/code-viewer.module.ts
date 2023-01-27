import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewerComponent } from './code-viewer.component';
// This module is needed as we leverage the Adapt code viewer component.
import { AdaptCodeViewerModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, AdaptCodeViewerModule],
  exports: [CodeViewerComponent],
  declarations: [CodeViewerComponent],
  entryComponents: [CodeViewerComponent]
})
export class CodeViewerModule {
}
