import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageClickDesignComponent } from './image-click-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ImageClickDesignComponent],
  entryComponents: [ImageClickDesignComponent]
})
export class ImageClickDesignModule {
}
