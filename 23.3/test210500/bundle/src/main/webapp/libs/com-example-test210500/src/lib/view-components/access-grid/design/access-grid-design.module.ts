import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccessGridDesignComponent } from './access-grid-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AccessGridDesignComponent],
  entryComponents: [AccessGridDesignComponent]
})
export class AccessGridDesignModule {
}
