import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomGridDesignComponent } from './custom-grid-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CustomGridDesignComponent],
  entryComponents: [CustomGridDesignComponent]
})
export class CustomGridDesignModule {
}
