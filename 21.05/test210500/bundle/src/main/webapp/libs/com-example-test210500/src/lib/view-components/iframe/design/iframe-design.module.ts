import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IframeDesignComponent } from './iframe-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [IframeDesignComponent],
  entryComponents: [IframeDesignComponent]
})
export class IframeDesignModule {
}
