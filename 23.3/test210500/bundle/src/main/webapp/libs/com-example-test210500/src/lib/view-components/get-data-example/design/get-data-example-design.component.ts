import { Component, Input } from '@angular/core';
import { GetDataExampleDesignModel } from './get-data-example-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-get-data-example-design',
  styleUrls: ['./get-data-example-design.scss'],
  templateUrl: './get-data-example-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GetDataExampleDesignComponent {
  @Input()
  model: GetDataExampleDesignModel;
}
