import { Component, Input } from '@angular/core';
import { ListIconsDesignModel } from './list-icons-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-list-icons-design',
  // LMA:: TODO:: We should add by default a scss and declare in the components
  // design time and runtime.
  styleUrls: ['./list-icons-design.scss'],
  templateUrl: './list-icons-design.component.html'
})
export class ListIconsDesignComponent {
  @Input()
  model: ListIconsDesignModel;
}
