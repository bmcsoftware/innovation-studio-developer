import { Component, Input } from '@angular/core';
import { FloatingPanelDesignModel } from './floating-panel-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-floating-panel-design',
  styleUrls: ['./floating-panel-design.scss'],
  templateUrl: './floating-panel-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FloatingPanelDesignComponent {
  @Input()
  model: FloatingPanelDesignModel;
}
