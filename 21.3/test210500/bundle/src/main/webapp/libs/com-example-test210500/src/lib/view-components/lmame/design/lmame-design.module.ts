import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LmameDesignComponent } from './lmame-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LmameDesignComponent],
  entryComponents: [LmameDesignComponent]
})
export class LmameDesignModule {
}
