import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenBladeDesignComponent } from './open-blade-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [OpenBladeDesignComponent],
  entryComponents: [OpenBladeDesignComponent]
})
export class OpenBladeDesignModule {
}
