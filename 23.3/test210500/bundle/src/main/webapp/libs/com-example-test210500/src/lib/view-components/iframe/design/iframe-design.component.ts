import { Component, Input } from '@angular/core';
import { IframeDesignModel } from './iframe-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-iframe-design',
  styleUrls: ['./iframe-design.scss'],
  templateUrl: './iframe-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IframeDesignComponent {
  @Input()
  model: IframeDesignModel;
}
