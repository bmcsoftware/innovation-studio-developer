import { Component, Input } from '@angular/core';
import { ContainerDesignComponent } from '@helix/platform/view/components';

@Component({
  selector: 'com-example-test210500-image-container-outlet',
  templateUrl: './image-container-outlet.component.html',
  styleUrls: ['./image-container-outlet.scss'],
})
export class ImageContainerOutletComponent extends ContainerDesignComponent {
  @Input()
  outletName: string;

  constructor() {
    super();
  }
}
