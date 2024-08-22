import { Component, Input } from '@angular/core';
import { LabelLazyLoadedDesignModel } from './label-lazy-loaded-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-testlazyloading-label-lazy-loaded-design',
  styleUrls: ['./label-lazy-loaded-design.scss'],
  templateUrl: './label-lazy-loaded-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LabelLazyLoadedDesignComponent {
  @Input()
  model: LabelLazyLoadedDesignModel;
}
