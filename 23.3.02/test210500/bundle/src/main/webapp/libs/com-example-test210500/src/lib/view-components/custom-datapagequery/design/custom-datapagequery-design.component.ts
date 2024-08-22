import { Component, Input } from '@angular/core';
import { CustomDatapagequeryDesignModel } from './custom-datapagequery-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-custom-datapagequery-design',
  styleUrls: ['./custom-datapagequery-design.scss'],
  templateUrl: './custom-datapagequery-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomDatapagequeryDesignComponent {
  @Input()
  model:CustomDatapagequeryDesignModel;
}
