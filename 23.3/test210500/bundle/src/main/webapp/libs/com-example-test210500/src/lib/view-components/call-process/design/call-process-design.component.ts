import { Component, Input } from '@angular/core';
import { CallProcessDesignModel } from './call-process-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-call-process-design',
  styleUrls: ['./call-process-design.scss'],
  templateUrl: './call-process-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CallProcessDesignComponent {
  @Input()
  model: CallProcessDesignModel;
}
