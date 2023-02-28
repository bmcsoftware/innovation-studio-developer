import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelLazyLoadedDesignComponent } from './label-lazy-loaded-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LabelLazyLoadedDesignComponent],
  entryComponents: [LabelLazyLoadedDesignComponent]
})
export class LabelLazyLoadedDesignModule {
}
