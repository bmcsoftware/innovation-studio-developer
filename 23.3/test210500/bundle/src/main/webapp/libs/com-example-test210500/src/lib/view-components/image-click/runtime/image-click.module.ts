import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageClickComponent } from './image-click.component';

@NgModule({
  imports: [CommonModule],
  exports: [ImageClickComponent],
  declarations: [ImageClickComponent],
  entryComponents: [ImageClickComponent]
})
export class ImageClickModule {
}
