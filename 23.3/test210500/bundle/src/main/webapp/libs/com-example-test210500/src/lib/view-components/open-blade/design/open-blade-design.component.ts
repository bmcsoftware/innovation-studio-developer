import { Component, Input } from '@angular/core';
import { OpenBladeDesignModel } from './open-blade-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-open-blade-design',
  styleUrls: ['./open-blade-design.scss'],
  templateUrl: './open-blade-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OpenBladeDesignComponent {
  @Input()
  model: OpenBladeDesignModel;
}
