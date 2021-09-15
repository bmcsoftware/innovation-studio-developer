import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatingPanelDesignComponent } from './floating-panel-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [FloatingPanelDesignComponent],
  entryComponents: [FloatingPanelDesignComponent]
})
export class FloatingPanelDesignModule {
}
