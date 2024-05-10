import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ImageContainerDesignComponent } from './image-container-design.component';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';

@NgModule({
  imports: [CommonModule, FormsModule, ViewDesignerCanvasModule],
  declarations: [ImageContainerDesignComponent],
  entryComponents: [ImageContainerDesignComponent]
})
export class ImageContainerDesignModule {
}
