import { Component, Input } from '@angular/core';
import { CallCommandDesignModel } from './call-command-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-call-command-design',
  styleUrls: ['./call-command-design.scss'],
  templateUrl: './call-command-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CallCommandDesignComponent {
  @Input()
  model: CallCommandDesignModel;
}
