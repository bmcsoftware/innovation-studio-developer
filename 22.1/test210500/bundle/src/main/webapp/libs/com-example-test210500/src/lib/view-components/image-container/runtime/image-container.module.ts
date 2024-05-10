import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageContainerComponent } from './image-container.component';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';

@NgModule({
  imports: [CommonModule, RuntimeViewCanvasModule],
  exports: [ImageContainerComponent],
  declarations: [ImageContainerComponent],
  entryComponents: [ImageContainerComponent]
})
export class ImageContainerModule {
}
