import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingPanelComponent } from './floating-panel.component';

@NgModule({
  imports: [CommonModule],
  exports: [FloatingPanelComponent],
  declarations: [FloatingPanelComponent],
  entryComponents: [FloatingPanelComponent]
})
export class FloatingPanelModule {
}
