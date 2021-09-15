import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcamDesignComponent } from './webcam-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [WebcamDesignComponent],
  entryComponents: [WebcamDesignComponent]
})
export class WebcamDesignModule {
}
