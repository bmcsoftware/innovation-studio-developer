import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponentComponent } from './bar-chart-component.component';
import { AdaptChartsModule } from '@bmc-ux/adapt-charts';
import { AdaptBusyModule, AdaptButtonModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, AdaptChartsModule, AdaptBusyModule, AdaptButtonModule],
  exports: [BarChartComponentComponent],
  declarations: [BarChartComponentComponent],
  entryComponents: [BarChartComponentComponent]
})
export class BarChartComponentModule {
}
