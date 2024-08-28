import { Component, Input } from '@angular/core';
import { LabelLazyLoadedDesignModel } from './label-lazy-loaded-design.model';

@Component({
  selector: 'com-example-testlazyloading-label-lazy-loaded-design',
  styleUrls: ['./label-lazy-loaded-design.component.scss'],
  templateUrl: './label-lazy-loaded-design.component.html',
  standalone: true
})
export class LabelLazyLoadedDesignComponent {
  @Input()
  model: LabelLazyLoadedDesignModel;
}
