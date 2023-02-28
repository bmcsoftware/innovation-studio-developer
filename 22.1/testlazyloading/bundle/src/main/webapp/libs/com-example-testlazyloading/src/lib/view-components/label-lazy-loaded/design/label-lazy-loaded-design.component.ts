import { Component, Input } from '@angular/core';
import { LabelLazyLoadedDesignModel } from './label-lazy-loaded-design.model';

@Component({
  selector: 'com-example-testlazyloading-label-lazy-loaded-design',
  styleUrls: ['./label-lazy-loaded-design.scss'],
  templateUrl: './label-lazy-loaded-design.component.html'
})
export class LabelLazyLoadedDesignComponent {
  @Input()
  model: LabelLazyLoadedDesignModel;
}
