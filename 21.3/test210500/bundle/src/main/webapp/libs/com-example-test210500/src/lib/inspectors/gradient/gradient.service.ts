import { ElementRef, Injectable } from '@angular/core';
import { GRADIENT_COMPONENT_OPTIONS } from './gradient.types';
import { first, last } from 'lodash';

// This service is consumed in the Form Control Component (Inspector).
// In this case we need to "provide" it in the Component such as this to
// avoid injection errors:
// {
//     provide: GradientService,
//     useClass: GradientService
// }
//
// The other solution to avoid using the describe block is to provide the
// service at root level.
// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class GradientService {
  // Method to extract a left or side side of the gradient.
  // The gradient has the structure 'leftValue|rightValue', such as:
  // '#000000|#FFFFFF'
  extractGradientInformation(side: string, gradient: string): string {
    // Preparing default values depending on the side.
    let value = GRADIENT_COMPONENT_OPTIONS.defaultValues[side];

    if (gradient) {
      if (side === GRADIENT_COMPONENT_OPTIONS.sides.left) {
        value = first(gradient.split('|'));
      }

      if (side === GRADIENT_COMPONENT_OPTIONS.sides.right) {
        value = last(gradient.split('|'));
      }
    }

    return value;
  }

  // Drawing the gradient in a gradientDivElement div element.
  drawGradient(gradientDivElement: ElementRef, gradientLeftValue: string, gradientRightValue: string): void {
    if (gradientDivElement) {
      gradientDivElement.nativeElement.style['background-image'] = `linear-gradient(to right, ${gradientLeftValue} , ${gradientRightValue})`;
    }
  }
}
