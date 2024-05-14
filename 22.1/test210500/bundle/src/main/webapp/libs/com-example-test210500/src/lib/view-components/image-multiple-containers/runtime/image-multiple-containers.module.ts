import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMultipleContainersComponent } from './image-multiple-containers.component';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';

@NgModule({
  imports: [CommonModule, RuntimeViewCanvasModule],
  exports: [ImageMultipleContainersComponent],
  declarations: [ImageMultipleContainersComponent],
  entryComponents: [ImageMultipleContainersComponent]
})
export class ImageMultipleContainersModule {
}
