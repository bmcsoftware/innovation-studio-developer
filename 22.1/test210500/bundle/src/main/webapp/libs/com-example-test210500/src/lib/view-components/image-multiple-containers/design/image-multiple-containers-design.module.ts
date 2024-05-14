import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewDesignerCanvasModule } from '@helix/platform/view/designer';
import { ImageMultipleContainersDesignComponent } from './image-multiple-containers-design.component';
import {
  ImageMultipleContainerOutletComponent
} from './image-multiple-containers-outlet/image-multiple-container-outlet.component';

@NgModule({
  imports: [CommonModule, FormsModule, ViewDesignerCanvasModule],
  declarations: [ImageMultipleContainersDesignComponent, ImageMultipleContainerOutletComponent],
  entryComponents: [ImageMultipleContainersDesignComponent]
})
export class ImageMultipleContainersDesignModule {
}
