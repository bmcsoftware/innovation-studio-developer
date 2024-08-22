import { Component, Input } from '@angular/core';
import { AccessGridDesignModel } from './access-grid-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-access-grid-design',
  styleUrls: ['./access-grid-design.scss'],
  templateUrl: './access-grid-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AccessGridDesignComponent {
  @Input()
  model: AccessGridDesignModel;
}
