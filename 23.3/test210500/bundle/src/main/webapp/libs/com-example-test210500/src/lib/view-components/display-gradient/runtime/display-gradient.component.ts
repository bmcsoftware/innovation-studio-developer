import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IDisplayGradientParameters } from '../design/display-gradient.interface';
import { GRADIENT_COMPONENT_OPTIONS } from '../../../inspectors/gradient/gradient.types';
import { GradientService } from '../../../inspectors/gradient/gradient.service';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import {GradientModule} from "../../../inspectors/gradient/gradient.module";
import { CommonModule } from '@angular/common';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-display-gradient',
  styleUrls: ['./display-gradient.scss'],
  templateUrl: './display-gradient.component.html',
  standalone: true,
  imports: [CommonModule, GradientModule]
})
@RxViewComponent({
  name: 'comExampleTest210500DisplayGradient'
})
export class DisplayGradientComponent extends BaseViewComponent implements OnInit, IViewComponent, AfterViewInit {
  // We get the div to use it later to draw the gradient.
  @ViewChild('gradientDivElement', {static: false})
  gradientDivElement: ElementRef;

  guid: string;
  config: Observable<any>;
  displayGradient: string;

  private componentData: IDisplayGradientParameters;
  private gradientLeftValue = GRADIENT_COMPONENT_OPTIONS.defaultValues.left;
  private gradientRightValue = GRADIENT_COMPONENT_OPTIONS.defaultValues.right;

  constructor(private gradientService:GradientService) {
    super();
  }

  ngOnInit() {
    // We only subscribe to the "gradient" input parameter value.
    this.config.pipe(
      pluck('gradient'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((gradient: string) => {
      this.componentData = {
        gradient: gradient
      };

      // The gradient has the structure 'leftValue|rightValue', such as:
      // '#000000|#FFFFFF'
      this.gradientLeftValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, this.componentData.gradient);
      this.gradientRightValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, this.componentData.gradient);
      this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
    });
  }

  ngAfterViewInit(): void {
    // The first drawGradient call (in the ngOnInit()) will fail as the component is not yet in the DOM,
    // hence the use of ngAfterViewInit() for the initial draw.
    this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
  }
}
