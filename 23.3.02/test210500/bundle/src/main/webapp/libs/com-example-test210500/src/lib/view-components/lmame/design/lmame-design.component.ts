import { Component, Input } from '@angular/core';
import { LmameDesignModel } from './lmame-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-lmame-design',
  templateUrl: './lmame-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LmameDesignComponent {
  @Input()
  model: LmameDesignModel;
}
