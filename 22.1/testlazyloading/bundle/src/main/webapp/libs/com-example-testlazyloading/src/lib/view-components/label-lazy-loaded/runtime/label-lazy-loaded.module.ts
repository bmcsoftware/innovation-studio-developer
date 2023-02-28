import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelLazyLoadedComponent } from './label-lazy-loaded.component';

@NgModule({
  imports: [CommonModule],
  exports: [LabelLazyLoadedComponent],
  declarations: [LabelLazyLoadedComponent],
  entryComponents: [LabelLazyLoadedComponent]
})
export class LabelLazyLoadedModule {
}
