import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarChartComponentDesignComponent } from './bar-chart-component-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BarChartComponentDesignComponent],
  entryComponents: [BarChartComponentDesignComponent]
})
export class BarChartComponentDesignModule {
}
