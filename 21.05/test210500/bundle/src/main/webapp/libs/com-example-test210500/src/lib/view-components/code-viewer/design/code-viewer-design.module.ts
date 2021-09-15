import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeViewerDesignComponent } from './code-viewer-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CodeViewerDesignComponent],
  entryComponents: [CodeViewerDesignComponent]
})
export class CodeViewerDesignModule {
}
