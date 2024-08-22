import { Pipe, PipeTransform } from '@angular/core';
import { IIcon } from '../design/list-icons.interface';
import { IconFilterTrackingService } from './list-icon.service';

// This pipe is used in the component to only return the icons names matching
// the searching criteria
// It will emit the number of filtered icons through a service.
// The component subscribes to the service observable to get this count.
@Pipe({
  name: 'iconFilter',
  standalone: true
})
export class IconPipe implements PipeTransform {
  constructor(private iconFilterTrackingService: IconFilterTrackingService) {
  }

  // Filtering operation.
  transform(icons: IIcon[], searchText: string): any[] {
    if(!icons) {
      this.emitNumberOfFilteredIcons(0);

      return [];
    }

    if(!searchText || searchText.length < 3) {
      this.emitNumberOfFilteredIcons(icons.length);

      return icons;
    }

    const filteredIcons = icons.filter((icon: IIcon) => {
      return icon.ruleName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.emitNumberOfFilteredIcons(filteredIcons.length);

    return filteredIcons;
  }

  // Emitting the number of filtered icons through the service.
  emitNumberOfFilteredIcons(numberOfFilteredIcons: number): void{
    this.iconFilterTrackingService.filterComplete.next(numberOfFilteredIcons);
  }
}
