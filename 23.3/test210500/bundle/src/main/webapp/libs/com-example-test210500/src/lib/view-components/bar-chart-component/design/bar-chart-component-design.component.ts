import { Component, Input } from '@angular/core';
import { BarChartComponentDesignModel } from './bar-chart-component-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-bar-chart-component-design',
  styleUrls: ['./bar-chart-component-design.scss'],
  templateUrl: './bar-chart-component-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BarChartComponentDesignComponent {
  @Input()
  model: BarChartComponentDesignModel;
}
